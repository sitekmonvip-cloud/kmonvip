type Feature = { title: string; desc: string };

type Props = {
  features: Feature[];
  heading?: string;
};

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function FeatureList({ features, heading }: Props) {
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--c-paper)" }}>
      <div className="mx-auto max-w-7xl px-5">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-10 max-w-2xl">
            {heading}
          </h2>
        )}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex items-start gap-4 rounded-xl border border-ink-100 bg-white p-6"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-900"
                style={{ background: "rgba(191,176,138,0.12)", border: "1px solid rgba(191,176,138,0.3)", color: "var(--brand-champagne-dark)" }}
              >
                <Check />
              </span>
              <div>
                <h3 className="text-base font-medium text-ink-900 mb-1">{f.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
