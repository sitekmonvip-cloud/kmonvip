import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

// Single source of truth for which locales have real, reviewed translated
// content per path. Absence of a path here means only the default locale
// (pt) is indexable — every other locale variant of that path renders
// identical Portuguese content today and must stay noindex until translated.
//
// Do not add a path here just because translation *keys* exist — confirm
// the rendered content is actually localized (see plan's quality-gate
// checklist) before marking a path as indexable in additional locales.
export const INDEXABLE_LOCALES_BY_PATH: Record<string, readonly Locale[]> = {
  "/diplomatic-transport-brazil": routing.locales,
  // Home: pt/en/es/de/fr verified by rendered-HTML inspection (real H1,
  // title, description — no PT residue; StatsBar was translated too but is
  // dead code, never mounted in page.tsx, so it wasn't part of what needed
  // verifying). ja/zh intentionally excluded: translations were written but
  // not yet human-reviewed for quality — see plan's quality-gate rule. Add
  // them here only after that review, not just because the JSON keys exist.
  "": ["pt", "en", "es", "de", "fr"],
};

export function getIndexableLocales(path: string): readonly Locale[] {
  return INDEXABLE_LOCALES_BY_PATH[path] ?? [routing.defaultLocale];
}
