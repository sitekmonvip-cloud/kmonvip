import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales
  locales: ["pt", "en", "es", "zh", "ja", "fr", "de"] as const,

  // Default locale (PT = canonical, no prefix)
  defaultLocale: "pt",

  // PT keeps "/", others use prefix "/en", "/es", etc.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
