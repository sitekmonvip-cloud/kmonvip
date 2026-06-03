const cities = [
  {
    name: "Brasília",
    desc: "Base institucional. Embaixadas, autoridades, órgãos públicos e eventos corporativos.",
    highlight: true,
  },
  {
    name: "São Paulo",
    desc: "Executivos, eventos corporativos, empresas internacionais e mercado financeiro.",
  },
  {
    name: "Rio de Janeiro",
    desc: "Turismo premium, eventos, autoridades, artistas e operações corporativas.",
  },
  {
    name: "Belo Horizonte",
    desc: "Transporte executivo e corporativo para empresas, eventos e agendas estratégicas.",
  },
  {
    name: "Manaus",
    desc: "Operações executivas, corporativas e institucionais na região Norte.",
  },
  {
    name: "Belém",
    desc: "Cidade estratégica para eventos internacionais e grandes operações.",
  },
];

export default function Coverage() {
  return (
    <section id="atuacao" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-4 block">
              Atuação Nacional
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
              Operação executiva em Brasília e nas principais cidades do Brasil
            </h2>
            <p className="text-lg text-ink-500 leading-relaxed mb-8">
              A KMON VIP atende operações executivas, diplomáticas e corporativas
              em Brasília e nas principais capitais brasileiras, com estrutura
              para deslocamentos locais, eventos e agendas de alta complexidade.
            </p>
            <div className="flex items-center gap-3 text-sm text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-dot" />
              Outras cidades sob consulta
            </div>
          </div>

          <div className="grid gap-3">
            {cities.map((city) => (
              <div
                key={city.name}
                className={`rounded-xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  city.highlight
                    ? "border-ink-900 bg-ink-900 text-paper"
                    : "border-ink-100 bg-paper"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium tracking-tight">
                    {city.name}
                  </h3>
                  {city.highlight && (
                    <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-brand-champagne bg-white/10 px-3 py-1 rounded-full">
                      Sede
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    city.highlight ? "text-white/70" : "text-ink-500"
                  }`}
                >
                  {city.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
