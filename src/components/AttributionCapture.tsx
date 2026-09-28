"use client";

import { useEffect } from "react";
import { captureAttributionOnce } from "@/lib/tracking/attribution";
import { gtmEvent } from "@/lib/tracking/gtm";

/** Mounted once in the root locale layout — captures first-touch UTM/gclid/fbclid/referrer. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionOnce();

    // Delegated so mailto links in server components are tracked without client wrappers.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="mailto:"]');
      if (link) gtmEvent("email_click", { link_text: link.textContent?.trim() ?? null });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
