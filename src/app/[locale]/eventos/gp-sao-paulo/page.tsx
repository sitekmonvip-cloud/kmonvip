import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppCTA from "@/components/page/WhatsAppCTA";
import JsonLd from "@/components/seo/JsonLd";
import GpQuoteForm from "@/components/eventos/GpQuoteForm";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/components/seo/schemas";
import { SITE_URL } from "@/lib/seo/constants";
import { localizedMetadata } from "@/lib/seo/metadata";

const PATH = "/eventos/gp-sao-paulo";
const IMG = "/images/eventos/gp-sao-paulo";
// Swap for the approved event artwork once it is added to /public.
const HERO_IMAGE = "/images/services/transporte-blindado.webp";

const WA_MESSAGE =
  "Olá! Vim pelo site da KMON VIP e quero cotar transporte blindado com motorista para o GP de São Paulo (6 a 8 de novembro).";

export const generateMetadata = localizedMetadata({
  title: "Transporte Blindado para o GP de São Paulo 2026",
  description:
    "Sedans e SUVs blindados com motorista treinado para o GP de São Paulo, de 6 a 8 de novembro de 2026, em Interlagos. Do hotel ou aeroporto ao autódromo.",
  path: PATH,
  image: HERO_IMAGE,
  keywords: [
    "transporte blindado GP São Paulo",
    "carro blindado com motorista Interlagos",
    "transporte executivo GP São Paulo 2026",
    "transfer Interlagos Fórmula 1",
    "motorista Interlagos",
  ],
});

const FLEET = [
  {
    name: "Sedan blindado",
    model: "Mercedes-Benz Classe E Blindado ou similar",
    pax: "1 a 4 passageiros",
    image: "/images/fleet/classe-e.webp",
    alt: "Mercedes-Benz Classe E blindado preto",
  },
  {
    name: "SUV blindado",
    model: "Jeep Commander Blindado ou similar",
    pax: "1 a 4 passageiros",
    image: `${IMG}/suv-blindado.webp`,
    alt: "Jeep Commander blindado",
  },
];

const STEPS = [
  {
    title: "Cotação",
    desc: "Você informa os dias, o número de passageiros e de onde sai: hotel, endereço ou aeroporto.",
  },
  {
    title: "Planejamento de rota",
    desc: "Definimos horários de saída e trajetos considerando o trânsito do fim de semana e os pontos de embarque permitidos pela organização.",
  },
  {
    title: "No dia",
    desc: "Motorista treinado em direção defensiva e evasiva, com o veículo blindado à disposição no período contratado.",
  },
  {
    title: "Retorno",
    desc: "Buscamos você no ponto combinado na saída do autódromo e levamos ao destino.",
  },
];

const SCHEDULE = [
  { day: "Sexta", date: "6 de novembro", items: ["Treino livre 1 — 12h30", "Treino livre 2 — 16h"] },
  { day: "Sábado", date: "7 de novembro", items: ["Treino livre 3 — 11h30", "Classificação — 15h"] },
  { day: "Domingo", date: "8 de novembro", items: ["Corrida — 14h"] },
];

