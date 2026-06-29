"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Event = {
  year: number;
  image: string;
};

// Flat sequential list — 17 events. Slide one at a time.
// Title/desc live in messages catalog (authority.timeline.<index>), keyed by array position.
const events: Event[] = [
  { year: 2011, image: "/images/timeline/2011 obama.jpg" },
  { year: 2011, image: "/images/timeline/2011 Hillary.webp" },
  { year: 2014, image: "/images/timeline/2014 copa do mundo.webp" },
  { year: 2016, image: "/images/timeline/2016 olinpiedas.webp" },
  { year: 2019, image: "/images/timeline/2019 bolsonaro.webp" },
  { year: 2019, image: "/images/timeline/2019 mike.jpg" },
  { year: 2019, image: "/images/timeline/2019 copa america.avif" },
  { year: 2022, image: "/images/timeline/2022 hamilton.jpg" },
  { year: 2022, image: "/images/timeline/2022 the killers.jpg" },
  { year: 2023, image: "/images/timeline/2023 lula.webp" },
  { year: 2023, image: "/images/timeline/2023 sulamerica.webp" },
  { year: 2023, image: "/images/timeline/2023 red hot.jpeg" },
  { year: 2024, image: "/images/timeline/2024 g20.jpeg" },
  { year: 2024, image: "/images/timeline/2024 biden.jpg" },
  { year: 2024, image: "/images/timeline/2024 nfl.avif" },
  { year: 2025, image: "/images/timeline/2025 cop 30.png" },
  { year: 2026, image: "/images/timeline/2026-nike-selecao.avif" },
];

// Unique years sorted (for timeline track)
const years = Array.from(new Set(events.map((e) => e.year))).sort((a, b) => a - b);

const AUTOPLAY_MS = 3000;
const CARDS_VISIBLE = 4;

export default function Authority() {
  const t = useTranslations("authority");
  const [activeIdx, setActiveIdx] = useState(events.length - 1);
  const [isPaused, setIsPaused] = useState(false);
  const userInteractedRef = useRef(false);

  const activeYear = events[activeIdx].year;

  // Sliding window of 4 cards centred around activeIdx
  const visibleCards = useMemo(() => {
    const total = events.length;
    let start = activeIdx - 1;
    if (start < 0) start = 0;
    if (start + CARDS_VISIBLE > total) start = total - CARDS_VISIBLE;
    return events.slice(start, start + CARDS_VISIBLE).map((ev, i) => ({
      ev,
      globalIdx: start + i,
    }));
  }, [activeIdx]);

  // Autoplay — advance one event at a time
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % events.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleUserPickIdx = (i: number) => {
    userInteractedRef.current = true;
    setActiveIdx(i);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 14000);
  };

  // Click on year → jump to first event of that year
  const handleUserPickYear = (year: number) => {
    const i = events.findIndex((e) => e.year === year);
    if (i >= 0) handleUserPickIdx(i);
  };

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-4 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-ink-500 leading-relaxed max-w-2xl">
            {t("subtitle")}
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
                {t("timelineEyebrow")}
              </span>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
                {t("timelineTitle")}
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shrink-0">
              {events.length} {t("marksLabel")}
            </span>
          </div>

          {/* Timeline track — anos */}
          <div className="relative py-8">
            <div className="absolute top-8 left-0 right-0 h-px bg-ink-200">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-ink-200" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-ink-200" />
            </div>

            <div className="flex justify-between relative pt-6 overflow-x-auto gap-3 md:gap-0">
              {years.map((y) => {
                const isActive = y === activeYear;
                return (
                  <button
                    key={y}
                    onClick={() => handleUserPickYear(y)}
                    className="relative flex flex-col items-center pt-14 cursor-pointer transition-transform hover:-translate-y-0.5 select-none shrink-0"
                  >
                    <span
                      className={`absolute top-0 w-px transition-all ${
                        isActive ? "h-8 bg-ink-900" : "h-6 bg-ink-200"
                      }`}
                    />
                    {isActive ? (
                      <span className="flex h-14 px-4 items-center justify-center rounded-full bg-ink-900 text-paper text-lg font-medium shadow-lg -mt-2.5 animate-[dotPop_400ms_cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap">
                        {y}
                      </span>
                    ) : (
                      <span className="text-xl md:text-2xl font-medium tracking-tight text-ink-700">
                        {y}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: 4 cards sliding window */}
          <div className="mt-8 hidden md:grid grid-cols-4 gap-4">
            {visibleCards.map(({ ev, globalIdx }) => {
              const isActive = globalIdx === activeIdx;
              return (
                <div
                  key={`${ev.year}-${globalIdx}`}
                  className={`group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-ink-900 shadow-2xl scale-[1.03] -translate-y-1"
                      : "ring-0 opacity-80 hover:opacity-100"
                  }`}
                  onClick={() => handleUserPickIdx(globalIdx)}
                >
                  <Image
                    src={ev.image}
                    alt={t(`timeline.${globalIdx}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={`object-cover transition-transform duration-700 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 text-paper">
                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm mb-3 ${
                        isActive
                          ? "bg-paper text-ink-900 border-paper"
                          : "bg-white/20 text-white border-white/20"
                      }`}
                    >
                      {ev.year}
                    </span>
                    <h4 className="text-base font-medium tracking-tight mb-1 leading-tight">
                      {t(`timeline.${globalIdx}.title`)}
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {t(`timeline.${globalIdx}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: single active card */}
          <div className="mt-8 md:hidden">
            {events
              .filter((_, i) => i === activeIdx)
              .map((ev) => (
                <div
                  key={`m-${ev.year}-${activeIdx}`}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] ring-2 ring-ink-900 shadow-2xl animate-[fadeUp_500ms_cubic-bezier(0.22,1,0.36,1)]"
                >
                  <Image
                    src={ev.image}
                    alt={t(`timeline.${activeIdx}.title`)}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6 text-paper">
                    <span className="inline-flex w-fit items-center rounded-full bg-paper text-ink-900 px-3 py-1 text-xs font-medium mb-3">
                      {ev.year}
                    </span>
                    <h4 className="text-xl font-medium tracking-tight mb-2">
                      {t(`timeline.${activeIdx}.title`)}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {t(`timeline.${activeIdx}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Controls + progress count */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handleUserPickIdx(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-xs font-medium text-ink-500 tabular-nums min-w-[60px] text-center">
              {String(activeIdx + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => handleUserPickIdx(Math.min(events.length - 1, activeIdx + 1))}
              disabled={activeIdx === events.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 transition-all hover:bg-ink-900 hover:text-paper hover:border-ink-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-ink-900"
              aria-label="Próximo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3 Cards below */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              key: "security",
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
            {
              key: "discretion",
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
            },
            {
              key: "precision",
              icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.key}
              className="group rounded-2xl border border-ink-100 bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-50 text-ink-900 mb-6 transition-colors group-hover:bg-ink-900 group-hover:text-paper">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-3">{t(`pillars.${item.key}.title`)}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{t(`pillars.${item.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
