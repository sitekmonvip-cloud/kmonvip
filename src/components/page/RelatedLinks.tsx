import { Link } from "@/i18n/navigation";
import Image from "next/image";

export type RelatedLink = {
  href: string;
  title: string;
  desc?: string;
  image?: string;
};

type Props = {
  heading?: string;
  links: RelatedLink[];
  linkLabel?: string;
};

export default function RelatedLinks({ heading = "Veja também", links, linkLabel = "Saiba mais" }: Props) {
  return (
    <section className="py-16 md:py-20" style={{ background: "var(--c-paper)" }}>
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-8">
          {heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-ink-100 bg-white overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {link.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-medium text-ink-900 mb-1 group-hover:text-brand-champagne-dark transition-colors">
                  {link.title}
                </h3>
                {link.desc && (
                  <p className="text-sm text-ink-500 leading-relaxed">{link.desc}</p>
                )}
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-ink-900">
                  {linkLabel}
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
