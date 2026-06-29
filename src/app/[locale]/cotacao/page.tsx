"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import { useQuoteModal } from "@/components/QuoteModal";

export default function CotacaoPage() {
  const { open } = useQuoteModal();

  // Abre o modal automaticamente ao carregar a página
  useEffect(() => {
    const t = setTimeout(() => open(), 300);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Cotação", path: "/cotacao" },
          ]}
        />

        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Cotação
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              Solicite sua cotação em 3 passos
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed mb-10">
              Conte sobre seu atendimento, escolha veículo e datas, e nossa equipe entra em contato em até 1 hora útil.
            </p>
            <button
              type="button"
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
            >
              Abrir formulário
              <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
