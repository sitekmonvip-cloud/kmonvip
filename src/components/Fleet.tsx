"use client";

import Image from "next/image";
import { useQuoteModal } from "./QuoteModal";

type Category = {
  title: string;
  desc: string;
  image: string;
  passengers: string;
  model: string;
};

const categories: Category[] = [
  {
    title: "Sedan Executivo",
    desc: "Sedan executivo com motorista para reuniões, recepções de clientes, agendas corporativas e deslocamentos individuais.",
    image: "/images/fleet/sedan-executivo.webp",
    passengers: "1 a 4 passageiros",
    model: "Mercedes-Benz Classe E ou similar",
  },
  {
    title: "SUV Premium",
    desc: "SUV de luxo com motorista para executivos, autoridades e deslocamentos que exigem maior conforto e espaço.",
    image: "/images/fleet/suv-executivo.webp",
    passengers: "1 a 6 passageiros",
    model: "Cadillac Escalade ou similar",
  },
  {
    title: "Veículo Blindado",
    desc: "Veículo executivo blindado com motorista para agendas que exigem segurança elevada, confidencialidade e proteção.",
    image: "/images/fleet/suv-commander.webp",
    passengers: "1 a 4 passageiros",
    model: "Jeep Commander Blindado ou similar",
  },
  {
    title: "Van Executiva",
    desc: "Van executiva com motorista para grupos, transfer aeroporto, eventos corporativos e operações de alta performance.",
    image: "/images/fleet/sprinter.webp",
    passengers: "8 a 15 passageiros",
    model: "Mercedes-Benz Sprinter ou similar",
  },
  {
    title: "Ônibus Premium",
    desc: "Ônibus executivo premium com motorista para congressos, delegações e operações de grande volume.",
    image: "/images/fleet/onibus-executivo.webp",
    passengers: "30 a 50 passageiros",
    model: "Marcopolo Paradiso ou similar",
  },
  {
    title: "Frota para Comitiva",
    desc: "Combinação de SUVs, sedans e vans com motoristas para deslocamentos coordenados de comitivas e delegações.",
    image: "/images/fleet/blazer.webp",
    passengers: "Sob medida",
    model: "SUV + Sedan + Van coordenados",
  },
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
  const { open: openQuote } = useQuoteModal();
  return (
    <section id="frota" className="py-24 md:py-32 bg-ink-900 text-paper">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-brand-champagne mb-4 block">
            Frota
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            Frota executiva para diferentes níveis de operação
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            De sedans executivos a SUVs, vans, ônibus e veículos blindados, a
            KMON VIP oferece soluções de mobilidade sob medida para cada tipo de
            agenda.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="group relative rounded-2xl overflow-hidden bg-ink-800 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="relative p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-medium tracking-tight mb-4 leading-snug">
                  {cat.title}
                </h3>

                {/* Specs — passengers + model */}
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2.5 text-sm">
                    <span className="text-brand-champagne shrink-0">
                      <PassengerIcon />
                    </span>
                    <span className="text-white/85">{cat.passengers}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm">
                    <span className="text-brand-champagne shrink-0">
                      <CarIcon />
                    </span>
                    <span className="text-white/85">{cat.model}</span>
                  </li>
                </ul>

                {/* Description */}
                <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">
                  {cat.desc}
                </p>

                {/* Saiba mais — pill button */}
                <button
                  type="button"
                  onClick={openQuote}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-ink-900 hover:border-white group/cta"
                >
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                  Saiba mais
                </button>
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
          Modelos e categorias sujeitos à disponibilidade no momento da cotação.
        </p>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openQuote}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-medium transition-all hover:bg-white/20"
          >
            Conhecer frota
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
