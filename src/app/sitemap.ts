import type { MetadataRoute } from "next";
import { SITE_URL, services, cities, fleet, crossPages } from "@/lib/seo/constants";
import { getIndexableLocales } from "@/lib/seo/i18n-status";
import { buildLocaleUrl, buildHreflangAlternates } from "@/lib/seo/locale-urls";
import { BlogService } from "@/lib/crm/blogService";

// lastModified only where we know the real date (blog posts); a build-time "now" on
// every static page teaches Google to ignore the field.
function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified?: Date,
  image?: string,
): MetadataRoute.Sitemap {
  const indexableLocales = getIndexableLocales(path);
  const languages = buildHreflangAlternates(path, indexableLocales);

  // Only emit URLs for locales that actually have indexable content at
  // this path — sitemap and metadata share the same source of truth
  // (getIndexableLocales), so they can never disagree.
  return indexableLocales.map((locale) => ({
    url: buildLocaleUrl(locale, path),
    ...(lastModified ? { lastModified } : {}),
    ...(image ? { images: [`${SITE_URL}${image}`] } : {}),
    changeFrequency,
    priority,
    ...(languages ? { alternates: { languages } } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages must stay listed even if the blog DB is unavailable.
  const posts = await BlogService.listPublished().catch((err) => {
    console.error("[sitemap] blog posts unavailable", err);
    return [];
  });

  const all: MetadataRoute.Sitemap = [
    ...entry("", 1.0),

    ...entry("/servicos", 0.9),
    ...entry("/atuacao", 0.9),
    ...entry("/frota", 0.9),

    ...services.flatMap((s) => entry(`/servicos/${s.slug}`, 0.8, "monthly", undefined, s.image)),
    ...cities.flatMap((c) => entry(`/atuacao/${c.slug}`, 0.8, "monthly", undefined, c.image)),
    ...fleet.flatMap((f) => entry(`/frota/${f.slug}`, 0.8, "monthly", undefined, f.image)),

    ...crossPages.flatMap((p) => entry(`/servicos/${p.serviceSlug}/${p.citySlug}`, 0.7)),

    ...entry("/diplomatic-transport-brazil", 0.8),

    ...entry("/sobre", 0.6, "yearly"),
    ...entry("/sobre/historia", 0.6, "yearly"),
    ...entry("/clientes", 0.6),
    ...entry("/contato", 0.6, "yearly"),
    ...entry("/cotacao", 0.7, "yearly"),

    ...entry("/politica-de-privacidade", 0.3, "yearly"),
    ...entry("/lgpd", 0.3, "yearly"),

    ...entry("/parcerias/pousada-inacia", 0.7),

    ...entry("/blog", 0.6, "weekly"),
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, 0.5, "monthly", new Date(p.updated_at))),
  ];

  return all;
}
