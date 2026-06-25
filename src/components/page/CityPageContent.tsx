import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "./PageHero";
import BreadcrumbsNav from "./BreadcrumbsNav";
import FAQ from "./FAQ";
import RelatedLinks from "./RelatedLinks";
import PageCTA from "./PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { cityLocalBusinessSchema } from "@/components/seo/schemas";
import { services, cities, type City } from "@/lib/seo/constants";

type Props = { city: City };

export default function CityPageContent({ city }: Props) {
  const serviceLinks = services.map((s) => ({
    href: `/servicos/${s.slug}`,
    title: s.name,
    desc: s.hook,
    image: s.image,
  }));

  const otherCities = cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 3)
    .map((c) => ({
      href: `/atuacao/${c.slug}`,
      title: c.name,
      desc: c.hook,
      image: c.image,
    }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Atuação", path: "/atuacao" },
            { name: city.name, path: `/atuacao/${city.slug}` },
          ]}
        />

        <PageHero
          eyebrow={`Atuação — ${city.region}${city.isHQ ? " · Sede" : ""}`}
          title={city.hook}
          subtitle={city.meta.description}
          image={city.image}
          imageAlt={city.name}
        />

        {/* Intro */}
        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed">
              {city.intro}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="pb-12" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <ul className="flex flex-col gap-3">
              {city.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-champagne shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RelatedLinks heading={`Soluções em ${city.shortName}`} links={serviceLinks} />

        <FAQ faqs={city.faqs} />

        <RelatedLinks heading="Outras cidades" links={otherCities} />

        <PageCTA
          title={`Solicite cotação em ${city.shortName}`}
          subtitle="Atendimento 24h pela equipe KMON VIP."
        />

        {/* JSON-LD LocalBusiness */}
        <JsonLd data={cityLocalBusinessSchema(city)} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
