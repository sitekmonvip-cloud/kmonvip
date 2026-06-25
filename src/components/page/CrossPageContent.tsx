import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "./PageHero";
import BreadcrumbsNav from "./BreadcrumbsNav";
import FAQ from "./FAQ";
import RelatedLinks from "./RelatedLinks";
import PageCTA from "./PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/components/seo/schemas";
import { services, cities, type CrossPage } from "@/lib/seo/constants";

type Props = { cross: CrossPage };

export default function CrossPageContent({ cross }: Props) {
  const service = services.find((s) => s.slug === cross.serviceSlug)!;
  const city = cities.find((c) => c.slug === cross.citySlug)!;

  const otherServiceInCity = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)
    .map((s) => ({
      href: `/servicos/${s.slug}`,
      title: s.name,
      desc: `${s.shortName} em todo o Brasil`,
      image: s.image,
    }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Soluções", path: "/servicos" },
            { name: service.name, path: `/servicos/${service.slug}` },
            { name: city.name, path: `/servicos/${service.slug}/${city.slug}` },
          ]}
        />

        <PageHero
          eyebrow={`${service.name} · ${city.name}`}
          title={cross.hook}
          subtitle={cross.meta.description}
          image={service.image}
          imageAlt={`${service.name} em ${city.name}`}
        />

        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed mb-8">
              {cross.intro}
            </p>
            <ul className="flex flex-col gap-3">
              {cross.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-champagne shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FAQ faqs={cross.faqs} />

        <RelatedLinks
          heading={`Outros serviços em ${city.shortName}`}
          links={otherServiceInCity}
        />

        <PageCTA
          title={`Solicite ${service.shortName.toLowerCase()} em ${city.shortName}`}
          subtitle="A equipe KMON VIP atende 24 horas com cobertura local."
        />

        <JsonLd data={serviceSchema(service, { areaCity: city })} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
