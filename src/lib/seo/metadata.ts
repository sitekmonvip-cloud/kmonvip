import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./constants";
import { getIndexableLocales } from "./i18n-status";
import { buildLocaleUrl, buildHreflangAlternates } from "./locale-urls";

const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  zh: "zh_CN",
  ja: "ja_JP",
  fr: "fr_FR",
  de: "de_DE",
};

type BuildMetadataOpts = {
  // Optional for now: pages still on static `export const metadata` (not
  // yet migrated to generateMetadata) can't pass the real locale, since a
  // static export has no access to route params. Defaulting to "pt" keeps
  // their output byte-identical to before this change (same canonical,
  // same index:true) for every locale variant until they're migrated —
  // no regression, just no fix yet either. Pages using generateMetadata
  // (the correct pattern) must pass their real locale explicitly.
  locale?: Locale;
  title: string;            // page title (without "| KMON VIP" — template appends it)
  description: string;
  path: string;             // canonical path, e.g. "/servicos/transporte-blindado"
  image?: string;           // OG image path (relative to /public)
  keywords?: string[];
};

// Locale-aware metadata: canonical, hreflang, and robots.index all derive
// from a single source of truth (getIndexableLocales) so metadata and
// sitemap.ts can never drift apart. A locale that isn't in the indexable
// list for this path gets noindex and NO canonical/hreflang at all —
// never both a cross-locale canonical AND noindex on the same page, and
// never a hreflang tag/header claiming a translation that doesn't exist.
export function buildMetadata({
  locale = "pt",
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
}: BuildMetadataOpts): Metadata {
  const indexableLocales = getIndexableLocales(path);
  const isIndexable = indexableLocales.includes(locale);
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  if (!isIndexable) {
    return {
      title,
      description,
      keywords: keywords.length ? keywords : undefined,
      // Explicit empty object, not an omitted key: Next's metadata merge is
      // shallow per top-level key (confirmed via generate-metadata.md
      // "Merging") — omitting `alternates` entirely lets the root layout's
      // `alternates.canonical` leak through onto this noindex page, which
      // is exactly the noindex+cross-page-canonical conflict we're trying
      // to avoid. An empty object replaces the parent's value with nothing.
      alternates: {},
      robots: { index: false, follow: true },
    };
  }

  const url = buildLocaleUrl(locale, path);
  const languages = buildHreflangAlternates(path, indexableLocales);

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] ?? "pt_BR",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
