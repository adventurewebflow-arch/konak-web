import { SITE_URL } from "@/lib/seo";

export interface BlogPostMeta {
  slug: string;
  datePublished: string;
  gradient?: string;
  ctaHref?: string;
  image: string;
}

export const BLOG_POSTS: Record<string, BlogPostMeta> = {
  "kada-na-taru": {
    slug: "kada-na-taru",
    datePublished: "2026-05-20",
    gradient: "var(--gradient-slot-1)",
    ctaHref: "/rafting",
    image: "/images/blog-konak/blog-najbolje-vrijeme-rafting-konak.jpg",
  },
  "sta-ponijeti-na-rafting": {
    slug: "sta-ponijeti-na-rafting",
    datePublished: "2026-05-15",
    gradient: "var(--gradient-slot-1)",
    ctaHref: "/rafting",
    image: "/images/blog-konak/blog-sta-ponijeti-konak.jpg",
  },
  "np-sutjeska-vodic": {
    slug: "np-sutjeska-vodic",
    datePublished: "2026-06-01",
    gradient: "var(--gradient-slot-2)",
    ctaHref: "/kontakt",
    image: "/images/blog-konak/blog-np-sutjeska-konak.jpg",
  },
  "aktivnosti-na-tari": {
    slug: "aktivnosti-na-tari",
    datePublished: "2026-06-10",
    gradient: "var(--gradient-slot-3)",
    ctaHref: "/ponuda",
    image: "/images/hero-slike-konak/izleti-konak.png",
  },
};

export const FEATURED_SLUG = "kada-na-taru";

export const GRID_SLUGS = [
  "np-sutjeska-vodic",
  "aktivnosti-na-tari",
  "sta-ponijeti-na-rafting",
] as const;

export function blogPostUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

export function getAllBlogSlugs() {
  return Object.keys(BLOG_POSTS);
}

export function getBlogPostMeta(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS[slug];
}
