import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SupplierService } from "@/lib/crm/supplierService";
import { rejectUnlessSdr } from "@/lib/sdr/auth";
import { isValidEmail, normalizeEmail } from "@/lib/tracking/quote";

export const runtime = "nodejs";

/**
 * The SDR calls this when a contact turns out to be a supplier/vendor (offering something to KMON VIP
 * instead of buying). Same Bearer auth as /api/sdr/leads (SDR_API_TOKEN).
 *
 *   POST /api/sdr/suppliers
 *   { "phone": "5561998630303",           // required, any format, country code included
 *     "name", "companyName", "email",     // optional
 *     "offering": "what they offer",      // optional
 *     "notes": "conversation summary" }   // optional
 *
 * Upsert by phone into the `suppliers` table (never into `leads`). If the SDR had already opened a lead
 * card for that phone and no human touched it, the card is removed; `leadRemoved` says whether that
 * happened. Safe to retry. Responds { ok, created, leadRemoved, supplier }.
 */

const SupplierSchema = z.object({
  phone: z.string().min(1),
  name: z.string().trim().min(1).nullish(),
  companyName: z.string().trim().min(1).nullish(),
  email: z.string().nullish(),
  offering: z.string().trim().min(1).max(1000).nullish(),
  notes: z.string().max(4000).nullish(),
});

export async function POST(req: NextRequest) {
  const rejected = rejectUnlessSdr(req);
  if (rejected) return rejected;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = SupplierSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
  }

  // A badly extracted email must not block the sync (the SDR retries failures): drop it.
  const email = data.email && isValidEmail(data.email) ? normalizeEmail(data.email) : null;

  try {
    const { supplier, created, leadRemoved } = await SupplierService.upsertFromSdr({
      phone: phoneDigits,
      name: data.name,
      companyName: data.companyName,
      email,
      offering: data.offering,
      notes: data.notes,
    });
    return NextResponse.json({ ok: true, created, leadRemoved, supplier });
  } catch (error) {
    console.error("[api/sdr/suppliers] upsert failed", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
