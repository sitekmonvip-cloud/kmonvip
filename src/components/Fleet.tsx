"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuoteModal } from "./QuoteModal";

const categories = [
  { slug: "sedan-executivo",  image: "/images/fleet/Corola-Sedan Executivo.jpg" },
  { slug: "sedan-blindado",   image: "/images/fleet/classe-e.png" },
  { slug: "suv-blindado",     image: "/images/fleet/suv-commander.webp" },
  { slug: "minivan-executiva", image: "/images/fleet/mini van vito.jpg" },
  { slug: "van-executiva",    image: "/images/fleet/sprinter.webp" },
  { slug: "onibus-premium",   image: "/images/fleet/onibus-executivo.webp" },
];

// ── Icons ───────────────────────────────────────────────────────────
const PassengerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M21 21v-1.5a3.5 3.5 0 0 0-3-3.46" />
  </svg>
);

const CarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 17h14M3 17v-5l2.5-5h13L21 12v5" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

export default function Fleet() {
  const t = useTranslations("fleet");
  const tc = useTranslations("common");
  const { open: openQuote } = useQuoteModal();
  return (
    <section id="frota" className="py-24 md:py-32 bg-ink-900 text-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-brand-champagne mb-4 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <article
              key={cat.slug}
              className="group relative rounded-2xl overflow-hidden bg-ink-800 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={t(`items.${cat.slug}.title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="relative p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-medium tracking-tight mb-4 leading-snug">
                  {t(`items.${cat.slug}.title`)}
                </h3>

                {/* Specs — passengers + model */}
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2.5 text-sm">
                    <span className="text-brand-champagne shrink-0">
                      <PassengerIcon />
                    </span>
                    <span className="text-white/85">{t(`items.${cat.slug}.passengers`)}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm">
                    <span className="text-brand-champagne shrink-0">
                      <CarIcon />
                    </span>
                    <span className="text-white/85">{t(`items.${cat.slug}.model`)}</span>
                  </li>
                </ul>

                {/* Description */}
                <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">
                  {t(`items.${cat.slug}.desc`)}
                </p>

                {/* Saiba mais — link pra subpágina da frota */}
                <Link
                  href={`/frota/${cat.slug}`}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-ink-900 hover:border-white group/cta"
                >
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                  {tc("learnMore")}
                </Link>
              </div>

              {/* Hover glow border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 0 1px rgba(191,176,138,0.3) inset",
                }}
              />
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/40 italic">
          {t("disclaimer")}
        </p>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openQuote}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-medium transition-all hover:bg-white/20"
          >
            {t("knowFleet")}
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