const FAQS = [
  {
    q: "Todos os veículos desta operação são blindados?",
    a: "Sim. Para o GP de São Paulo atendemos somente com veículos blindados: sedan Mercedes-Benz Classe E Blindado ou SUV Jeep Commander Blindado, ou similares, sempre com motorista treinado em direção defensiva e evasiva.",
  },
  {
    q: "O carro entra no autódromo de Interlagos?",
    a: "O acesso de veículos ao autódromo é controlado pela organização do evento. Planejamos o embarque e o desembarque nos pontos permitidos mais próximos do seu acesso e combinamos com você o ponto de encontro na saída.",
  },
  {
    q: "Atendem quem chega pelos aeroportos de Guarulhos e Congonhas?",
    a: "Sim. Fazemos o receptivo em Guarulhos (GRU) e Congonhas (CGH), com monitoramento do voo, e seguimos para o hotel ou direto para Interlagos.",
  },
  {
    q: "Posso contratar só um dia do fim de semana?",
    a: "Sim. A contratação pode ser por dia, por trecho ou para o fim de semana inteiro. A cotação é feita conforme os dias, os horários e o veículo escolhido.",
  },
  {
    q: "Com quanto tempo de antecedência devo reservar?",
    a: "O fim de semana do GP é de alta demanda em São Paulo. Recomendamos solicitar a cotação o quanto antes para garantir o veículo e os horários desejados.",
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function GpSaoPauloPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Eventos & Congressos", path: "/servicos/eventos-e-congressos" },
            { name: "GP de São Paulo", path: PATH },
          ]),
          faqSchema(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE_URL}${PATH}#service`,
            name: "Transporte blindado com motorista para o GP de São Paulo 2026",
            serviceType: "Transporte blindado com motorista",
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "City", name: "São Paulo" },
            url: `${SITE_URL}${PATH}`,
          },
        ]}
      />

      <main className="flex-1 bg-[#0B0B0C] text-[#F3F1EC]">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Motorista abrindo a porta de um sedan blindado preto"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[70%_35%] opacity-70"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0B0B0C_0%,rgba(11,11,12,0.92)_38%,rgba(11,11,12,0.55)_70%,rgba(11,11,12,0.35)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0B0B0C] to-transparent" />

          <div className="mx-auto max-w-7xl px-5 pt-36 pb-20 md:pt-44 md:pb-28">
            <div className="max-w-2xl">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFB08A]">
                <span className="h-px w-8 bg-[#C8322B]" />
                GP de São Paulo · 6 a 8 de novembro de 2026 · Interlagos
              </p>
              <h1 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl" style={{ letterSpacing: "-0.03em" }}>
                Transporte{" "}
                <em className="font-normal not-italic" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#BFB08A" }}>
                  blindado
                </em>{" "}
                para o GP de São Paulo
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#C9C4BA] md:text-lg">
                Sedans e SUVs blindados com motorista treinado em direção defensiva e evasiva. Do hotel ou do aeroporto até Interlagos e de volta, nos três dias do evento.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cotacao"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BFB08A] px-7 py-3.5 text-sm font-medium text-[#0B0B0C] transition-transform hover:-translate-y-0.5"
                >
                  Solicitar cotação <span aria-hidden="true">&rarr;</span>
                </a>
                <WhatsAppCTA
                  message={WA_MESSAGE}
                  buttonId="gp-sp-hero-whatsapp"
                  buttonLocation="gp-sp-hero"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm text-[#F3F1EC] transition-colors hover:border-white/50"
                >
                  Falar no WhatsApp
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="border-y border-white/[0.08]">
          <div className="mx-auto grid max-w-7xl gap-px bg-white/[0.08] sm:grid-cols-3">
            {[
              { icon: "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z", title: "Somente blindados", desc: "Sedans e SUVs blindados, com motorista treinado." },
              { icon: "M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", title: "Operação 24h", desc: "Suporte durante todo o fim de semana." },
              { icon: "M3 12h4l3-8 4 16 3-8h4", title: "Rota planejada", desc: "Trajetos e horários pensados para o trânsito do GP." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-[#0B0B0C] px-5 py-7 md:px-8">
                <span className="mt-0.5 text-[#BFB08A]"><Icon d={f.icon} /></span>
                <div>
                  <p className="text-sm font-medium text-[#F3F1EC]">{f.title}</p>
                  <p className="mt-1 text-sm text-[#A7A29A]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFB08A]">Frota do fim de semana</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">Dois modelos, ambos blindados</h2>
              <p className="mt-4 text-[#A7A29A]">Escolha o veículo na cotação ou peça nossa indicação conforme o número de passageiros e o perfil da agenda.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {FLEET.map((v) => (
                <article key={v.name} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                  <div className="relative aspect-[16/10]">
                    <Image src={v.image} alt={v.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6" />
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-white/[0.08] bg-[#111113] px-6 py-5">
                    <div>
                      <h3 className="text-lg font-medium">{v.name}</h3>
                      <p className="mt-1 text-sm text-[#A7A29A]">{v.model}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-[#D9D5CD]">{v.pax}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/[0.08] bg-[#0F0F11] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFB08A]">Como funciona</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-4xl">Da cotação ao retorno, tudo combinado antes</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t border-white/15 pt-6">
                  <span className="text-sm tabular-nums text-[#BFB08A]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A7A29A]">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFB08A]">Programação</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">O fim de semana em Interlagos</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {SCHEDULE.map((d) => (
                <div key={d.day} className="bg-[#0B0B0C] p-7">
                  <p className="text-sm text-[#BFB08A]">{d.day}</p>
                  <p className="mt-1 text-xl font-medium">{d.date}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[#C9C4BA]">
                    {d.items.map((it) => <li key={it} className="tabular-nums">{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#7d786f]">Horários de Brasília, sujeitos a alteração pela organização do evento.</p>
          </div>
        </section>

        {/* Quote form */}
        <section id="cotacao" className="scroll-mt-28 border-t border-white/[0.08] bg-[#0F0F11] py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFB08A]">Cotação</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">Reserve o transporte blindado para o GP</h2>
              <p className="mt-4 max-w-md text-[#A7A29A]">
                Preencha o formulário e retornamos com a proposta. Se preferir, fale direto com a equipe pelo WhatsApp, 24 horas.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-[#C9C4BA]">
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Receptivo em Guarulhos (GRU) e Congonhas (CGH)</li>
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Contratação por dia, por trecho ou para o fim de semana</li>
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Escolta disponível sob demanda</li>
              </ul>
            </div>
            <GpQuoteForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Perguntas frequentes</h2>
            <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="shrink-0 text-[#BFB08A] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#A7A29A]">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-12 text-xs leading-relaxed text-[#6f6a62]">
              A KMON VIP não é afiliada à Fórmula 1 nem à organização do GP de São Paulo. Fórmula 1 e GP de São Paulo são marcas de seus respectivos titulares.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
