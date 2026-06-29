import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import { buildMetadata } from "@/lib/seo/metadata";
import { BRAND_EMAIL } from "@/lib/seo/constants";

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
                  A KMON VIP atua em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados — LGPD), aplicando boas práticas de governança, segurança da informação e respeito aos direitos dos titulares de dados.
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
                  Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, entre em contato com nosso Encarregado de Dados:
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
                  Tratamos dados pessoais com base em uma ou mais das seguintes hipóteses legais previstas no art. 7º da LGPD: consentimento do titular, execução de contrato, cumprimento de obrigação legal, exercício regular de direitos e legítimo interesse do controlador.
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
