"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

/** Inline link that reopens the cookie preferences panel. */
export default function CookiePrefsLink({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className ?? "text-ink-900 underline hover:text-brand-champagne-dark"}
    >
      {children ?? "Preferências de cookies"}
    </button>
  );
}
