import { useTranslations } from "next-intl";

export default function Differentials() {
  const t = useTranslations("differentials");
  const tagKeys = [
    "armoredFleet",
    "bilingualDrivers",
    "diplomaticService",
    "national24h",
    "confidentiality",
    "majorEvents",
    "highComplexity",
  ];
  return (
    <section className="relative py-20 md:py-44 overflow-hidden">
      {/* ── Background videos — responsive ── */}
      <video
        src="/videos/diferenciais-desktop.mp4"
        poster="/images/diferenciais-bg-desktop.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      />
      <video
        src="/videos/diferenciais-mobile.mp4"
        poster="/images/diferenciais-bg-mobile.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className="md:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Dark overlay for legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,9,0.7) 0%, rgba(10,10,9,0.55) 50%, rgba(10,10,9,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-brand-champagne mb-5 sm:mb-6 block">
          {t("eyebrow")}
        </span>

        <h2
          className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] text-white mb-6 sm:mb-10 px-2"
          style={{ letterSpacing: "-0.025em" }}
        >
          {t("titlePart1")}{" "}
          <em
            className="font-normal not-italic text-brand-champagne"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            {t("titleEm")}
          </em>
          {t("titlePart2")}
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
          {t("subtitle")}
        </p>

        {/* Inline pill list — minimal, elegant */}
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
          {tagKeys.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-medium text-white/85 border backdrop-blur-md whitespace-nowrap"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.15)",
              }}
            >
              <span
                className="mr-1.5 sm:mr-2 h-1 w-1 rounded-full shrink-0"
                style={{ background: "var(--brand-champagne)" }}
              />
              {t(`tags.${tag}`)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
