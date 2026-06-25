import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "./PageHero";
import BreadcrumbsNav from "./BreadcrumbsNav";
import RelatedLinks from "./RelatedLinks";
import PageCTA from "./PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { fleetSchema } from "@/components/seo/schemas";
import { fleet, services, type FleetCategory } from "@/lib/seo/constants";

type Props = { item: FleetCategory };

export default function FleetPageContent({ item }: Props) {
  const other = fleet
    .filter((f) => f.slug !== item.slug)
    .slice(0, 3)
    .map((f) => ({
      href: `/frota/${f.slug}`,
      title: f.name,
      desc: f.hook,
      image: f.image,
    }));

  const serviceLinks = services.slice(0, 3).map((s) => ({
    href: `/servicos/${s.slug}`,
    title: s.name,
    desc: s.hook,
    image: s.image,
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Frota", path: "/frota" },
            { name: item.name, path: `/frota/${item.slug}` },
          ]}
        />

        <PageHero
          eyebrow="Frota"
          title={item.hook}
          subtitle={item.meta.description}
          image={item.image}
          imageAlt={item.name}
        />

        {/* Intro */}
        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed mb-8">
              {item.intro}
            </p>

            {/* Specs */}
            <dl className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="rounded-xl border border-ink-100 bg-white p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Passageiros
                </dt>
                <dd className="text-lg font-medium text-ink-900">{item.specs.passengers}</dd>
              </div>
              <div className="rounded-xl border border-ink-100 bg-white p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Modelo
                </dt>
                <dd className="text-lg font-medium text-ink-900">{item.specs.model}</dd>
              </div>
            </dl>

            {/* Features */}
            <h2 className="text-xl md:text-2xl font-medium tracking-tight mt-12 mb-5">
              Características da frota
            </h2>
            <ul className="flex flex-col gap-3">
              {item.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-champagne shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RelatedLinks heading="Soluções relacionadas" links={serviceLinks} />
        <RelatedLinks heading="Outras categorias de frota" links={other} />

        <PageCTA
          title={`Cotar ${item.name.toLowerCase()}`}
          subtitle="Consulte disponibilidade e valores com a equipe KMON VIP."
        />

        <JsonLd data={fleetSchema(item)} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
