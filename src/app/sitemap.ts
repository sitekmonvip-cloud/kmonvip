import type { MetadataRoute } from "next";
import { SITE_URL, services, cities, fleet, crossPages } from "@/lib/seo/constants";
import { routing } from "@/i18n/routing";

const NON_DEFAULT_LOCALES = routing.locales.filter((l) => l !== routing.defaultLocale);

// Build URL: PT (default) has no prefix; others get "/en", "/es", etc.
function buildUrl(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${locale}${path}`;
}

// Build alternate-language URLs object for one path
function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l === "pt" ? "pt-BR" : l] = buildUrl(l, path);
  });
  return { languages };
}

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"): MetadataRoute.Sitemap {
  const now = new Date();
  // One entry per locale + alternates pointing to all variants
  return routing.locales.map((locale) => ({
    url: buildUrl(locale, path),
    lastModified: now,
    changeFrequency,
    priority,
    alternates: alternatesFor(path),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const all: MetadataRoute.Sitemap = [
    ...entry("", 1.0),

    ...entry("/servicos", 0.9),
    ...entry("/atuacao", 0.9),
    ...entry("/frota", 0.9),

    ...services.flatMap((s) => entry(`/servicos/${s.slug}`, 0.8)),
    ...cities.flatMap((c) => entry(`/atuacao/${c.slug}`, 0.8)),
    ...fleet.flatMap((f) => entry(`/frota/${f.slug}`, 0.8)),

    ...crossPages.flatMap((p) => entry(`/servicos/${p.serviceSlug}/${p.citySlug}`, 0.7)),

    ...entry("/diplomatic-transport-brazil", 0.8),

    ...entry("/sobre", 0.6, "yearly"),
    ...entry("/sobre/historia", 0.6, "yearly"),
    ...entry("/clientes", 0.6),
    ...entry("/contato", 0.6, "yearly"),
    ...entry("/cotacao", 0.7, "yearly"),

    ...entry("/politica-de-privacidade", 0.3, "yearly"),
    ...entry("/lgpd", 0.3, "yearly"),
  ];

  return all;
}
