import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppCTA from "@/components/page/WhatsAppCTA";
import JsonLd from "@/components/seo/JsonLd";
import GpQuoteForm from "@/components/eventos/GpQuoteForm";
import { INTERLAGOS_PATH, INTERLAGOS_VIEWBOX } from "@/components/eventos/interlagos";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/components/seo/schemas";
import { SITE_URL } from "@/lib/seo/constants";
import { localizedMetadata } from "@/lib/seo/metadata";
import s from "./gp.module.css";

const PATH = "/eventos/gp-sao-paulo";
const IMG = "/images/eventos/gp-sao-paulo";
const HF = "https://d8j0ntlcm91z4.cloudfront.net/user_34vwukDeydCfcAKkc5s4Ynp0Fc9";
const ART = {
  hero: `${HF}/hf_20261022_145153_27dd57b6-795b-4c20-b665-519cae860ff2.png`,
  city: `${HF}/hf_20261022_145153_4e548f62-b363-45e6-8df9-b70a42320ef8.png`,
  chauffeur: `${HF}/hf_20261022_145153_3ff1f02e-5008-4ace-8fde-a66b3d7d7169.png`,
};

const WA_MESSAGE =
  "Olá! Vim pelo site da KMON VIP e quero cotar o transporte oficial blindado para o GP de São Paulo (6 a 8 de novembro).";

export const generateMetadata = localizedMetadata({
  title: "Transporte Oficial Blindado — GP de São Paulo 2026",
  description:
    "Transporte oficial blindado para o GP de São Paulo, de 6 a 8 de novembro de 2026, em Interlagos. Sedans e SUVs blindados com motorista treinado.",
  path: PATH,
  image: ART.hero,
  keywords: [
    "transporte oficial GP São Paulo",
    "transporte blindado GP São Paulo",
    "carro blindado com motorista Interlagos",
    "transporte Fórmula 1 São Paulo 2026",
    "motorista Interlagos",
  ],
});

const FLEET = [
  { name: "Sedan blindado", model: "Mercedes-Benz Classe E Blindado ou similar", pax: "1 a 4 passageiros", image: "/images/fleet/classe-e.webp", alt: "Mercedes-Benz Classe E blindado preto", desc: "Sedan blindado com motorista para agendas que exigem segurança elevada com discrição e conforto executivo." },
  { name: "SUV blindado", model: "Jeep Commander Blindado ou similar", pax: "1 a 4 passageiros", image: "/images/fleet/suv-commander.webp", alt: "Jeep Commander blindado", desc: "SUV blindado com motorista para autoridades, diplomatas e executivos que exigem proteção elevada e maior capacidade." },
];

const STEPS = [
  { title: "Cotação", desc: "Você informa os dias, o número de passageiros e de onde sai: hotel, endereço ou aeroporto." },
  { title: "Planejamento de rota", desc: "Definimos horários e trajetos considerando o trânsito do fim de semana e os pontos de embarque do evento." },
  { title: "No dia", desc: "Motorista treinado em direção defensiva e evasiva, com o veículo blindado à disposição no período contratado." },
  { title: "Retorno", desc: "Buscamos você no ponto combinado na saída do autódromo e levamos ao destino." },
];

const SCHEDULE = [
  { day: "Sexta", date: "6 nov", items: [["Treino livre 1", "12h30"], ["Treino livre 2", "16h"]] },
  { day: "Sábado", date: "7 nov", items: [["Treino livre 3", "11h30"], ["Classificação", "15h"]] },
  { day: "Domingo", date: "8 nov", items: [["Corrida", "14h"]] },
];

const FAQS = [
  { q: "Todos os veículos desta operação são blindados?", a: "Sim. No GP de São Paulo atendemos somente com veículos blindados: sedan Mercedes-Benz Classe E Blindado ou SUV Jeep Commander Blindado, ou similares, sempre com motorista treinado em direção defensiva e evasiva." },
  { q: "O carro entra no autódromo de Interlagos?", a: "O acesso de veículos ao autódromo segue as regras da organização do evento. Planejamos o embarque e o desembarque nos pontos definidos para o seu acesso e combinamos com você o ponto de encontro na saída." },
  { q: "Atendem quem chega pelos aeroportos de Guarulhos e Congonhas?", a: "Sim. Fazemos o receptivo em Guarulhos (GRU) e Congonhas (CGH), com monitoramento do voo, e seguimos para o hotel ou direto para Interlagos." },
  { q: "Posso contratar só um dia do fim de semana?", a: "Sim. A contratação pode ser por dia, por trecho ou para o fim de semana inteiro. A cotação é feita conforme os dias, os horários e o veículo escolhido." },
  { q: "Com quanto tempo de antecedência devo reservar?", a: "O fim de semana do GP é de alta demanda em São Paulo. Recomendamos solicitar a cotação o quanto antes para garantir o veículo e os horários desejados." },
];

