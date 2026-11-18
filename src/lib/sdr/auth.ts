import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/**
 * Bearer-token check for the machine-to-machine /api/sdr/* endpoints (the SDR service has no CRM session).
 * Returns the error response to send back, or null when the request is authorised.
 */
export function rejectUnlessSdr(req: NextRequest): NextResponse | null {
  const expected = process.env.SDR_API_TOKEN;
  if (!expected) {
    console.error("[api/sdr] SDR_API_TOKEN not configured");
    return NextResponse.json({ ok: false, error: "SDR integration not configured" }, { status: 503 });
  }

  const match = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") ?? "");
  // Hash both sides so the comparison is constant-time regardless of length.
  if (!match || !timingSafeEqual(digest(match[1].trim()), digest(expected))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
