import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "sitekmonvip@gmail.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "KMON VIP <onboarding@resend.dev>";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/quote] RESEND_API_KEY not configured");
    return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
  }

  let payload: { html?: string; text?: string; fullName?: string; email?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const { html, text, fullName, email } = payload;
  if (!html && !text) {
    return NextResponse.json({ ok: false, error: "Missing email content" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email && typeof email === "string" ? email : undefined,
    subject: `Nova solicitação de cotação — ${fullName || "Site KMON VIP"}`,
    html: html || undefined,
    text: text || html!.replace(/<[^>]+>/g, " "),
  });

  if (error) {
    console.error("[api/quote] Resend error", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
