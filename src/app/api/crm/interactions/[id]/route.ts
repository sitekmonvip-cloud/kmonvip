import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { EventService } from "@/lib/crm/eventService";
import { normalizePhoneInput } from "@/lib/crm/phone";

export const runtime = "nodejs";

// An empty string clears the phone.
const SetPhoneSchema = z.object({ phone: z.string().max(40) });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = SetPhoneSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const typed = parsed.data.phone.trim();
  let phone: string | null = null;
  if (typed !== "") {
    phone = normalizePhoneInput(typed);
    if (!phone) {
      return NextResponse.json({ ok: false, error: "Telefone inválido" }, { status: 422 });
    }
  }

  const metadata = await EventService.setManualPhone(eventId, phone);
  if (metadata === undefined) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, metadata });
}
