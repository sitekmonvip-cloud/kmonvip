import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { crossPages } from "@/lib/seo/constants";
import CrossPageContent from "@/components/page/CrossPageContent";

const cross = crossPages.find(
  (c) => c.serviceSlug === "transporte-executivo" && c.citySlug === "brasilia"
)!;

export const metadata: Metadata = buildMetadata({
  title: cross.meta.title,
  description: cross.meta.description,
  path: `/servicos/${cross.serviceSlug}/${cross.citySlug}`,
  keywords: cross.meta.keywords,
});

export default function Page() {
  return <CrossPageContent cross={cross} />;
}
