import type { MetadataRoute } from "next";
import { SITE_URL, services, cities, fleet, crossPages } from "@/lib/seo/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    // Home
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1.0 },

    // Hubs
    { url: `${SITE_URL}/servicos`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/atuacao`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/frota`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Service pages
    ...services.map((s) => ({
      url: `${SITE_URL}/servicos/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // City pages
    ...cities.map((c) => ({
      url: `${SITE_URL}/atuacao/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Fleet pages
    ...fleet.map((f) => ({
      url: `${SITE_URL}/frota/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Cross-segments (long-tail)
    ...crossPages.map((p) => ({
      url: `${SITE_URL}/servicos/${p.serviceSlug}/${p.citySlug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Institutional
    { url: `${SITE_URL}/sobre`,          lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/sobre/historia`, lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/clientes`,       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contato`,        lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE_URL}/cotacao`,        lastModified: now, changeFrequency: "yearly",  priority: 0.7 },

    // Legal
    { url: `${SITE_URL}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/lgpd`,                    lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return entries;
}
