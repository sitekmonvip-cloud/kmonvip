const services = [
  {
    title: "Transporte Executivo",
    desc: "Deslocamentos corporativos com conforto, pontualidade e discrição para executivos, líderes e equipes estratégicas.",
    icon: "01",
  },
  {
    title: "Transporte Blindado",
    desc: "Veículos executivos com opções blindadas para agendas que exigem segurança elevada e confidencialidade.",
    icon: "02",
  },
  {
    title: "Transporte Diplomático",
    desc: "Atendimento para embaixadas, autoridades, delegações e missões oficiais com protocolo, discrição e precisão.",
    icon: "03",
  },
  {
    title: "Eventos & Congressos",
    desc: "Planejamento de frota, vans, ônibus e carros executivos para eventos corporativos, feiras e operações especiais.",
    icon: "04",
  },
  {
    title: "Transfers",
    desc: "Traslados entre aeroporto, hotel, reuniões, eventos e compromissos com atendimento profissional e pontual.",
    icon: "05",
  },
  {
    title: "Vans e Ônibus",
    desc: "Mobilidade para grupos, delegações, staff e equipes corporativas com conforto e organização operacional.",
    icon: "06",
  },
];

export default function Services() {
  return (
    <section id="solucoes" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-4 block">
            Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            Soluções de mobilidade para operações de alto padrão
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border border-ink-100 bg-paper p-8 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="text-xs font-medium text-ink-300 tracking-[0.08em] uppercase mb-6 block">
                {service.icon}
              </span>
              <h3 className="text-xl font-medium tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-6">
                {service.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 opacity-0 group-hover:opacity-100 transition-opacity">
                Saiba mais
                <span className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
