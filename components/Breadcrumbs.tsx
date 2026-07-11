import { Link } from "@/i18n/navigation";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Putokaz"
      className={`border-b border-line-nav bg-sand/80 ${className}`}
    >
      <ol
        className="kon-container flex flex-wrap items-center gap-x-2 gap-y-1 py-3 font-sans text-[13px] text-text-secondary"
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span className="text-line-nav" aria-hidden="true">
                  ›
                </span>
              )}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="font-semibold text-body transition-colors hover:text-teal"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "font-semibold text-ink" : "font-semibold text-body"}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbListLd(items: Crumb[], site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith("http") ? item.href : `${site}${item.href === "/" ? "" : item.href}` }
        : {}),
    })),
  };
}
