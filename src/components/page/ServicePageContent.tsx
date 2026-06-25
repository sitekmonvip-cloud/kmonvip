// Renderiza estrutura completa de uma página de serviço a partir do objeto Service.
// Server Component — usa client subcomponents quando necessário (FAQ).

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "./PageHero";
import BreadcrumbsNav from "./BreadcrumbsNav";
import FeatureList from "./FeatureList";
import FAQ from "./FAQ";
import RelatedLinks from "./RelatedLinks";
import PageCTA from "./PageCTA";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/components/seo/schemas";
import { services, cities, type Service } from "@/lib/seo/constants";

type Props = { service: Service };

export default function ServicePageContent({ service }: Props) {
  const related = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)
    .map((s) => ({
      href: `/servicos/${s.slug}`,
      title: s.name,
      desc: s.hook,
      image: s.image,
    }));

  const cityLinks = cities.slice(0, 3).map((c) => ({
    href: `/atuacao/${c.slug}`,
    title: `${service.shortName} em ${c.name}`,
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
            { name: "Soluções", path: "/servicos" },
            { name: service.name, path: `/servicos/${service.slug}` },
          ]}
        />

        <PageHero
          eyebrow={service.name}
          title={service.hook}
          subtitle={service.meta.description}
          image={service.image}
          imageAlt={service.name}
        />

        {/* Intro */}
        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed">
              {service.intro}
            </p>
          </div>
        </section>

        <FeatureList features={service.features} heading="O padrão KMON VIP" />

        <RelatedLinks heading="Cidades onde atendemos" links={cityLinks} />

        <FAQ faqs={service.faqs} />

        <RelatedLinks heading="Outras soluções" links={related} />

        <PageCTA
          title={`Pronto para contratar ${service.shortName.toLowerCase()}?`}
          subtitle="Fale com a equipe KMON VIP e estruture sua próxima operação."
        />

        {/* JSON-LD Schema */}
        <JsonLd data={serviceSchema(service)} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
