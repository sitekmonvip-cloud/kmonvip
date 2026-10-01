import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import { buildMetadata } from "@/lib/seo/metadata";
import { LEGAL } from "@/lib/legal";
import CookiePrefsLink from "@/components/CookiePrefsLink";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade — KMON VIP",
  description:
    "Como a KMON VIP coleta, usa, compartilha e protege seus dados pessoais, incluindo cookies, medição de campanhas e o formulário de cotação (LGPD).",
  path: "/politica-de-privacidade",
  keywords: ["política de privacidade KMON VIP", "privacidade dados KMON VIP", "LGPD KMON VIP", "tratamento de dados KMON VIP"],
});

const H2 = "text-xl font-medium text-ink-900 mb-3";
const UL = "mt-3 flex flex-col gap-2 list-disc list-inside";

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
              Última atualização: {LEGAL.lastUpdate}
            </p>

            <div className="prose-policy flex flex-col gap-8 text-base text-ink-700 leading-relaxed">
              <section>
                <h2 className={H2}>1. Quem é o controlador</h2>
                <p>
                  O controlador dos dados pessoais tratados neste site (kmonvip.com) é a <strong>{LEGAL.companyName}</strong>, nome fantasia KMON VIP, inscrita no CNPJ sob o nº {LEGAL.cnpj}.
                </p>
                <p className="mt-3">
                  Contato do encarregado pelo tratamento de dados pessoais ({LEGAL.dpoName}):{" "}
                  <a href={`mailto:${LEGAL.privacyEmail}`} className="text-ink-900 underline hover:text-brand-champagne-dark">{LEGAL.privacyEmail}</a>.
                </p>
              </section>

              <section>
                <h2 className={H2}>2. Dados que coletamos</h2>
                <p>Coletamos os seguintes dados:</p>
                <ul className={UL}>
                  <li><strong>Fornecidos por você no formulário de cotação:</strong> nome, e-mail, telefone, cargo, empresa e detalhes do serviço solicitado (tipo de serviço, cidade, datas, tipo e modelo de veículo, informações adicionais).</li>
                  <li><strong>Dados técnicos e de navegação:</strong> endereço IP (armazenado de forma irreversível, em hash), páginas visitadas, tipo de dispositivo e navegador, página de origem, identificadores de clique de anúncios do Google (gclid, gbraid, wbraid) e parâmetros de campanha (UTMs), gravados em cookies e armazenamento do navegador.</li>
                  <li><strong>Cliques em botões de contato</strong> (WhatsApp e telefone), registrados com a página e a origem da visita.</li>
                </ul>
              </section>

              <section>
                <h2 className={H2}>3. Para que usamos seus dados e em qual base legal</h2>
                <ul className={UL}>
                  <li><strong>Responder à sua solicitação de cotação e fazer contato comercial</strong> — execução de procedimentos preliminares relacionados a contrato a pedido do titular (art. 7º, V, LGPD).</li>
                  <li><strong>Medir campanhas e melhorar anúncios</strong> (inclusive enviar ao Google o e-mail e o telefone informados no formulário, com hash, para medir conversões) — <strong>consentimento</strong> (art. 7º, I), concedido no banner de cookies. Sem seu consentimento, esses dados não são enviados.</li>
                  <li><strong>Estatísticas de uso e gravações de sessão do site</strong> (Google Analytics e Microsoft Clarity) — <strong>consentimento</strong> (art. 7º, I).</li>
                  <li><strong>Segurança, prevenção a fraudes e a spam do formulário</strong> — legítimo interesse (art. 7º, IX).</li>
                  <li><strong>Cumprimento de obrigações legais</strong> e exercício regular de direitos (art. 7º, II e VI).</li>
                </ul>
              </section>

              <section>
                <h2 className={H2}>4. Com quem compartilhamos</h2>
                <p>Não vendemos dados pessoais. Compartilhamos apenas com operadores necessários à operação:</p>
                <ul className={UL}>
                  <li><strong>Google (Google Ads, Google Analytics e Google Tag Manager):</strong> medição de campanhas e de uso do site. Quando você consente com publicidade, o e-mail e o telefone do formulário são enviados ao Google com hash (SHA-256) para medir conversões.</li>
                  <li><strong>Microsoft (Clarity):</strong> análise de uso do site, mediante consentimento.</li>
                  <li><strong>Provedores de hospedagem, banco de dados e envio de e-mail</strong> que operam o site e entregam a solicitação à nossa equipe.</li>
                  <li><strong>Nosso sistema de CRM</strong>, onde o lead é registrado para atendimento.</li>
                  <li><strong>Autoridades</strong>, quando exigido por lei ou ordem judicial.</li>
                </ul>
              </section>

              <section>
                <h2 className={H2}>5. Transferência internacional</h2>
                <p>
                  Google e Microsoft podem tratar dados em servidores fora do Brasil, inclusive nos Estados Unidos. Essas transferências ocorrem com base no art. 33 da LGPD, em especial mediante o seu consentimento específico e as garantias contratuais oferecidas por esses fornecedores.
                </p>
              </section>

              <section>
                <h2 className={H2}>6. Cookies e tecnologias semelhantes</h2>
                <p>Usamos três categorias:</p>
                <ul className={UL}>
                  <li><strong>Necessários:</strong> permitem o funcionamento do site e guardam sua escolha de cookies. Não dependem de consentimento.</li>
                  <li><strong>Estatísticas:</strong> Google Analytics e Microsoft Clarity. Só são ativados com o seu consentimento.</li>
                  <li><strong>Publicidade:</strong> medição de conversões e personalização de anúncios (Google Ads). Só são ativados com o seu consentimento.</li>
                </ul>
                <p className="mt-3">
                  O formulário de cotação funciona normalmente mesmo que você recuse os cookies opcionais.
                </p>
              </section>

              <section>
                <h2 className={H2}>7. Por quanto tempo guardamos</h2>
                <p>
                  Dados de cotação e de contato comercial são mantidos por até {LEGAL.retentionMonths} meses após o último contato; depois são eliminados ou anonimizados, salvo se houver contrato firmado ou obrigação legal de guarda por prazo maior. Cookies de publicidade e estatísticas expiram conforme definido por cada fornecedor (cookie de origem da visita: até 90 dias). Sua escolha de cookies é lembrada por 12 meses.
                </p>
              </section>

              <section>
                <h2 className={H2}>8. Seus direitos (art. 18 da LGPD)</h2>
                <p>Você pode, a qualquer momento e mediante requisição:</p>
                <ul className={UL}>
                  <li>confirmar se tratamos seus dados e acessá-los;</li>
                  <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
                  <li>solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
                  <li>solicitar a portabilidade dos dados;</li>
                  <li>solicitar a eliminação dos dados tratados com base em consentimento;</li>
                  <li>saber com quem compartilhamos seus dados;</li>
                  <li>ser informado sobre a possibilidade de não consentir e suas consequências;</li>
                  <li>revogar o consentimento.</li>
                </ul>
                <p className="mt-3">
                  Para exercer qualquer direito, escreva para{" "}
                  <a href={`mailto:${LEGAL.privacyEmail}`} className="text-ink-900 underline hover:text-brand-champagne-dark">{LEGAL.privacyEmail}</a>. Respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
                </p>
              </section>

              <section>
                <h2 className={H2}>9. Como revogar o consentimento e desativar cookies</h2>
                <p>
                  Você pode mudar sua escolha quando quiser em <CookiePrefsLink />, no rodapé de qualquer página. Também pode apagar ou bloquear cookies nas configurações do seu navegador. Revogar o consentimento não afeta o tratamento já realizado.
                </p>
              </section>

              <section>
                <h2 className={H2}>10. Segurança</h2>
                <p>
                  Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda e alteração, incluindo conexão criptografada (HTTPS), acesso restrito ao CRM e armazenamento do IP apenas em hash.
                </p>
              </section>

              <section>
                <h2 className={H2}>11. Alterações desta política</h2>
                <p>
                  Podemos atualizar esta política. A data da última atualização está no topo da página. Mudanças relevantes serão informadas no site.
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
