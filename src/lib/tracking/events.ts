import { getAttribution } from "./attribution";
import { deriveServiceFromPath } from "@/lib/seo/constants";
import { generateRef, withRef } from "./whatsappRef";

export type WhatsAppEventInput = {
  eventType: "whatsapp_click" | "phone_click";
  buttonId: string;
  buttonText?: string;
  buttonLocation?: string;
  metadata?: Record<string, unknown>;
};

/** Non-blocking event log. Never throws, never delays the caller (e.g. WhatsApp navigation). */
export function trackEvent(input: WhatsAppEventInput) {
  if (typeof window === "undefined") return;

  try {
    const attribution = getAttribution();
    const payload = {
      eventType: input.eventType,
      pageUrl: window.location.pathname,
      pageTitle: document.title,
      buttonId: input.buttonId,
      buttonText: input.buttonText ?? null,
      buttonLocation: input.buttonLocation ?? null,
      service: deriveServiceFromPath(window.location.pathname),
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      utmTerm: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      referrer: attribution.referrer,
      metadata: input.metadata ?? null,
    };

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/events", blob);
      if (sent) return;
    }

    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // tracking must never break the WhatsApp/phone click it's attached to
  }
}

/**
 * Click handler for any wa.me link: stamps a fresh "Protocolo: XXXXX" onto the message the visitor is
 * about to send and logs the click with the same code. Must run before the browser follows the
 * link, which it does — onClick handlers run ahead of the default navigation.
 */
export function trackWhatsAppClick(
  event: { currentTarget: HTMLAnchorElement },
  input: Omit<WhatsAppEventInput, "eventType" | "metadata">
) {
  let ref: string | undefined;
  try {
    ref = generateRef();
    event.currentTarget.href = withRef(event.currentTarget.href, ref);
  } catch {
    ref = undefined; // never block the WhatsApp navigation over the tracking code
  }
  trackEvent({ ...input, eventType: "whatsapp_click", metadata: ref ? { ref } : undefined });
}
