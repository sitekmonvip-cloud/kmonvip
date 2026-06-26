"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";

type Event = {
  title: string;
  desc: string;
  image: string;
};

type YearGroup = {
  year: number;
  events: Event[];
};

const timeline: YearGroup[] = [
  {
    year: 2011,
    events: [
      {
        title: "Visita do Presidente Barack Obama",
        desc: "Operação diplomática de alto nível durante a visita oficial do Presidente dos Estados Unidos ao Brasil.",
        image: "/images/timeline/2011 obama.jpg",
      },
      {
        title: "Visita da Secretária Hillary Clinton",
        desc: "Receptivo executivo e blindado para a Secretária de Estado dos EUA e comitiva diplomática.",
        image: "/images/timeline/2011 Hillary.webp",
      },
    ],
  },
  {
    year: 2014,
    events: [
      {
        title: "Copa do Mundo FIFA",
        desc: "Mobilidade executiva para delegações, autoridades e convidados VIP durante o mundial sediado no Brasil.",
        image: "/images/timeline/2014 copa do mundo.webp",
      },
    ],
  },
  {
    year: 2016,
    events: [
      {
        title: "Jogos Olímpicos Rio 2016",
        desc: "Frota dedicada para comitivas internacionais, federações esportivas e autoridades olímpicas.",
        image: "/images/timeline/2016 olinpiedas.webp",
      },
    ],
  },
  {
    year: 2019,
    events: [
      {
        title: "Posse do Presidente Jair Bolsonaro",
        desc: "Operação de mobilidade para comitivas e autoridades durante a posse presidencial em Brasília.",
        image: "/images/timeline/2019 bolsonaro.webp",
      },
      {
        title: "Visita do Secretário Mike Pompeo",
        desc: "Receptivo executivo para o Secretário de Estado dos Estados Unidos em visita oficial ao Brasil.",
        image: "/images/timeline/2019 mike.jpg",
      },
      {
        title: "Copa América",
        desc: "Operações executivas para o evento esportivo continental sediado no Brasil.",
        image: "/images/timeline/2019 copa america.avif",
      },
    ],
  },
  {
    year: 2022,
    events: [
      {
        title: "GP Brasil — Lewis Hamilton",
        desc: "Receptivo executivo blindado para o piloto e equipe durante o Grande Prêmio do Brasil de Fórmula 1.",
        image: "/images/timeline/2022 hamilton.jpg",
      },
      {
        title: "The Killers — Tour Brasil",
        desc: "Logística executiva para a banda durante apresentações no país.",
        image: "/images/timeline/2022 the killers.jpg",
      },
    ],
  },
  {
    year: 2023,
    events: [
      {
        title: "Posse do Presidente Lula",
        desc: "Operação executiva e diplomática para comitivas, delegações internacionais e autoridades durante a posse em Brasília.",
        image: "/images/timeline/2023 lula.webp",
      },
      {
        title: "Final Sul-Americana",
        desc: "Mobilidade para delegações e autoridades durante a final continental.",
        image: "/images/timeline/2023 sulamerica.webp",
      },
      {
        title: "Red Hot Chili Peppers — Tour",
        desc: "Tour internacional atendido com discrição e logística sob medida.",
        image: "/images/timeline/2023 red hot.jpeg",
      },
    ],
  },
  {
    year: 2024,
    events: [
      {
        title: "G20 Brasil",
        desc: "Mobilidade diplomática para cúpula mundial com delegações de mais de 30 países.",
        image: "/images/timeline/2024 g20.jpeg",
      },
      {
        title: "Visita do Presidente Biden",
        desc: "Receptivo executivo e blindado para a comitiva presidencial dos Estados Unidos.",
        image: "/images/timeline/2024 biden.jpg",
      },
      {
        title: "NFL Brasil",
        desc: "Operação de transporte executivo para a primeira partida oficial da NFL sediada no Brasil.",
        image: "/images/timeline/2024 nfl.avif",
      },
    ],
  },
  {
    year: 2025,
    events: [
      {
        title: "COP 30 — Belém",
        desc: "Operação ambiental de escala global. Frota executiva para delegações internacionais em missão na Amazônia.",
        image: "/images/timeline/2025 cop 30.png",
      },
    ],
  },
  {
    year: 2026,
    events: [
      {
        title: "Nike — Lançamento 2ª Camisa Seleção Brasileira",
        desc: "Receptivo executivo para o evento Nike de apresentação da nova camisa oficial da Seleção Brasileira de Futebol.",
        image: "/images/timeline/2026  Segunda camisa da Seleção Brasileira.avif",
      },
    ],
  },
];

const AUTOPLAY_MS = 3000;

