"use client";

import { useQuoteModal } from "@/components/QuoteModal";

type Props = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
};

export default function PageCTA({
  title = "Pronto para sua próxima operação?",
  subtitle = "Solicite uma cotação e fale com a equipe KMON VIP.",
  ctaLabel = "Solicitar cotação",
}: Props) {
  const { open } = useQuoteModal();
  return (
    <section className="py-20 md:py-28 bg-ink-900 text-paper">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-snug mb-4">
          {title}
        </h2>
        <p className="text-base text-white/65 mb-8">{subtitle}</p>
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
          style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
        >
          {ctaLabel}
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
}
