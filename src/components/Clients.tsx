const clients = [
  { name: "ESPN", src: "/images/logos/espn.svg" },
  { name: "Google", src: "/images/logos/google.png" },
  { name: "Live ABA", src: "/images/logos/live-aba.png" },
  { name: "Microsoft", src: "/images/logos/microsoft.png" },
  { name: "Shell", src: "/images/logos/shell-.png" },
  { name: "XP Investimentos", src: "/images/logos/xp.png" },
];

import { useTranslations } from "next-intl";

export default function Clients() {
  const t = useTranslations("clients");
  // Duplicate list for seamless loop
  const items = [...clients, ...clients];

  return (
    <section className="py-20 md:py-24 bg-white border-y border-ink-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-12">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-3 block">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15]">
            {t("title")}
          </h2>
        </div>
      </div>

      {/* Marquee — full bleed */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 md:gap-12 w-max animate-marquee items-center">
          {items.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex h-20 w-[200px] shrink-0 items-center justify-center rounded-xl border border-ink-100 bg-ink-50/50 transition-all hover:bg-white hover:shadow-md hover:border-ink-200"
            >
              {c.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={c.src}
                  alt={c.name}
                  className="max-h-[60px] max-w-[160px] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ) : (
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-300">
                  {c.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
