import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageCTA from "@/components/page/PageCTA";
import { services, cities } from "@/lib/seo/constants";

export const metadata: Metadata = {
  title: "Página não encontrada",
  // Explicit: otherwise the layout's index:true is emitted next to Next's automatic noindex.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Erro 404
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              Esta página não existe ou mudou de endereço
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed mb-10">
              Veja abaixo nossos serviços e cidades atendidas, ou fale com a equipe 24h pelo WhatsApp.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <nav aria-label="Serviços">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-3">Serviços</h2>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicos/${s.slug}`} className="text-ink-900 hover:text-brand-champagne-dark transition-colors">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Cidades atendidas">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-3">Cidades</h2>
                <ul className="space-y-2">
                  {cities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/atuacao/${c.slug}`} className="text-ink-900 hover:text-brand-champagne-dark transition-colors">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <p className="mt-10 text-sm">
              <Link href="/" className="text-ink-900 underline underline-offset-4 hover:text-brand-champagne-dark">
                Voltar para a página inicial
              </Link>
            </p>
          </div>
        </section>
        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
