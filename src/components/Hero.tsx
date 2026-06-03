const vehicleTypes = [
  "Sedan Executivo",
  "SUV Executivo",
  "SUV Blindado",
  "Van Executiva",
  "Ônibus Premium",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #f5f0e8 0%, #ebe5d8 30%, #e8e2d5 100%)",
          }}
        />
        {/* Photo area — right side dark overlay for SUV image */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(160deg, #2a2520 0%, #1a1815 40%, #0f0e0c 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8] via-transparent to-transparent w-32" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <div className="max-w-xl pt-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-5 block">
              Mobilidade Executiva Internacional
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium tracking-tight leading-[1.08] text-ink-900 mb-6">
              Transporte executivo para eventos globais, embaixadas e corporações.
            </h1>

            <p className="text-base text-ink-500 leading-relaxed mb-8 max-w-md">
              Discrição. Precisão. Segurança. Atendimento bilíngue para governos,
              corporações e líderes em todo o Brasil.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#cotacao"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-paper px-7 py-3.5 text-sm font-medium transition-all hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Solicitar cotação
                <span>&rarr;</span>
              </a>
              <a
                href="#frota"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white text-ink-900 px-7 py-3.5 text-sm font-medium transition-all hover:border-ink-900 hover:shadow-md"
              >
                Ver frota
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M8 17h8M8 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2m4 0h8m0 0v2a1 1 0 001 1h2a1 1 0 001-1v-2" />
                </svg>
              </a>
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-ink-100 bg-white/80 backdrop-blur-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm text-ink-700">
                  Confiança de organizações que operam no mais alto nível.
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "FIFA", src: "/images/logos/logo trust/fifa.svg" },
                  { name: "G20", src: "/images/logos/logo trust/g20.svg" },
                  { name: "COP 30", src: "/images/logos/logo trust/cop 30.svg" },
                  { name: "ONU", src: "/images/logos/logo trust/onu.svg" },
                ].map((org) => (
                  <div key={org.name} className="flex items-center justify-center h-10">
                    <img
                      src={org.src}
                      alt={org.name}
                      className="max-h-8 max-w-[72px] w-full object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Booking Form */}
          <div className="rounded-2xl border border-ink-100 bg-white shadow-xl p-6 md:p-8 max-w-md lg:ml-auto">
            <h2 className="text-lg font-medium tracking-tight mb-6">Solicitar cotação</h2>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Local de partida</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Endereço de origem"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Destino</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Endereço de destino"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Data</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="28 Mai 2025"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Horário</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="09:00"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Passageiros</label>
                  <div className="relative">
                    <input
                      type="number"
                      defaultValue={2}
                      min={1}
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Tipo de veículo</label>
                  <select className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all appearance-none">
                    {vehicleTypes.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-500 mb-1.5 block">Observações (Opcional)</label>
                <input
                  type="text"
                  placeholder="Número do voo, solicitações especiais..."
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 transition-all"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-paper px-7 py-3.5 text-sm font-medium transition-all hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]">
                Solicitar cotação
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
