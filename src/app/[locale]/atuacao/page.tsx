import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { cities } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Atuação Nacional — Transporte Executivo nas Principais Capitais",
  description:
    "Atuação da KMON VIP em Brasília (sede), São Paulo, Rio de Janeiro, Belo Horizonte, Manaus e Belém. Frota executiva e blindada nas principais capitais do Brasil.",
  path: "/atuacao",
  keywords: [
    "atuação nacional KMON VIP",
    "transporte executivo nas capitais",
    "transporte executivo Brasília",
    "transporte executivo São Paulo",
    "transporte executivo Rio de Janeiro",
    "transporte executivo Belo Horizonte",
    "transporte executivo Manaus",
    "transporte executivo Belém",
  ],
});

export default function AtuacaoHub() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Atuação", path: "/atuacao" },
          ]}
        />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Atuação Nacional
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              Operação executiva nas principais capitais do Brasil
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Brasília é nossa sede. Atendemos diariamente embaixadas, autoridades, executivos e operações corporativas em 6 capitais brasileiras.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/atuacao/${c.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-ink-900 text-paper aspect-[4/5] block"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                {c.isHQ && (
                  <span
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em]"
                    style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                  >
                    Sede
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h2 className="text-2xl font-medium tracking-tight mb-1">{c.name}</h2>
                  <p className="text-sm text-white/70 mb-3">{c.region}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-brand-champagne">
                    Ver atendimento
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
