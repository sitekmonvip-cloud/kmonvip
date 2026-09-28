import { localizedMetadata } from "@/lib/seo/metadata";
import { fleet } from "@/lib/seo/constants";
import FleetPageContent from "@/components/page/FleetPageContent";

const item = fleet.find((f) => f.slug === "sedan-blindado")!;

export const generateMetadata = localizedMetadata({
  title: item.meta.title,
  description: item.meta.description,
  path: `/frota/${item.slug}`,
  image: item.image,
  keywords: item.meta.keywords,
});

export default function Page() {
  return <FleetPageContent item={item} />;
}
