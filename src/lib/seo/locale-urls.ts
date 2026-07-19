import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "./constants";

// PT (default locale) has no URL prefix; every other locale is prefixed.
export function buildLocaleUrl(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${locale}${path}`;
}

// Builds a reciprocal hreflang cluster for `path` across `indexableLocales`.
// Returns undefined when there's fewer than 2 locales — a single-locale
// page has no real alternate to declare, so no hreflang cluster exists.
export function buildHreflangAlternates(
  path: string,
  indexableLocales: readonly Locale[]
): Record<string, string> | undefined {
  if (indexableLocales.length < 2) return undefined;

  const languages: Record<string, string> = {};
  indexableLocales.forEach((locale) => {
    languages[locale === "pt" ? "pt-BR" : locale] = buildLocaleUrl(locale, path);
  });
  languages["x-default"] = buildLocaleUrl(routing.defaultLocale, path);
  return languages;
}
