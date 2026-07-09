"use client";

import { useState, useRef, useEffect } from "react";
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

export default function FloatingLanguageButton() {
  const t = useTranslations("languages");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const switchTo = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed bottom-24 right-6 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 -z-10 bg-black/20 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Popup panel */}
      <div
        className={`absolute bottom-full right-0 mb-3 w-56 origin-bottom-right rounded-2xl border border-ink-200 bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 border-b border-ink-100">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
            {tc("language")}
          </span>
        </div>
        <div className="py-1 max-h-[55vh] overflow-y-auto">
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                onClick={() => switchTo(l)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-ink-50 ${
                  active ? "bg-ink-50 font-medium" : ""
                }`}
              >
                <span className="text-lg leading-none">{FLAGS[l]}</span>
                <span className="text-ink-900">{t(l)}</span>
                {active && (
                  <svg
                    className="ml-auto shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={tc("language")}
        aria-expanded={open}
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-ink-200 bg-white text-2xl shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 ${
          open ? "scale-105 shadow-xl" : ""
        }`}
      >
        <span className="leading-none">{FLAGS[locale]}</span>
      </button>
    </div>
  );
}
