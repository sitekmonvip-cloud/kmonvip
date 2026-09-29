import { localizedMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/seo/constants";
import ServicePageContent from "@/components/page/ServicePageContent";

const service = services.find((s) => s.slug === "eventos-e-congressos")!;

export const generateMetadata = localizedMetadata({
  title: service.meta.title,
  description: service.meta.description,
  path: `/servicos/${service.slug}`,
  image: service.image,
  keywords: service.meta.keywords,
});

export default function Page() {
  return <ServicePageContent service={service} />;
}
