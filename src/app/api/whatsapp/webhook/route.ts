import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { EventService } from "@/lib/crm/eventService";
import { extractRef } from "@/lib/tracking/whatsappRef";

export const runtime = "nodejs";

/** Meta calls this once, when the webhook is registered, to prove we own the endpoint. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (
    expected &&
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === expected
  ) {
    return new NextResponse(params.get("hub.challenge") ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

function hasValidSignature(rawBody: Buffer, header: string | null, secret: string): boolean {
  if (!header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = header.slice("sha256=".length);
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}

type InboundMessage = { id?: string; from?: string; type?: string; text?: { body?: string } };
type WebhookValue = {
  messages?: InboundMessage[];
  contacts?: { wa_id?: string; profile?: { name?: string } }[];
};
type WebhookBody = { entry?: { changes?: { value?: WebhookValue }[] }[] };

export async function POST(request: NextRequest) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 503 });
  }

  // The signature covers the exact bytes Meta sent, so verify before parsing anything.
  const rawBody = Buffer.from(await request.arrayBuffer());
  if (!hasValidSignature(rawBody, request.headers.get("x-hub-signature-256"), secret)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  try {
    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        for (const message of value?.messages ?? []) {
          if (message.type !== "text" || !message.from) continue;
          const ref = extractRef(message.text?.body);
          if (!ref) continue;
          const name = value?.contacts?.find((c) => c.wa_id === message.from)?.profile?.name ?? null;
          await EventService.attachInboundContact(ref, { phone: message.from, name });
        }
      }
    }
  } catch (error) {
    console.error("[whatsapp webhook] failed to store inbound contact", error);
    // 500 makes Meta retry; attachInboundContact is idempotent, so a retry is safe.
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Meta only needs a fast 200; anything else (statuses, media, unmatched messages) is ignored.
  return NextResponse.json({ ok: true });
}
