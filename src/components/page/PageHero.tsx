"use client";

import Image from "next/image";
import { useQuoteModal } from "@/components/QuoteModal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  ctaLabel?: string;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  ctaLabel = "Solicitar cotação",
}: Props) {
  const { open } = useQuoteModal();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16" style={{ background: "var(--c-paper)" }}>
      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="relative z-10">
          {eyebrow && (
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] mb-4 block"
              style={{ color: "var(--c-ink-500)" }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5"
            style={{ color: "var(--c-ink-900)", letterSpacing: "-0.025em" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-xl mb-7">
              {subtitle}
            </p>
          )}

          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
            style={{
              background: "var(--c-ink-900)",
              color: "var(--c-paper)",
              padding: "14px 32px",
            }}
          >
            {ctaLabel}
            <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
          </button>
        </div>

        {/* Right: image */}
        <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden bg-ink-100">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
