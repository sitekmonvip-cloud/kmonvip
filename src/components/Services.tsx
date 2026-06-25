"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Transporte Executivo",
    label: "corporativo",
    desc: "Deslocamentos com conforto, pontualidade e discrição para executivos e líderes.",
    image: "/images/services/transporte-executivo.png",
  },
  {
    num: "02",
    title: "Transporte Blindado",
    label: "segurança",
    desc: "Veículos blindados para agendas que exigem proteção elevada e confidencialidade.",
    image: "/images/services/transporte-blindado.png",
  },
  {
    num: "03",
    title: "Transporte Diplomático",
    label: "protocolo",
    desc: "Embaixadas, delegações e missões oficiais com protocolo e precisão.",
    image: "/images/services/transporte-diplomatico.png",
  },
  {
    num: "04",
    title: "Eventos & Congressos",
    label: "eventos",
    desc: "Frota dedicada para grandes eventos, congressos e operações especiais.",
    image: "/images/services/eventos-congressos.png",
  },
  {
    num: "05",
    title: "Transfers",
    label: "aeroporto",
    desc: "Traslados aeroporto, hotel e reuniões com atendimento profissional.",
    image: "/images/services/transfers.png",
  },
  {
    num: "06",
    title: "Vans e Ônibus",
    label: "grupos",
    desc: "Mobilidade para grupos, delegações e equipes corporativas.",
    image: "/images/services/vans-onibus.png",
  },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Update active dot on scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = () => {
      const cardW = el.scrollWidth / services.length;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(idx, services.length - 1));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / services.length;
    el.scrollTo({ left: cardW * idx, behavior: "smooth" });
  };

  return (
    <section id="solucoes" className="py-20 md:py-28" style={{ background: "var(--c-paper)" }}>
      {/* Header */}
      <div className="mx-auto max-w-7xl px-5 mb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] mb-3 block"
              style={{ color: "var(--c-ink-500)" }}
            >
              Soluções
            </span>
            <h2
              className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1]"
              style={{ color: "var(--c-ink-900)" }}
            >
              Mobilidade para operações<br className="hidden sm:block" /> de alto padrão
            </h2>
          </div>

          {/* Nav arrows — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all disabled:opacity-30 hover:bg-ink-900 hover:text-paper hover:border-ink-900"
              style={{ borderColor: "var(--c-ink-200)", color: "var(--c-ink-700)" }}
              aria-label="Anterior"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(services.length - 1, activeIdx + 1))}
              disabled={activeIdx === services.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all disabled:opacity-30 hover:bg-ink-900 hover:text-paper hover:border-ink-900"
              style={{ borderColor: "var(--c-ink-200)", color: "var(--c-ink-700)" }}
              aria-label="Próximo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "calc((100vw - min(100vw - 40px, 1280px)) / 2 + 20px)",
          paddingRight: "calc((100vw - min(100vw - 40px, 1280px)) / 2 + 20px)",
        }}
      >
        {services.map((s, i) => (
          <div
            key={s.num}
            onClick={() => scrollTo(i)}
            style={{
              scrollSnapAlign: "start",
              // Mobile: 85vw (1 card + peek). Tablet+: fixed 300px. Desktop: 1/4 of container.
              flex: "0 0 min(85vw, 300px)",
            }}
            className="md:flex-[0_0_calc((min(100vw-40px,1280px)-80px)/3.3)] cursor-pointer"
          >
            <div
              className="group relative rounded-2xl text-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-ink-900"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 85vw, 300px"
                className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />

              {/* Top row */}
              <div className="relative z-10 flex items-center justify-between p-5">
                {/* Number pill */}
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                >
                  {s.num}
                </span>
                {/* Label badge */}
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em]"
                  style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
                >
                  {s.label}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                {/* Gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                <div className="relative">
                  <h3 className="text-lg font-medium tracking-tight mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {s.desc}
                  </p>
                  {/* Arrow — appears on hover */}
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                    style={{ color: "var(--brand-champagne)" }}
                  >
                    Saiba mais <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Right padding spacer */}
        <div className="flex-shrink-0 w-5" aria-hidden="true" />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeIdx ? "24px" : "6px",
              height: "6px",
              borderRadius: "999px",
              background: i === activeIdx ? "var(--c-ink-900)" : "var(--c-ink-200)",
            }}
            aria-label={`Serviço ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
