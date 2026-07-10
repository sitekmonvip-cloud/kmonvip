import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/page/PageHero";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import FeatureList from "@/components/page/FeatureList";
import FAQ from "@/components/page/FAQ";
import RelatedLinks from "@/components/page/RelatedLinks";
import PageCTA from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/seo/constants";
import { ORG_ID } from "@/components/seo/schemas";

const PATH = "/diplomatic-transport-brazil";
const IMAGE = "/images/services/transporte-diplomatico.webp";

const OG_LOCALE: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  zh: "zh_CN",
  ja: "ja_JP",
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "diplomaticLanding" });
  const url = `${SITE_URL}${locale === "pt" ? "" : `/${locale}`}${PATH}`;
  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = `${SITE_URL}${IMAGE}`;

  return {
    title,
    description,
    keywords: t.raw("meta.keywords") as string[],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] || "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function DiplomaticTransportBrazilPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("diplomaticLanding");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  const features = t.raw("features") as { title: string; desc: string }[];
  const faqs = t.raw("faqs") as { q: string; a: string }[];
  const related = t.raw("related") as { title: string; desc: string }[];

  const relatedLinks = [
    { href: "/servicos/transporte-diplomatico", ...related[0] },
    { href: "/servicos/transporte-blindado", ...related[1] },
    { href: "/atuacao/brasilia", ...related[2] },
  ];

  const serviceSchemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${PATH}#service`,
    serviceType: t("title"),
    name: t("title"),
    description: t("meta.description"),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Brasília" },
      { "@type": "City", name: "São Paulo" },
      { "@type": "City", name: "Rio de Janeiro" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Foreign Embassies, Consulates, International Executives",
    },
    availableLanguage: ["English", "Portuguese"],
    image: `${SITE_URL}${IMAGE}`,
    url: `${SITE_URL}${PATH}`,
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: tn("home"), path: "/" },
            { name: t("breadcrumb"), path: PATH },
          ]}
        />

        <PageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          image={IMAGE}
          imageAlt={t("title")}
          ctaLabel={t("ctaLabel")}
        />

        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </section>

        <FeatureList features={features} heading={t("featuresHeading")} />

        <FAQ faqs={faqs} heading={t("faqHeading")} />

        <RelatedLinks heading={t("relatedHeading")} links={relatedLinks} linkLabel={tc("learnMore")} />

        <PageCTA
          title={t("ctaTitle")}
          subtitle={t("ctaSubtitle")}
          ctaLabel={t("ctaLabel")}
        />

        <JsonLd data={serviceSchemaData} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
