"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const cities = [
  { slug: "brasilia",       image: "/images/cities/Brasilia.webp", highlight: true },
  { slug: "sao-paulo",      image: "/images/cities/sao-paulo.webp" },
  { slug: "rio-de-janeiro", image: "/images/cities/rio-de-janeiro.webp" },
  { slug: "belo-horizonte", image: "/images/cities/belo-horizonte.webp" },
  { slug: "manaus",         image: "/images/cities/Manaus.webp" },
  { slug: "belem",          image: "/images/cities/belem.webp" },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Coverage() {
  const t = useTranslations("coverage");
  // Brasília expandida por padrão (sede)
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="atuacao" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Header */}
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-4 block">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-ink-500 leading-relaxed mb-8">
              {t("subtitle")}
            </p>
            <div className="flex items-center gap-3 text-sm text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-dot" />
              {t("otherCities")}
            </div>
          </div>

          {/* Accordion list */}
          <div className="flex flex-col gap-3">
            {cities.map((city, i) => {
              const isOpen = openIdx === i;
              return (
                <article
                  key={city.slug}
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-ink-900 bg-ink-900 text-paper shadow-xl"
                      : "border-ink-100 bg-paper hover:border-ink-300"
                  }`}
                >
                  {/* Header — clickable */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`city-panel-${i}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <h3 className="text-lg font-medium tracking-tight truncate">
                        {t(`items.${city.slug}.name`)}
                      </h3>
                      {city.highlight && (
                        <span
                          className={`text-[10px] font-medium uppercase tracking-[0.08em] px-2.5 py-1 rounded-full shrink-0 ${
                            isOpen
                              ? "bg-white/10 text-brand-champagne"
                              : "bg-ink-100 text-ink-700"
                          }`}
                        >
                          {t("headquarters")}
                        </span>
                      )}
                    </div>
                    <span
                      className={`shrink-0 ${
                        isOpen ? "text-brand-champagne" : "text-ink-500"
                      }`}
                    >
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  {/* Expandable panel */}
                  <div
                    id={`city-panel-${i}`}
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6">
                        {/* Image */}
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={city.image}
                            alt={t(`items.${city.slug}.name`)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Description */}
                        <p
                          className={`text-sm leading-relaxed ${
                            isOpen ? "text-white/75" : "text-ink-500"
                          }`}
                        >
                          {t(`items.${city.slug}.desc`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