export default function Authority() {
  const [activeYear, setActiveYear] = useState(2026);
  const [isPaused, setIsPaused] = useState(false);
  const userInteractedRef = useRef(false);

  const activeIdx = useMemo(
    () => timeline.findIndex((g) => g.year === activeYear),
    [activeYear]
  );

  const activeGroup = timeline[activeIdx];
  const totalEvents = useMemo(
    () => timeline.reduce((acc, g) => acc + g.events.length, 0),
    []
  );

  // ── Autoplay ──
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveYear((y) => {
        const i = timeline.findIndex((g) => g.year === y);
        const next = (i + 1) % timeline.length;
        return timeline[next].year;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleUserPick = (year: number) => {
    userInteractedRef.current = true;
    setActiveYear(year);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 14000);
  };

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-4 block">
            Quem somos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
            Mobilidade para quem lidera, representa e decide.
          </h2>
          <p className="text-lg text-ink-500 leading-relaxed max-w-2xl">
            A KMON VIP atende operações executivas, diplomáticas e corporativas
            com frota premium, motoristas treinados e planejamento logístico sob
            medida para agendas que exigem segurança, pontualidade e discrição.
          </p>
        </div>

        {/* Timeline section */}
        <div
          className="mt-12 rounded-3xl border border-ink-100 bg-paper p-6 md:p-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !userInteractedRef.current && setIsPaused(false)}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 block mb-1">
                Operações & Eventos
              </span>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
                Grandes operações e eventos já atendidos
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shrink-0">
              {totalEvents} marcos
            </span>
          </div>

          {/* Timeline track */}
          <div className="relative py-8">
            <div className="absolute top-8 left-0 right-0 h-px bg-ink-200">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-ink-200" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-ink-200" />
            </div>

            {/* Years */}
            <div className="flex justify-between relative pt-6 overflow-x-auto gap-3 md:gap-0">
              {timeline.map((g) => {
                const isActive = g.year === activeYear;
                return (
                  <button
                    key={g.year}
                    onClick={() => handleUserPick(g.year)}
                    className="relative flex flex-col items-center pt-14 cursor-pointer transition-transform hover:-translate-y-0.5 select-none shrink-0"
                  >
                    <span
                      className={`absolute top-0 w-px transition-all ${
                        isActive ? "h-8 bg-ink-900" : "h-6 bg-ink-200"
                      }`}
                    />

                    {isActive ? (
                      <span className="relative">
                        <span className="flex h-14 px-4 items-center justify-center rounded-full bg-ink-900 text-paper text-lg font-medium shadow-lg -mt-2.5 animate-[dotPop_400ms_cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap">
                          {g.year}
                        </span>
                        {g.events.length > 1 && (
                          <span
                            className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                          >
                            {g.events.length}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="relative">
                        <span className="text-xl md:text-2xl font-medium tracking-tight text-ink-700">
                          {g.year}
                        </span>
                        {g.events.length > 1 && (
                          <span className="absolute -top-1 -right-2.5 h-1.5 w-1.5 rounded-full bg-brand-champagne" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active year — events grid */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl font-medium tracking-tight text-ink-900">{activeGroup.year}</span>
              <span className="text-sm text-ink-500">
                {activeGroup.events.length} {activeGroup.events.length === 1 ? "evento" : "eventos"}
              </span>
            </div>

            <div
              key={activeGroup.year}
              className={`grid gap-4 ${
                activeGroup.events.length === 1
                  ? "md:grid-cols-1 max-w-xl mx-auto"
                  : activeGroup.events.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
              }`}
            >
              {activeGroup.events.map((ev, i) => (
                <article
                  key={`${activeGroup.year}-${i}`}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] ring-1 ring-ink-100 shadow-md animate-[fadeUp_500ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 text-paper">
                    <span
                      className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium mb-3"
                      style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                    >
                      {activeGroup.year}
                    </span>
                    <h4 className="text-base md:text-lg font-medium tracking-tight mb-2 leading-tight">
                      {ev.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() =>
                handleUserPick(timeline[Math.max(0, activeIdx - 1)].year)
              }
              disabled={activeIdx === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() =>
                handleUserPick(
                  timeline[Math.min(timeline.length - 1, activeIdx + 1)].year
                )
              }
              disabled={activeIdx === timeline.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Próximo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3 Cards below — Segurança / Discrição / Precisão */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Segurança",
              desc: "Veículos executivos com opções blindadas, motoristas treinados e protocolos de segurança para agendas sensíveis.",
            },
            {
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: "Discrição",
              desc: "Confidencialidade absoluta em cada operação. Atendimento sob protocolo para clientes que exigem privacidade.",
            },
            {
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Precisão",
              desc: "Planejamento logístico detalhado, pontualidade operacional e suporte 24h para agendas que não permitem falhas.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-ink-100 bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-50 text-ink-900 mb-6 transition-colors group-hover:bg-ink-900 group-hover:text-paper">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-3">{item.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
