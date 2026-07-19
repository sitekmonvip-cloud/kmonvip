import type { MetadataRoute } from "next";
import { services, cities, fleet, crossPages } from "@/lib/seo/constants";
import { getIndexableLocales } from "@/lib/seo/i18n-status";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/seo/locale-urls";

function entry(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"): MetadataRoute.Sitemap {
  const now = new Date();
  const indexableLocales = getIndexableLocales(path);
  const languages = buildHreflangAlternates(path, indexableLocales);

  // Only emit URLs for locales that actually have indexable content at
  // this path — sitemap and metadata share the same source of truth
  // (getIndexableLocales), so they can never disagree.
  return indexableLocales.map((locale) => ({
    url: buildLocaleUrl(locale, path),
    lastModified: now,
    changeFrequency,
    priority,
    ...(languages ? { alternates: { languages } } : {}),
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
