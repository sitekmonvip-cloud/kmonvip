import { localizedMetadata } from "@/lib/seo/metadata";
import { crossPages } from "@/lib/seo/constants";
import CrossPageContent from "@/components/page/CrossPageContent";

const cross = crossPages.find(
  (c) => c.serviceSlug === "transporte-blindado" && c.citySlug === "rio-de-janeiro"
)!;

export const generateMetadata = localizedMetadata({
  title: cross.meta.title,
  description: cross.meta.description,
  path: `/servicos/${cross.serviceSlug}/${cross.citySlug}`,
  keywords: cross.meta.keywords,
});

export default function Page() {
  return <CrossPageContent cross={cross} />;
}
