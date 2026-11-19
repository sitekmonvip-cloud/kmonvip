import { NextRequest, NextResponse, after } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { LeadService } from "@/lib/crm/leadService";
import { parseMetaLead } from "@/lib/crm/metaLead";
import { notifyMetaLead } from "@/lib/crm/metaLeadNotifier";

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

  // Make can send either a JSON body or plain key/value fields (x-www-form-urlencoded). The second
  // is the easier one to set up there: field values are escaped for you, so a name or answer with
  // quotes or line breaks can't break the request.
  let json: unknown;
  if ((request.headers.get("content-type") ?? "").includes("application/x-www-form-urlencoded")) {
    json = Object.fromEntries(new URLSearchParams(raw));
  } else {
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }
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
    // Only the request that actually inserted the row e-mails it: a Make retry of the same lead
    // comes back with created=false. after() runs once the response is sent, so the e-mail never
    // delays (or fails) the webhook; notifyMetaLead swallows its own errors.
    if (created) after(() => notifyMetaLead(lead));
    return NextResponse.json({ ok: true, status: created ? "created" : "duplicate", id: lead.id });
  } catch (error) {
    console.error("[meta leads] failed to store lead", error);
    // 5xx makes Make retry; the external id keeps a retry from duplicating the lead.
    return NextResponse.json({ ok: false, error: "Could not store lead" }, { status: 500 });
  }
}
