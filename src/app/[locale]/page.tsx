import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Authority from "@/components/Authority";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Fleet from "@/components/Fleet";
import Coverage from "@/components/Coverage";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "",
  });
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Services />
        <Fleet />
        <Differentials />
        <Authority />
        <Clients />
        <Coverage />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
