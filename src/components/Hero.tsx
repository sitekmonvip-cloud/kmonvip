import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "var(--c-paper)" }}>

      {/* ── Subtle radial warmth at centre ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 58%, rgba(255,252,245,0.9) 0%, transparent 70%)",
        }}
      />

      {/* ── Hairline champagne glow at bottom ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--brand-champagne)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ── Headline block ── centred, tight, above car */}
        <div className="flex flex-col items-center pt-36 pb-0 text-center px-5">

          {/* eyebrow */}
          <span
            className="mb-5 block text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--c-ink-500)" }}
          >
            A Número 1 do Brasil em
          </span>

          {/* main headline */}
          <h1
            className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05]"
            style={{ color: "var(--c-ink-900)", letterSpacing: "-0.03em" }}
          >
            Transporte{" "}
            <em
              className="font-normal not-italic"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--c-ink-700)" }}
            >
              Executivo
            </em>{" "}
            Blindado
          </h1>

          {/* champagne rule */}
          <div
            className="mt-6 h-px w-24"
            style={{ background: "var(--brand-champagne)" }}
          />

          {/* sub */}
          <p
            className="mt-5 text-base max-w-sm leading-relaxed"
            style={{ color: "var(--c-ink-500)" }}
          >
            Discrição. Precisão. Protocolo.
          </p>

          {/* CTA */}
          <a
            href="#cotacao"
            className="mt-8 inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
            style={{
              background: "var(--c-ink-900)",
              color: "var(--c-paper)",
              padding: "14px 32px",
            }}
          >
            Solicitar cotação
            <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
          </a>
        </div>

        {/* ── Car — full-width, dominant ── */}
        <div className="relative flex-1 flex items-end justify-center">
          <div className="relative w-full max-w-6xl mx-auto px-4">

            {/* Ground shadow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl"
              style={{ background: "rgba(10,10,9,0.18)" }}
            />

            <Image
              src="/images/hero/mercedes-hero.png"
              alt="Mercedes Classe E — KMON VIP Transporte Executivo Blindado"
              width={1536}
              height={864}
              className="relative z-10 w-full h-auto object-contain"
              style={{ maxHeight: "58vh" }}
              priority
            />
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="relative z-10 border-t"
          style={{ borderColor: "var(--c-ink-100)", background: "var(--c-white)" }}
        >
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid grid-cols-3 divide-x"
              style={{ borderColor: "var(--c-ink-100)" }}
            >
              {[
                { value: "35+", label: "anos de excelência" },
                { value: "24h", label: "suporte operacional" },
                { value: "7+",  label: "capitais atendidas"  },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center py-6 gap-0.5"
                  style={{ borderColor: "var(--c-ink-100)" }}
                >
                  <span
                    className="text-2xl md:text-3xl font-medium tracking-tight"
                    style={{ color: "var(--c-ink-900)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-[0.1em]"
                    style={{ color: "var(--c-ink-500)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
