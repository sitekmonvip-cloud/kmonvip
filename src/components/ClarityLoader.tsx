"use client";

import { useEffect } from "react";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent";

/** Loads Microsoft Clarity only after the visitor grants analytics consent. */
export default function ClarityLoader({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      /* eslint-disable */
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        const t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", id);
      /* eslint-enable */
    };
    if (readConsent()?.analytics) load();
    const onChange = (e: Event) => {
      const c = (e as CustomEvent<Consent>).detail;
      if (c.analytics) load();
      else if (loaded) (window as any).clarity?.("consent", false); // eslint-disable-line
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, [id]);

  return null;
}
