import { Resend } from "resend";
import { BRAND_EMAIL } from "@/lib/seo/constants";
import { buildMetaLeadEmail } from "./metaLeadEmail";
import type { LeadRow } from "./types";

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "KMON VIP <naoresponda@kmonvip.com>";

/** Always the main inbox; LEAD_NOTIFY_EMAIL (comma-separated), if set, only adds extra recipients. */
function recipients(): string[] {
  const extras = process.env.LEAD_NOTIFY_EMAIL?.split(",") ?? [];
  return Array.from(new Set([BRAND_EMAIL, ...extras].map((e) => e.trim().toLowerCase()).filter(Boolean)));
}

/**
 * E-mails a Meta lead to the sales inbox. Never throws: the lead is already stored by the time this
 * runs, and a mail problem must not turn into a failed webhook (Make would retry and spam the logs).
 * Logs only the lead id, never name/phone/e-mail.
 */
export async function notifyMetaLead(lead: LeadRow): Promise<void> {
  try {
    if (lead.source !== "meta") return; // site leads already get their own e-mail in /api/quote

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[meta leads] RESEND_API_KEY not configured, e-mail skipped", { leadId: lead.id });
      return;
    }

    const { subject, html, text, replyTo } = buildMetaLeadEmail(lead);
    const { error } = await new Resend(apiKey).emails.send(
      { from: FROM_EMAIL, to: recipients(), replyTo, subject, html, text },
      // Defense in depth: the same lead can never produce two e-mails, even on a concurrent retry.
      { idempotencyKey: `meta-lead/${lead.external_id ?? lead.id}` }
    );
    if (error) console.error("[meta leads] Resend rejected the e-mail", { leadId: lead.id, error });
  } catch (err) {
    console.error("[meta leads] e-mail notification failed", { leadId: lead.id, err });
  }
}
