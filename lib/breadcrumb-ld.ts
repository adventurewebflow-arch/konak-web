export type Crumb = {
  label: string;
  href?: string;
};

export function breadcrumbListLd(items: Crumb[], site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? {
            item: item.href.startsWith("http")
              ? item.href
              : `${site}${item.href === "/" ? "" : item.href}`,
          }
        : {}),
    })),
  };
}
