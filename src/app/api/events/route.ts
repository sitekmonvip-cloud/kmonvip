import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { z } from "zod";
import { EventService } from "@/lib/crm/eventService";

export const runtime = "nodejs";

const EventSchema = z.object({
  eventType: z.enum(["whatsapp_click", "form_submission", "phone_click"]),
  pageUrl: z.string().nullable().optional(),
  pageTitle: z.string().nullable().optional(),
  buttonId: z.string().nullable().optional(),
  buttonText: z.string().nullable().optional(),
  buttonLocation: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),
  gclid: z.string().nullable().optional(),
  fbclid: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

function deviceTypeFromUserAgent(ua: string | null): string {
  if (!ua) return "desktop";
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

function hashIp(ip: string): string {
  const dailySalt = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}:${dailySalt}`).digest("hex");
}

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    // sendBeacon Blobs arrive as text/plain in some browsers; parse manually rather than
    // relying on Content-Type-driven req.json().
    const raw = await request.text();
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = EventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIp(ip);

  const allowed = await EventService.isWithinRateLimit(ipHash).catch(() => true);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  const deviceType = deviceTypeFromUserAgent(request.headers.get("user-agent"));

  await EventService.record({
    ...parsed.data,
    deviceType,
    ipHash,
  });

  return NextResponse.json({ ok: true });
}
