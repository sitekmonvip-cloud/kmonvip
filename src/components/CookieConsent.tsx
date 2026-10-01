"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";

const SHOW_DELAY_MS = 600;

const BTN =
  "flex-1 rounded-full border border-ink-900 bg-ink-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-85";

export default function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setAnalytics(existing.analytics);
      setAds(existing.ads);
    } else {
      const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, []);

  // Footer / policy "Preferências de cookies" link reopens the panel
  useEffect(() => {
    const open = () => {
      const c = readConsent();
      setAnalytics(!!c?.analytics);
      setAds(!!c?.ads);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  function choose(a: boolean, d: boolean) {
    saveConsent({ analytics: a, ads: d });
    setAnalytics(a);
    setAds(d);
    setVisible(false);
    setShowPrefs(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[70] rounded-2xl border border-ink-200 bg-white shadow-2xl p-5 animate-fade-up"
    >
      <p className="text-sm font-medium text-ink-900 mb-2">{t("title")}</p>

      {!showPrefs ? (
        <>
          <p className="text-xs text-ink-600 leading-relaxed mb-4">
            {t("message")}{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline decoration-ink-300 hover:text-ink-900 hover:decoration-ink-900 transition-colors"
            >
              {t("linkText")}
            </Link>
          </p>
          <button type="button" onClick={() => choose(true, true)} className={`${BTN} w-full`}>
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={() => setShowPrefs(true)}
            className="mt-3 w-full text-center text-xs text-ink-600 underline hover:text-ink-900 transition-colors"
          >
            {t("preferences")}
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-4">
            <Row title={t("necessary")} desc={t("necessaryDesc")} checked disabled />
            <Row title={t("analytics")} desc={t("analyticsDesc")} checked={analytics} onChange={setAnalytics} />
            <Row title={t("ads")} desc={t("adsDesc")} checked={ads} onChange={setAds} />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => choose(false, false)} className={BTN}>
              {t("reject")}
            </button>
            <button type="button" onClick={() => choose(analytics, ads)} className={BTN}>
              {t("save")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Row({
  title, desc, checked, disabled, onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-ink-900"
      />
      <span>
        <span className="block text-xs font-medium text-ink-900">{title}</span>
        <span className="block text-xs text-ink-500 leading-snug">{desc}</span>
      </span>
    </label>
  );
}
