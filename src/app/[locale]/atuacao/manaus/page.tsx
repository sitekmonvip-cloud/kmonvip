import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { cities } from "@/lib/seo/constants";
import CityPageContent from "@/components/page/CityPageContent";

const city = cities.find((c) => c.slug === "manaus")!;

export const metadata: Metadata = buildMetadata({
  title: city.meta.title,
  description: city.meta.description,
  path: `/atuacao/${city.slug}`,
  image: city.image,
  keywords: city.meta.keywords,
});

export default function Page() {
  return <CityPageContent city={city} />;
}
