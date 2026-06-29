import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import { buildMetadata } from "@/lib/seo/metadata";
import { BRAND_EMAIL } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade — KMON VIP",
  description:
    "Como a KMON VIP coleta, armazena, utiliza e protege seus dados pessoais. Política de privacidade em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
  keywords: ["política de privacidade KMON VIP", "privacidade dados KMON VIP", "LGPD KMON VIP", "tratamento de dados KMON VIP"],
});

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Política de Privacidade", path: "/politica-de-privacidade" },
          ]}
        />

        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1] mb-3">
              Política de Privacidade
            </h1>
            <p className="text-sm text-ink-500 mb-10">
              Última atualização: junho de 2026
            </p>

            <div className="prose-policy flex flex-col gap-8 text-base text-ink-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">1. Quem somos</h2>
                <p>
                  A KMON VIP é uma empresa brasileira sediada em Brasília que oferece serviços de transporte executivo, blindado e diplomático. Esta política descreve como tratamos os dados pessoais coletados em nosso site e em nossas operações.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">2. Dados que coletamos</h2>
                <p>
                  Coletamos apenas os dados necessários para responder solicitações de cotação, formalizar contratos e operar o serviço contratado, incluindo nome, e-mail, telefone, empresa, cargo e detalhes da agenda de transporte solicitada.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">3. Como usamos seus dados</h2>
                <p>
                  Seus dados são utilizados exclusivamente para: (i) responder a solicitações de cotação; (ii) formalizar e executar contratos de prestação de serviço; (iii) cumprir obrigações legais e regulatórias; (iv) prevenir fraudes e garantir segurança operacional.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">4. Compartilhamento</h2>
                <p>
                  Não comercializamos dados. Compartilhamos informações apenas com fornecedores estritamente necessários à operação (ex.: motoristas designados ao seu atendimento) e quando exigido por autoridade competente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">5. Cookies</h2>
                <p>
                  Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender o uso geral das páginas. Você pode gerenciar cookies nas configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">6. Seus direitos</h2>
                <p>
                  Conforme a LGPD, você tem direito de acessar, corrigir, anonimizar, portar e excluir seus dados pessoais, bem como revogar consentimentos. Para exercer seus direitos, entre em contato pelo e-mail{" "}
                  <a href={`mailto:${BRAND_EMAIL}`} className="text-ink-900 underline hover:text-brand-champagne-dark">{BRAND_EMAIL}</a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">7. Retenção</h2>
                <p>
                  Mantemos seus dados pelo tempo necessário para atender às finalidades descritas ou conforme exigido por obrigação legal. Após esse período, os dados são anonimizados ou eliminados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">8. Contato</h2>
                <p>
                  Dúvidas sobre esta política podem ser direcionadas ao DPO da KMON VIP pelo e-mail{" "}
                  <a href={`mailto:${BRAND_EMAIL}`} className="text-ink-900 underline hover:text-brand-champagne-dark">{BRAND_EMAIL}</a>.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
