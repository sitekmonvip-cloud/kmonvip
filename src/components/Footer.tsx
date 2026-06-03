import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contato" className="bg-ink-900 text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logos/logo SVG KMON preta.svg"
                alt="KMON VIP"
                width={120}
                height={40}
                className="h-8 w-auto object-contain invert"
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Mobilidade executiva, blindada e diplomática para quem não pode
              errar no deslocamento.
            </p>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              Soluções
            </h4>
            <ul className="space-y-3">
              {[
                "Transporte Executivo",
                "Transporte Blindado",
                "Transporte Diplomático",
                "Eventos & Congressos",
                "Transfers",
                "Vans e Ônibus",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              Institucional
            </h4>
            <ul className="space-y-3">
              {[
                "Sobre a KMON",
                "Frota",
                "Atuação Nacional",
                "Cotação",
                "Contato",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  WhatsApp 24h
                </span>
                <a
                  href="https://wa.me/5561999999999"
                  className="hover:text-white transition-colors"
                >
                  +55 (61) 99999-9999
                </a>
              </li>
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  E-mail
                </span>
                <a
                  href="mailto:contato@kmonvip.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@kmonvip.com.br
                </a>
              </li>
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  Atendimento
                </span>
                24h — Operação Nacional
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.08]">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} KMON VIP. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
