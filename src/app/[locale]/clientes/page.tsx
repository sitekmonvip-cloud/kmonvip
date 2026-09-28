import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import Clients from "@/components/Clients";
import TrustBadges from "@/components/TrustBadges";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Clientes — Empresas e Organizações que Confiam na KMON VIP",
  description:
    "FIFA, G20, COP 30, ONU, Google, Microsoft, Shell, XP, ESPN e muitas outras organizações já confiaram suas operações executivas à KMON VIP.",
  path: "/clientes",
  keywords: [
    "clientes KMON VIP",
    "empresas atendidas KMON VIP",
    "transporte para FIFA",
    "transporte para G20",
    "transporte para ONU",
    "transporte para COP 30",
    "transporte para Google Brasil",
    "transporte para Microsoft Brasil",
    "transporte para Shell",
    "transporte para XP Investimentos",
  ],
});

export default function ClientesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Clientes", path: "/clientes" },
          ]}
        />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Clientes
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              Quem confia na KMON VIP
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Organizações que operam no mais alto nível escolhem a KMON VIP para suas operações executivas, diplomáticas e de grandes eventos.
            </p>
          </div>
        </section>

        <TrustBadges />
        <Clients />

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
