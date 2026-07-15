import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  "/",
  "/rafting",
  "/rafting/jednodnevni",
  "/rafting/dvodnevni",
  "/rafting/trodnevni",
  "/rafting/cijela-tara",
  "/kanjoning",
  "/kanjoning/nevidio",
  "/kanjoning/hrcavka",
  "/aktivnosti",
  "/izleti",
  "/smjestaj",
  "/kamp",
  "/hrana",
  "/ponuda",
  "/galerija",
  "/teambuilding",
  "/rezervacija",
  "/kontakt",
  "/kako-do-nas",
  "/cesta-pitanja",
  "/oprema-i-sigurnost",
  "/blog",
] as const;

function localizedPath(locale: "sr" | "en", path: string): string {
  const normalized = path === "/" ? "" : path;
  if (locale === "sr") {
    return normalized ? `${SITE_URL}${normalized}` : SITE_URL;
  }
  return normalized ? `${SITE_URL}/en${normalized}` : `${SITE_URL}/en`;
}

function entry(
  path: string,
  extras?: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">,
): MetadataRoute.Sitemap[number] {
  const sr = localizedPath("sr", path);
  const en = localizedPath("en", path);
  return {
    url: sr,
    lastModified: new Date(),
    changeFrequency: extras?.changeFrequency ?? "weekly",
    priority: extras?.priority ?? 0.7,
    alternates: {
      languages: {
        sr,
        en,
        "x-default": sr,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = getAllBlogSlugs().map((slug) =>
    entry(`/blog/${slug}`, { changeFrequency: "monthly", priority: 0.6 }),
  );

  return [
    entry("/", { changeFrequency: "weekly", priority: 1 }),
    ...STATIC_PATHS.filter((p) => p !== "/").map((path) => {
      if (path.startsWith("/rafting/") || path.startsWith("/kanjoning/")) {
        return entry(path, { changeFrequency: "weekly", priority: 0.9 });
      }
      if (path === "/rafting" || path === "/rezervacija" || path === "/kontakt") {
        return entry(path, { changeFrequency: "weekly", priority: 0.9 });
      }
      return entry(path);
    }),
    ...blogEntries,
  ];
}
