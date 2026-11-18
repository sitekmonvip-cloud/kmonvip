import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { z } from "zod";
import { LeadService } from "@/lib/crm/leadService";
import { isValidEmail, normalizeEmail } from "@/lib/tracking/quote";

export const runtime = "nodejs";

/**
 * Machine-to-machine endpoint for the WhatsApp SDR service (not part of the /crm session auth).
 *
 *   POST /api/sdr/leads
 *   Authorization: Bearer <SDR_API_TOKEN>
 *   Content-Type: application/json
 *
 *   { "phone": "5561998630303",                       // required, any format, country code included
 *     "name", "companyName", "email",                 // optional; never overwrite what is already filled
 *     "serviceInterest", "serviceCity",               // optional; the latest value wins
 *     "status": "novo" | "em_atendimento" | "qualificado",  // optional; only moves a lead forward
 *     "notes": "conversation summary",                // optional; replaces the [SDR WhatsApp] block of notes
 *     "source", "medium", "campaign", "conversionPage" }  // optional; first-touch, only fill empty fields
 *
 * Upsert by phone: reuses an open lead (not fechado/perdido) touched in the last 30 days, else creates one.
 * gclid / fbclid / utm_* are never read or written here. Safe to retry: repeating a call with the same
 * body leaves the lead unchanged apart from the timestamp inside the notes block.
 *
 * Responds { ok: true, created: boolean, lead } — 401 bad token, 400 bad payload, 503 token not configured.
 */

const SdrLeadSchema = z.object({
  phone: z.string().min(1),
  name: z.string().trim().min(1).nullish(),
  companyName: z.string().trim().min(1).nullish(),
  email: z.string().nullish(),
  serviceInterest: z.string().trim().min(1).nullish(),
  serviceCity: z.string().trim().min(1).nullish(),
  status: z.enum(["novo", "em_atendimento", "qualificado"]).nullish(),
  notes: z.string().max(4000).nullish(),
  source: z.string().trim().min(1).nullish(),
  medium: z.string().trim().min(1).nullish(),
  campaign: z.string().trim().min(1).nullish(),
  conversionPage: z.string().trim().min(1).nullish(),
});

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function hasValidToken(req: NextRequest, expected: string): boolean {
  const match = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") ?? "");
  if (!match) return false;
  // Hash both sides so the comparison is constant-time regardless of length.
  return timingSafeEqual(digest(match[1].trim()), digest(expected));
}

export async function POST(req: NextRequest) {
  const expectedToken = process.env.SDR_API_TOKEN;
  if (!expectedToken) {
    console.error("[api/sdr/leads] SDR_API_TOKEN not configured");
    return NextResponse.json({ ok: false, error: "SDR integration not configured" }, { status: 503 });
  }
  if (!hasValidToken(req, expectedToken)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = SdrLeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  // E.164 allows at most 15 digits; anything shorter than a DDD + number is not a phone.
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
  }

  // An email the model extracted wrongly must not block the sync (the SDR retries failures forever):
  // drop it and keep going.
  const email = data.email && isValidEmail(data.email) ? normalizeEmail(data.email) : null;

  try {
    const { lead, created } = await LeadService.upsertFromSdr({
      phone: phoneDigits,
      name: data.name,
      companyName: data.companyName,
      email,
      serviceInterest: data.serviceInterest,
      serviceCity: data.serviceCity,
      status: data.status,
      notes: data.notes,
      source: data.source,
      medium: data.medium,
      campaign: data.campaign,
      conversionPage: data.conversionPage,
    });
    return NextResponse.json({ ok: true, created, lead });
  } catch (error) {
    console.error("[api/sdr/leads] upsert failed", error);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
