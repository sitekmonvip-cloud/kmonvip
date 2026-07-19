import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales
  locales: ["pt", "en", "es", "zh", "ja", "fr", "de"] as const,

  // Default locale (PT = canonical, no prefix)
  defaultLocale: "pt",

  // PT keeps "/", others use prefix "/en", "/es", etc.
  localePrefix: "as-needed",

  // We control hreflang precisely per-page via generateMetadata (only for
  // pages with real translated content — see src/lib/seo/i18n-status.ts).
  // next-intl's automatic Link-header hreflang is indiscriminate: it fires
  // on every route regardless of whether that page has real content in
  // each locale, which is exactly the false-signal problem being fixed.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
