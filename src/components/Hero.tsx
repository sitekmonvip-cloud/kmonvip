export default function Hero() {
  return (
    <section className="relative overflow-hidden md:min-h-screen" style={{ background: "var(--c-paper)" }}>

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
      <div className="relative z-10 flex flex-col md:min-h-screen">

        {/* ── Headline block ── centred, tight, above car */}
        <div
          className="relative flex flex-col items-center pt-28 md:pt-36 pb-0 text-center px-5"
          style={{ zIndex: 20, pointerEvents: "none" }}
        >

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
              pointerEvents: "auto",
            }}
          >
            Solicitar cotação
            <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
          </a>
        </div>

        {/* ── Car — full-width, overlaps text with negative margin ── */}
        <div
          className="relative flex items-end justify-center w-full mt-8 md:mt-[-16vh] md:mb-[-6vh]"
          style={{ zIndex: 1 }}
        >
          <video
            src="/videos/car-hero.mp4"
            poster="/images/hero/mercedes-hero.png"
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="w-full h-auto object-contain pointer-events-none"
            style={{ maxHeight: "78vh" }}
            aria-label="Mercedes Classe E — KMON VIP Transporte Executivo Blindado"
          >
            <source src="/videos/car-hero.webm" type="video/webm" />
            <source src="/videos/car-hero.mp4"  type="video/mp4" />
          </video>
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
                    className="text-[10px] uppercase tracking-[0.08em] text-center leading-tight px-1"
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
