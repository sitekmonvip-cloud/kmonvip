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
    logo: `${SITE_URL}/favicon.svg`,
    foundingDate: BRAND_FOUNDED,
    description:
      "Transporte executivo, blindado e diplomático para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil.",
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

// ─── City LocalBusiness (per /atuacao/<slug>) ────────────────────────
export function cityLocalBusinessSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/atuacao/${city.slug}#localbusiness`,
    name: `${SITE_NAME} — ${city.name}`,
    parentOrganization: { "@id": ORG_ID },
    url: `${SITE_URL}/atuacao/${city.slug}`,
    image: `${SITE_URL}${city.image}`,
    priceRange: "$$$$",
    telephone: BRAND_PHONE,
    email: BRAND_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
    areaServed: { "@type": "City", name: city.name },
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

// ─── Product/Vehicle schema (fleet) ──────────────────────────────────
export function fleetSchema(item: FleetCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/frota/${item.slug}#product`,
    name: item.name,
    description: item.intro,
    image: `${SITE_URL}${item.image}`,
    brand: { "@id": ORG_ID },
    category: "Transporte Executivo",
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
export function homeSchemas() {
  return [orgSchema(), websiteSchema(), hqLocalBusinessSchema()];
}

// IDs for cross-referencing
export { ORG_ID, WEBSITE_ID, HQ_LOCALBIZ_ID };

// Re-export for convenience in pages
export { services, cities, fleet };
