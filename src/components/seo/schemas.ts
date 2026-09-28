// Schema.org JSON-LD builders for KMON VIP
import {
  SITE_URL,
  SITE_NAME,
  BRAND_FOUNDED,
  BRAND_PHONE,
  BRAND_EMAIL,
  cities,
  services,
  fleet,
  type Service,
  type City,
  type FleetCategory,
} from "@/lib/seo/constants";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HQ_LOCALBIZ_ID = `${SITE_URL}/#localbusiness-brasilia`;

// ─── Core Organization ───────────────────────────────────────────────
export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "KMON VIP Transporte Executivo",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logos/kmon-logo-512.png`,
      width: 512,
      height: 512,
    },
    foundingDate: BRAND_FOUNDED,
    description:
      "Transporte executivo, blindado e diplomático para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil.",
    knowsAbout: [
      "Transporte executivo com motorista",
      "Aluguel de carro blindado com motorista",
      "Transporte diplomático",
      "Transfer executivo em aeroportos",
      "Logística de transporte para eventos e congressos",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BRAND_PHONE,
        contactType: "customer service",
        email: BRAND_EMAIL,
        areaServed: "BR",
        availableLanguage: ["Portuguese", "English", "Spanish"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/kmonvip/",
      "https://www.linkedin.com/company/kmonvip-transportes-executivo/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
  };
}

// ─── WebSite ──────────────────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

// ─── LocalBusiness (HQ Brasília — used on home + sobre) ──────────────
export function hqLocalBusinessSchema() {
  const bsb = cities.find((c) => c.isHQ)!;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": HQ_LOCALBIZ_ID,
    name: `${SITE_NAME} — Brasília`,
    parentOrganization: { "@id": ORG_ID },
    url: SITE_URL,
    image: `${SITE_URL}${bsb.image}`,
    priceRange: "$$$$",
    telephone: BRAND_PHONE,
    email: BRAND_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: bsb.geo.lat,
      longitude: bsb.geo.lng,
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "AdministrativeArea", name: c.region },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

// ─── City schema (per /atuacao/<slug>) ───────────────────────────────
// Only the HQ has a physical address, so only it is a LocalBusiness; other
// cities are service areas (LocalBusiness without an office breaks Google's guidelines).
export function citySchema(city: City) {
  if (city.isHQ) return hqLocalBusinessSchema();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/atuacao/${city.slug}#service`,
    name: `Transporte executivo com motorista em ${city.name}`,
    serviceType: "Transporte executivo com motorista",
    description: city.intro,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.region },
    },
    image: `${SITE_URL}${city.image}`,
    url: `${SITE_URL}/atuacao/${city.slug}`,
  };
}

// ─── Service schema ──────────────────────────────────────────────────
export function serviceSchema(service: Service, opts?: { areaCity?: City }) {
  const area = opts?.areaCity
    ? [{ "@type": "City", name: opts.areaCity.name, containedInPlace: { "@type": "AdministrativeArea", name: opts.areaCity.region } }]
    : cities.map((c) => ({ "@type": "City", name: c.name }));

  const url = opts?.areaCity
    ? `${SITE_URL}/servicos/${service.slug}/${opts.areaCity.slug}`
    : `${SITE_URL}/servicos/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: service.name,
    name: service.hook,
    description: service.intro,
    provider: { "@id": ORG_ID },
    areaServed: area,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Executives, Diplomats, Corporate Clients",
    },
    image: `${SITE_URL}${service.image}`,
    url,
  };
}

// ─── Fleet schema ────────────────────────────────────────────────────
// A chauffeured vehicle is a service, not a product for sale; Product without
// offers/reviews is flagged as invalid in Search Console's product snippets report.
export function fleetSchema(item: FleetCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/frota/${item.slug}#service`,
    name: `${item.name} com motorista`,
    serviceType: `Locação de ${item.name.toLowerCase()} com motorista`,
    description: item.intro,
    image: `${SITE_URL}${item.image}`,
    provider: { "@id": ORG_ID },
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Passageiros", value: item.specs.passengers },
      { "@type": "PropertyValue", name: "Modelo", value: item.specs.model },
    ],
    url: `${SITE_URL}/frota/${item.slug}`,
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────────────
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

// ─── ContactPage ─────────────────────────────────────────────────────
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contato`,
    name: "Contato — KMON VIP",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

// ─── Combined helpers ────────────────────────────────────────────────
export function siteSchemas() {
  return [orgSchema(), websiteSchema()];
}

// IDs for cross-referencing
export { ORG_ID, WEBSITE_ID, HQ_LOCALBIZ_ID };

// Re-export for convenience in pages
export { services, cities, fleet };

// ─── BlogPosting ─────────────────────────────────────────────────────
export function blogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  cover_image_url: string | null;
  published_at: string | null;
  updated_at: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const isBrandAuthor = !post.author || /kmon/i.test(post.author);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    inLanguage: "pt-BR",
    ...(post.cover_image_url ? { image: post.cover_image_url } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    dateModified: post.updated_at,
    author: isBrandAuthor ? { "@id": ORG_ID } : { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID },
  };
}
