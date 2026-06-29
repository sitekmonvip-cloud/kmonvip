import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { contactPageSchema } from "@/components/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { BRAND_EMAIL, BRAND_WHATSAPP } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contato — KMON VIP Transporte Executivo",
  description:
    "Fale com a KMON VIP. Atendimento 24h para cotações, contratos corporativos e operações executivas. Sede em Brasília, atuação nacional.",
  path: "/contato",
  keywords: [
    "contato KMON VIP",
    "telefone KMON VIP",
    "WhatsApp KMON VIP",
    "email KMON VIP",
    "cotação transporte executivo",
    "atendimento 24h transporte VIP",
    "KMON VIP Brasília contato",
  ],
});

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Contato", path: "/contato" },
          ]}
        />

        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Contato
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              Fale com a equipe KMON VIP
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed mb-10">
              Atendimento 24 horas para cotações, contratos corporativos e operações executivas.
            </p>

            <dl className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-ink-100 bg-white p-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  WhatsApp 24h
                </dt>
                <dd>
                  <a
                    href={`https://wa.me/${BRAND_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-ink-900 hover:text-brand-champagne-dark transition-colors"
                  >
                    +55 (61) 99863-0303
                  </a>
                </dd>
              </div>
              <div className="rounded-xl border border-ink-100 bg-white p-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  E-mail
                </dt>
                <dd>
                  <a
                    href={`mailto:${BRAND_EMAIL}`}
                    className="text-lg font-medium text-ink-900 hover:text-brand-champagne-dark transition-colors"
                  >
                    {BRAND_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="rounded-xl border border-ink-100 bg-white p-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Sede
                </dt>
                <dd className="text-lg font-medium text-ink-900">Brasília — DF</dd>
              </div>
              <div className="rounded-xl border border-ink-100 bg-white p-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Atendimento
                </dt>
                <dd className="text-lg font-medium text-ink-900">24h · Nacional</dd>
              </div>
            </dl>
          </div>
        </section>

        <PageCTA
          title="Prefere preencher uma cotação?"
          subtitle="Use o formulário guiado em 3 passos para receber proposta personalizada."
        />

        <JsonLd data={contactPageSchema()} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
