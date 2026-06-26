"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";

type Event = {
  year: number;
  title: string;
  desc: string;
  image: string;
};

const events: Event[] = [
  {
    year: 2011,
    title: "Visita Obama & Hillary Clinton",
    desc: "Operação diplomática de alto nível durante visita oficial dos Estados Unidos ao Brasil.",
    image: "/images/timeline/2011 obama.jpg",
  },
  {
    year: 2014,
    title: "Copa do Mundo FIFA",
    desc: "Mobilidade executiva para delegações, autoridades e convidados VIP durante o mundial.",
    image: "/images/timeline/2014 copa do mundo.webp",
  },
  {
    year: 2016,
    title: "Jogos Olímpicos Rio",
    desc: "Frota dedicada para comitivas internacionais, federações e autoridades olímpicas.",
    image: "/images/timeline/2016 olinpiedas.webp",
  },
  {
    year: 2019,
    title: "Posse Presidente Jair Bolsonaro",
    desc: "Operação de mobilidade para comitivas e autoridades durante a posse presidencial em Brasília.",
    image: "/images/timeline/2019 bolsonaro.webp",
  },
  {
    year: 2022,
    title: "GP Brasil — Lewis Hamilton",
    desc: "Receptivo executivo blindado para piloto e equipe durante o Grande Prêmio do Brasil.",
    image: "/images/timeline/2022 hamilton.jpg",
  },
  {
    year: 2023,
    title: "Posse Presidente Lula",
    desc: "Operação executiva e diplomática para comitivas, delegações internacionais e autoridades durante a posse em Brasília.",
    image: "/images/timeline/2023 lula.webp",
  },
  {
    year: 2024,
    title: "G20 Brasil & Visita Biden",
    desc: "Mobilidade diplomática para cúpula mundial e comitiva presidencial dos Estados Unidos.",
    image: "/images/timeline/2024 g20.jpeg",
  },
  {
    year: 2025,
    title: "COP 30 — Belém",
    desc: "Operação ambiental de escala global. Frota executiva para delegações em missão na Amazônia.",
    image: "/images/timeline/2025 cop 30.png",
  },
  {
    year: 2026,
    title: "Nike — Lançamento 2ª Camisa Seleção Brasileira",
    desc: "Receptivo executivo para o evento Nike de apresentação da nova camisa oficial da Seleção Brasileira de Futebol.",
    image: "/images/timeline/2026  Segunda camisa da Seleção Brasileira.avif",
  },
];

const AUTOPLAY_MS = 4500;

export default function Authority() {
  const [activeYear, setActiveYear] = useState(2026);
  const [isPaused, setIsPaused] = useState(false);
  const userInteractedRef = useRef(false);

  const activeIdx = useMemo(
    () => events.findIndex((e) => e.year === activeYear),
    [activeYear]
  );

  // Sliding window of 4 cards centered on active
  const visibleCards = useMemo(() => {
    const total = events.length;
    let start = activeIdx - 1;
    if (start < 0) start = 0;
    if (start + 4 > total) start = total - 4;
    return events.slice(start, start + 4);
  }, [activeIdx]);

  // ── Autoplay (pauses on hover/click, resumes after 12s of inactivity) ──
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveYear((y) => {
        const i = events.findIndex((e) => e.year === y);
        const next = (i + 1) % events.length;
        return events[next].year;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  // Pause autoplay when user interacts; resume after 12s idle
  const handleUserPick = (year: number) => {
    userInteractedRef.current = true;
    setActiveYear(year);
    setIsPaused(true);
    const t = setTimeout(() => setIsPaused(false), 12000);
    return () => clearTimeout(t);
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
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 block mb-1">
                Operações & Eventos
              </span>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
                Grandes operações e eventos já atendidos
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700">
              {events.length} marcos
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
              {events.map((e) => {
                const isActive = e.year === activeYear;
                return (
                  <button
                    key={e.year}
                    onClick={() => handleUserPick(e.year)}
                    className="relative flex flex-col items-center pt-14 cursor-pointer transition-transform hover:-translate-y-0.5 select-none shrink-0"
                  >
                    <span
                      className={`absolute top-0 w-px transition-all ${
                        isActive ? "h-8 bg-ink-900" : "h-6 bg-ink-200"
                      }`}
                    />

                    {isActive ? (
                      <span className="flex h-14 px-4 items-center justify-center rounded-full bg-ink-900 text-paper text-lg font-medium shadow-lg -mt-2.5 animate-[dotPop_400ms_cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap">
                        {e.year}
                      </span>
                    ) : (
                      <span className="text-xl md:text-2xl font-medium tracking-tight text-ink-700">
                        {e.year}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: 4 cards visible */}
          <div className="mt-8 hidden md:grid grid-cols-4 gap-4">
            {visibleCards.map((op, i) => {
              const isActive = op.year === activeYear;
              return (
                <div
                  key={op.year}
                  className={`group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-ink-900 shadow-2xl scale-[1.03] -translate-y-1"
                      : "ring-0 opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    animation: `fadeUp 500ms cubic-bezier(0.22,1,0.36,1) ${
                      50 + i * 50
                    }ms backwards`,
                  }}
                  onClick={() => handleUserPick(op.year)}
                >
                  <Image
                    src={op.image}
                    alt={op.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      isActive
                        ? "scale-110"
                        : "group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 text-paper">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all ${
                          isActive
                            ? "bg-paper text-ink-900 border-paper"
                            : "bg-white/20 text-white border-white/20"
                        }`}
                      >
                        {op.year}
                      </span>
                    </div>
                    <h4 className="text-base lg:text-lg font-medium tracking-tight mb-1 leading-tight">
                      {op.title}
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="mt-8 md:hidden">
            {events
              .filter((e) => e.year === activeYear)
              .map((op) => (
                <div
                  key={op.year}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] ring-2 ring-ink-900 shadow-2xl animate-[fadeUp_500ms_cubic-bezier(0.22,1,0.36,1)]"
                >
                  <Image
                    src={op.image}
                    alt={op.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6 text-paper">
                    <span className="inline-flex w-fit items-center rounded-full bg-paper text-ink-900 px-3 py-1 text-xs font-medium mb-3">
                      {op.year}
                    </span>
                    <h4 className="text-xl font-medium tracking-tight mb-2">
                      {op.title}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() =>
                handleUserPick(events[Math.max(0, activeIdx - 1)].year)
              }
              disabled={activeIdx === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Anterior"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() =>
                handleUserPick(
                  events[Math.min(events.length - 1, activeIdx + 1)].year
                )
              }
              disabled={activeIdx === events.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Próximo"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3 Cards below */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Segurança",
              desc: "Veículos executivos com opções blindadas, motoristas treinados e protocolos de segurança para agendas sensíveis.",
            },
            {
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: "Discrição",
              desc: "Confidencialidade absoluta em cada operação. Atendimento sob protocolo para clientes que exigem privacidade.",
            },
            {
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
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
              <h3 className="text-lg font-medium tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
