import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Soluções de Transporte Executivo, Blindado e Diplomático",
  description:
    "Soluções de mobilidade executiva: transporte executivo, blindado, diplomático, eventos, transfers e vans. Atendimento em todo o Brasil pela KMON VIP.",
  path: "/servicos",
  keywords: [
    "soluções de transporte executivo",
    "transporte executivo blindado",
    "transporte diplomático Brasil",
    "transporte para eventos corporativos",
    "transfer executivo aeroporto",
    "vans executivas com motorista",
    "ônibus executivo premium",
    "frota executiva para empresas",
  ],
});

export default function ServicosHub() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Soluções", path: "/servicos" },
          ]}
        />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Soluções
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              Mobilidade executiva para operações de alto padrão
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Frota premium, motoristas treinados e operação 24 horas. Da agenda individual à grande operação diplomática.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-ink-900 text-paper aspect-[3/4] block"
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h2 className="text-xl font-medium tracking-tight mb-1">{s.name}</h2>
                  <span className="inline-flex items-center gap-1 mt-2 text-sm text-brand-champagne">
                    Conhecer
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
