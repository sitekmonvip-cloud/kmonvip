import { sendGTMEvent } from "@next/third-parties/google";
import { deriveServiceFromPath } from "@/lib/seo/constants";

// Every GTM event carries the page and service, so GA4 can attribute conversions to SEO landing pages.
export function gtmEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  sendGTMEvent({
    event,
    page_path: path,
    service: deriveServiceFromPath(path),
    locale: document.documentElement.lang,
    ...params,
  });
}
