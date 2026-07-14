import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { BlogCard } from "@/components/BlogCard";
import {
  BLOG_POSTS,
  FEATURED_SLUG,
  GRID_SLUGS,
  blogPostUrl,
} from "@/lib/blog-posts";
import { OG_IMAGES } from "@/lib/seo";

const SITE = "https://www.raftingkampkonak.com";

type PostCopy = {
  cat: string;
  title: string;
  excerpt: string;
  imageAlt: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/blog` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const tp = await getTranslations("BlogClanak");

  const posts = tp.raw("posts") as Record<string, PostCopy>;
  const featuredMeta = BLOG_POSTS[FEATURED_SLUG];
  const featured = posts[FEATURED_SLUG];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("meta.ogTitle"),
    description: t("meta.description"),
    url: `${SITE}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    blogPost: Object.keys(BLOG_POSTS).map((slug) => {
      const meta = BLOG_POSTS[slug];
      const copy = posts[slug];
      return {
        "@type": "BlogPosting",
        headline: copy.title,
        description: copy.excerpt,
        url: blogPostUrl(slug),
        datePublished: meta.datePublished,
        author: {
          "@type": "Organization",
          name: "Rafting kamp Konak",
        },
      };
    }),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="48vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
        slika={{
          src: featuredMeta.image,
          alt: t("hero.imageAlt"),
        }}
      />

      <section className="kon-section">
        <div className="kon-container flex flex-col gap-10">
          <BlogCard
            featured
            kategorija={t("featuredKategorija")}
            naslov={featured.title}
            opis={featured.excerpt}
            href={`/blog/${featuredMeta.slug}`}
            linkLabel={t("readLabel")}
            slika={{
              src: featuredMeta.image,
              alt: featured.imageAlt,
            }}
          />

          <div className="kon-posts">
            {GRID_SLUGS.map((slug) => {
              const meta = BLOG_POSTS[slug];
              const post = posts[slug];
              return (
                <BlogCard
                  key={slug}
                  kategorija={post.cat}
                  naslov={post.title}
                  opis={post.excerpt}
                  href={`/blog/${meta.slug}`}
                  slika={{
                    src: meta.image,
                    alt: post.imageAlt,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
