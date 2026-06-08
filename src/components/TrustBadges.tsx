const orgs = [
  { name: "FIFA",   src: "/images/logos/logo trust/fifa.svg"   },
  { name: "G20",    src: "/images/logos/logo trust/g20.svg"    },
  { name: "COP 30", src: "/images/logos/logo trust/cop 30.svg" },
  { name: "ONU",    src: "/images/logos/logo trust/onu.svg"    },
];

export default function TrustBadges() {
  return (
    <section
      className="border-b"
      style={{ background: "var(--c-white)", borderColor: "var(--c-ink-100)" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">

          {/* Label */}
          <span
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-center sm:text-left"
            style={{ color: "var(--c-ink-300)" }}
          >
            Confiança de organizações que<br className="hidden sm:block" /> operam no mais alto nível
          </span>

          {/* Divider — desktop only */}
          <div
            className="hidden sm:block h-8 w-px shrink-0"
            style={{ background: "var(--c-ink-200)" }}
          />

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-4 flex-1">
            {orgs.map((org) => (
              <div
                key={org.name}
                className="flex h-10 w-24 items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={org.src}
                  alt={org.name}
                  className="max-h-8 max-w-[88px] w-full object-contain grayscale opacity-50 transition-all duration-300 hover:opacity-90 hover:grayscale-0"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
