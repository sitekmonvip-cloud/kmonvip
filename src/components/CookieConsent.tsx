"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "kmonvip-cookie-consent";
const AUTO_DISMISS_MS = 8000;
const SHOW_DELAY_MS = 600;

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const tc = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismissTimer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(dismissTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm z-[70] rounded-2xl border border-ink-200 bg-white/95 backdrop-blur-md shadow-2xl p-4 pr-9 animate-fade-up"
    >
      <p className="text-xs text-ink-600 leading-relaxed">
        {t("message")}{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline decoration-ink-300 hover:text-ink-900 hover:decoration-ink-900 transition-colors"
        >
          {t("linkText")}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={tc("close")}
        className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-ink-400 hover:text-ink-900 hover:bg-ink-50 transition-colors"
      >
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </div>
  );
}
