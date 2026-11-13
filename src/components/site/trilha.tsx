import Link from "next/link";
import { site } from "@/content/site";
import { JsonLd } from "@/components/site/json-ld";

/** Breadcrumb (Início / ... / página atual) com dados estruturados. */
export function Trilha({ itens }: { itens: { label: string; href?: string }[] }) {
  const todos = [{ label: "Início", href: "/" }, ...itens];
  return (
    <>
      <nav aria-label="Trilha" className="text-sm text-subtle lg:text-[0.9375rem]">
        <ol className="flex flex-wrap items-center gap-x-2">
          {todos.map((item, i) => (
            <li key={item.label} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: todos.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${site.siteUrl}${item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
