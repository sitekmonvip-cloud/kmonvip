import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { LeadService } from "@/lib/crm/leadService";
import { parseMetaLead } from "@/lib/crm/metaLead";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 100_000;

/** Compares through SHA-256 so the check takes the same time whatever the length of the input. */
function secretMatches(received: string | null, expected: string): boolean {
  if (!received) return false;
  const a = createHash("sha256").update(received).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Receives a Meta Lead Ads submission from the Make automation.
 * Authenticated with the shared secret in the X-Make-Secret header.
 */
export async function POST(request: NextRequest) {
  const expected = process.env.META_LEADS_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Endpoint not configured" }, { status: 503 });
  }
  if (!secretMatches(request.headers.get("x-make-secret"), expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseMetaLead(json);
  if (parsed.kind === "invalid") {
    return NextResponse.json({ ok: false, error: parsed.reason }, { status: 400 });
  }
  // Test leads sent from Meta's tool are acknowledged (so Make doesn't retry) but never stored.
  if (parsed.kind === "ignored") {
    return NextResponse.json({ ok: true, status: "ignored", reason: parsed.reason });
  }

  try {
    const { lead, created } = await LeadService.createFromMeta(parsed.lead);
    return NextResponse.json({ ok: true, status: created ? "created" : "duplicate", id: lead.id });
  } catch (error) {
    console.error("[meta leads] failed to store lead", error);
    // 5xx makes Make retry; the external id keeps a retry from duplicating the lead.
    return NextResponse.json({ ok: false, error: "Could not store lead" }, { status: 500 });
  }
}
