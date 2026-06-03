const categories = [
  {
    title: "Sedans Executivos",
    desc: "Deslocamentos corporativos, reuniões e agendas individuais.",
    gradient: "from-[#1a1a2e] to-[#16213e]",
  },
  {
    title: "SUVs Premium",
    desc: "Executivos, autoridades e deslocamentos com maior conforto.",
    gradient: "from-[#2C3E50] to-[#4a6274]",
  },
  {
    title: "Veículos Blindados",
    desc: "Segurança elevada, confidencialidade e proteção.",
    gradient: "from-[#1a1a1a] to-[#333]",
  },
  {
    title: "Vans Executivas",
    desc: "Grupos, delegações e eventos com conforto e organização.",
    gradient: "from-[#2d2d3d] to-[#4a4a5a]",
  },
  {
    title: "Ônibus Premium",
    desc: "Congressos, delegações e operações com grande volume.",
    gradient: "from-[#1f2937] to-[#374151]",
  },
  {
    title: "Frota para Comitiva",
    desc: "Combinação de veículos para deslocamentos coordenados.",
    gradient: "from-[#0f172a] to-[#1e293b]",
  },
];

export default function Fleet() {
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
            <div
              key={cat.title}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="text-lg font-medium tracking-tight mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-white/70">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/40 italic">
          Modelos e categorias sujeitos à disponibilidade no momento da cotação.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#cotacao"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-medium transition-all hover:bg-white/20"
          >
            Conhecer frota
            <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
