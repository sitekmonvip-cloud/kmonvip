import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/components/seo/schemas";

export type Crumb = { name: string; path: string };

type Props = {
  crumbs: Crumb[];
};

export default function BreadcrumbsNav({ crumbs }: Props) {
  // Last crumb is current page (no link, no schema item beyond presence)
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav
        aria-label="Caminho de navegação"
        className="mx-auto max-w-7xl px-5 pt-6"
      >
        <ol className="flex items-center gap-2 flex-wrap text-xs text-ink-500">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span className="text-ink-300">/</span>}
                {isLast ? (
                  <span className="text-ink-900 font-medium">{c.name}</span>
                ) : (
                  <Link
                    href={c.path}
                    className="hover:text-ink-900 transition-colors"
                  >
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