const eyebrow = "text-[11px] font-medium uppercase tracking-[0.22em]";

function Track({ className, stroke, width, draw }: { className?: string; stroke: string; width: number; draw: string }) {
  return (
    <svg viewBox={INTERLAGOS_VIEWBOX} className={className} fill="none" aria-hidden="true">
      <path d={INTERLAGOS_PATH} pathLength={1} stroke={stroke} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" className={`${s.trackLine} ${draw}`} />
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
            name: "Transporte oficial blindado para o GP de São Paulo 2026",
            serviceType: "Transporte blindado com motorista",
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "City", name: "São Paulo" },
            url: `${SITE_URL}${PATH}`,
          },
        ]}
      />

      <main className="flex-1 bg-[#0A0A0A]">
        {/* ─── Hero · black ─── */}
        <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-white">
          <div className={`absolute inset-0 -z-20 ${s.heroImage}`}>
            <Image src={ART.hero} alt="Sedan blindado preto à noite ao lado da arquibancada de um autódromo" fill priority sizes="100vw" className={`object-cover object-[70%_50%] ${s.mono}`} />
          </div>
          <div className={`-z-10 ${s.sweep}`} />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0.9)_36%,rgba(10,10,10,0.45)_68%,rgba(10,10,10,0.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

          <div className="mx-auto max-w-7xl px-5 pt-36 pb-24 md:pt-44 md:pb-32">
            <div className="max-w-2xl">
              <div className={`${s.rise} ${s.d1} mb-8 flex items-center gap-5`}>
                <Image src={`${IMG}/f1-logo-white.png`} alt="Formula 1" width={288} height={126} className="h-10 w-auto md:h-12" />
                <span className="h-10 w-px bg-white/25" />
                <span className={`${eyebrow} leading-relaxed text-white/80`}>
                  Transporte oficial
                  <br />
                  GP de São Paulo 2026
                </span>
              </div>
              <h1 className={`${s.rise} ${s.d2} text-4xl font-bold italic leading-[1.03] sm:text-5xl md:text-[64px]`} style={{ letterSpacing: "-0.035em" }}>
                Transporte oficial{" "}
                <em className="text-[#BFB08A]">
                  blindado
                </em>{" "}
                para o GP de São Paulo
              </h1>
              <p className={`${s.rise} ${s.d3} mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg`}>
                Sedans e SUVs blindados com motorista treinado em direção defensiva e evasiva. Do hotel ou do aeroporto até Interlagos e de volta, nos três dias do evento.
              </p>
              <div className={`${s.rise} ${s.d4} mt-9 flex flex-col gap-3 sm:flex-row`}>
                <a href="#cotacao" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0A0A0A] transition-transform hover:-translate-y-0.5">
                  Solicitar cotação <span aria-hidden="true">&rarr;</span>
                </a>
                <WhatsAppCTA message={WA_MESSAGE} buttonId="gp-sp-hero-whatsapp" buttonLocation="gp-sp-hero" className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm text-white transition-colors hover:border-white/60">
                  Falar no WhatsApp
                </WhatsAppCTA>
              </div>
              <p className={`${s.rise} ${s.d5} mt-10 text-sm tabular-nums text-white/50`}>
                6 — 8 de novembro de 2026 · Autódromo José Carlos Pace, Interlagos
              </p>
            </div>
          </div>
          <div className={`${s.timingBar} h-px bg-white/10`} />
        </section>

        {/* ─── Facts · dark gray ─── */}
        <section className="bg-[#161616] text-white">
          <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
            {[
              ["Somente blindados", "Sedans e SUVs blindados, com motorista treinado."],
              ["Operação 24h", "Suporte durante todo o fim de semana do GP."],
              ["Rota planejada", "Trajetos e horários pensados para o trânsito do evento."],
            ].map(([t, d], i) => (
              <div key={t} className={`px-5 py-8 md:px-8 ${i > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""}`}>
                <p className="text-sm tabular-nums text-[#BFB08A]">0{i + 1}</p>
                <p className="mt-2 text-base font-medium">{t}</p>
                <p className="mt-1 text-sm text-white/55">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Fleet · dark gray, same cards as the home page ─── */}
        <section className="border-t border-white/10 bg-[#161616] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className={`${s.reveal} max-w-2xl`}>
              <p className={`${eyebrow} text-[#BFB08A]`}>Frota do fim de semana</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Dois modelos, ambos blindados</h2>
              <p className="mt-4 text-white/60">Escolha o veículo na cotação ou peça nossa indicação conforme o número de passageiros e a agenda.</p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {FLEET.map((v) => (
                <article key={v.name} className={`${s.reveal} group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-white">
                    <Image src={v.image} alt={v.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="mb-4 text-lg font-medium tracking-tight md:text-xl">{v.name}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2.5">
                        <span className="h-px w-4 bg-[#BFB08A]" aria-hidden="true" />
                        <span className="text-white/85">{v.pax}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="h-px w-4 bg-[#BFB08A]" aria-hidden="true" />
                        <span className="text-white/85">{v.model}</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-white/55">{v.desc}</p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 0 1px rgba(191,176,138,0.3) inset" }} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── City band + how it works · black ─── */}
        <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-white">
          <div className="absolute inset-0 -z-10">
            <Image src={ART.city} alt="" fill sizes="100vw" className={`object-cover opacity-35 ${s.mono}`} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A0A0A_0%,rgba(10,10,10,0.6)_35%,#0A0A0A_100%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-5 py-24 md:py-32">
            <div className={`${s.reveal} max-w-2xl`}>
              <p className={`${eyebrow} text-[#BFB08A]`}>Como funciona</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>No fim de semana do GP, a cidade inteira vai para Interlagos</h2>
              <p className="mt-4 text-white/60">Por isso combinamos tudo antes: horários, trajetos e pontos de encontro.</p>
            </div>
            <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
              {STEPS.map((st, i) => (
                <li key={st.title} className={`${s.reveal} border-t border-white/20 pt-6`}>
                  <span className="text-sm tabular-nums text-[#BFB08A]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-medium">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{st.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Schedule · light gray ─── */}
        <section className="bg-[#E9E8E4] py-20 text-[#0A0A0A] md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className={s.reveal}>
                <p className={`${eyebrow} text-[#7D6E49]`}>Programação</p>
                <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>O fim de semana em Interlagos</h2>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {SCHEDULE.map((d) => (
                  <div key={d.day} className={`${s.reveal} rounded-2xl bg-white p-6`}>
                    <p className="text-sm text-[#7D6E49]">{d.day}</p>
                    <p className="mt-1 text-2xl font-medium tabular-nums tracking-tight">{d.date}</p>
                    <ul className="mt-5 space-y-3 border-t border-[#0A0A0A]/10 pt-4 text-sm">
                      {d.items.map(([name, time]) => (
                        <li key={name} className="flex items-baseline justify-between gap-3">
                          <span className="text-[#3d3a35]">{name}</span>
                          <span className="font-medium tabular-nums">{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#6f6a62]">Horários de Brasília, sujeitos a alteração pela organização do evento.</p>
            </div>
            <figure className="mx-auto w-full max-w-[340px]">
              <Track className="w-full" stroke="#0A0A0A" width={2.2} draw={s.drawOnView} />
              <figcaption className="mt-6 text-center">
                <p className="text-sm font-medium uppercase tracking-[0.2em]">Interlagos</p>
                <p className="mt-1 text-xs tabular-nums text-[#6f6a62]">23°42′02″ S · 46°41′52″ W</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ─── Quote · black ─── */}
        <section id="cotacao" className="scroll-mt-28 bg-[#0A0A0A] py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr]">
            <div className={s.reveal}>
              <p className={`${eyebrow} text-[#BFB08A]`}>Cotação</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Reserve o transporte oficial blindado</h2>
              <p className="mt-4 max-w-md text-white/60">Preencha o formulário e retornamos com a proposta. Se preferir, fale com a equipe pelo WhatsApp, 24 horas.</p>
              <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-2xl lg:block">
                <Image src={ART.chauffeur} alt="Motorista abrindo a porta traseira de um SUV blindado" fill sizes="384px" className={`object-cover ${s.mono}`} />
              </div>
              <ul className="mt-8 space-y-3 text-sm text-white/75">
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Receptivo em Guarulhos (GRU) e Congonhas (CGH)</li>
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Contratação por dia, por trecho ou para o fim de semana</li>
                <li className="flex gap-3"><span className="text-[#BFB08A]">—</span>Escolta disponível sob demanda</li>
              </ul>
            </div>
            <GpQuoteForm />
          </div>
        </section>

        {/* ─── FAQ · white ─── */}
        <section className="bg-white py-20 text-[#0A0A0A] md:py-28">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Perguntas frequentes</h2>
            <div className="mt-10 divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="shrink-0 text-lg text-[#7D6E49] transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f5b55]">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-14 flex items-center gap-4">
              <Image src={`${IMG}/f1-logo.png`} alt="Formula 1" width={288} height={126} className="h-8 w-auto" />
              <p className="text-sm text-[#5f5b55]">KMON VIP · Transporte oficial do GP de São Paulo 2026</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
