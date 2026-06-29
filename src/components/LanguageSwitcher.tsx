"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const FLAGS: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
  zh: "🇨🇳",
  ja: "🇯🇵",
  fr: "🇫🇷",
  de: "🇩🇪",
};

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const switchTo = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white text-sm font-medium text-ink-700 transition-colors hover:border-ink-900 ${
          compact ? "h-10 w-10 justify-center" : "px-3 py-2"
        }`}
        aria-label="Idioma / Language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{FLAGS[locale]}</span>
        {!compact && <span className="uppercase text-xs">{locale}</span>}
        {!compact && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[180px] rounded-xl border border-ink-200 bg-white shadow-lg py-2 z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-ink-50 ${
                l === locale ? "bg-ink-50 font-medium" : ""
              }`}
            >
              <span className="text-base leading-none">{FLAGS[l]}</span>
              <span className="text-ink-900">{t(l)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
