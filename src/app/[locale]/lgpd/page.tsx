import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import { buildMetadata } from "@/lib/seo/metadata";
import { BRAND_EMAIL } from "@/lib/seo/constants";
import { LEGAL } from "@/lib/legal";
import { Link } from "@/i18n/navigation";
import CookiePrefsLink from "@/components/CookiePrefsLink";

export const metadata: Metadata = buildMetadata({
  title: "LGPD — Encarregado de Dados KMON VIP",
  description:
    "Informações sobre o tratamento de dados pessoais pela KMON VIP em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  path: "/lgpd",
  keywords: ["LGPD KMON VIP", "encarregado de dados KMON VIP", "DPO KMON VIP", "Lei Geral de Proteção de Dados KMON VIP", "titular de dados KMON VIP"],
});

export default function LGPDPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "LGPD", path: "/lgpd" },
          ]}
        />

        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1] mb-3">
              LGPD — Proteção de Dados
            </h1>
            <p className="text-sm text-ink-500 mb-10">
              Última atualização: junho de 2026
            </p>

            <div className="flex flex-col gap-8 text-base text-ink-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">Compromisso com a LGPD</h2>
                <p>
                  A KMON VIP atua em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD), aplicando boas práticas de governança, segurança da informação e respeito aos direitos dos titulares de dados. O controlador é a {LEGAL.companyName} (CNPJ {LEGAL.cnpj}), nome fantasia KMON VIP. Os detalhes do tratamento estão na{" "}
                  <Link href="/politica-de-privacidade" className="text-ink-900 underline hover:text-brand-champagne-dark">Política de Privacidade</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">Direitos do titular</h2>
                <p>Como titular de dados pessoais tratados pela KMON VIP, você tem direito a:</p>
                <ul className="mt-3 flex flex-col gap-2 list-disc list-inside text-ink-700">
                  <li>Confirmação da existência de tratamento</li>
                  <li>Acesso aos dados</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                  <li>Portabilidade dos dados</li>
                  <li>Eliminação de dados tratados com consentimento</li>
                  <li>Informação sobre compartilhamento</li>
                  <li>Revogação do consentimento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">Encarregado de Dados (DPO)</h2>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato com o nosso Encarregado de Dados pelo canal abaixo:
                </p>
                <p className="mt-3">
                  E-mail:{" "}
                  <a href={`mailto:${BRAND_EMAIL}`} className="text-ink-900 underline hover:text-brand-champagne-dark">{BRAND_EMAIL}</a>
                </p>
                <p className="mt-1 text-sm text-ink-500">
                  Responderemos em até 15 dias corridos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">Base legal</h2>
                <p>
                  Tratamos dados pessoais com base em uma ou mais das seguintes hipóteses legais previstas no art. 7º da LGPD: execução de procedimentos preliminares relacionados a contrato (para responder à sua cotação), consentimento do titular (cookies de estatísticas e publicidade, e envio de dados com hash ao Google para medição de conversões), cumprimento de obrigação legal, exercício regular de direitos e legítimo interesse do controlador (segurança e prevenção a fraudes).
                </p>
                <p className="mt-3">
                  Você pode revogar o consentimento a qualquer momento em <CookiePrefsLink />.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink-900 mb-3">Segurança</h2>
                <p>
                  Adotamos medidas técnicas e organizacionais para proteger dados pessoais contra acesso não autorizado, perda acidental ou divulgação indevida. Em caso de incidente que possa acarretar risco aos titulares, comunicaremos a ANPD e os afetados nos termos da lei.
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
