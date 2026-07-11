import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { BlogCard } from "@/components/BlogCard";
import {
  BLOG_POSTS,
  FEATURED_SLUG,
  GRID_SLUGS,
  blogPostUrl,
} from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — vodič za rafting na Tari i avanture | Rafting kamp Konak",
  description:
    "Savjeti i vodiči za rafting na Tari: kada je najbolje vrijeme, šta ponijeti, NP Sutjeska, smeštaj i priprema za višednevni rafting. Blog rafting kampa Konak.",
  keywords: [
    "rafting Tara blog",
    "kada rafting Tara",
    "šta ponijeti rafting",
    "vodič rafting BiH",
    "NP Sutjeska vodič",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/blog" },
  openGraph: {
    title: "Blog — vodič za rafting na Tari | Rafting kamp Konak",
    description:
      "Savjeti i vodiči prije dolaska na Taru — priprema, oprema i avanture u okolini.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = BLOG_POSTS[FEATURED_SLUG];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog — Rafting kamp Konak",
    description:
      "Savjeti i vodiči za rafting na Tari i avanture u okolini kampa Konak.",
    url: `${SITE}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    blogPost: Object.values(BLOG_POSTS).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: blogPostUrl(post.slug),
      datePublished: post.datePublished,
      author: {
        "@type": "Organization",
        name: "Rafting kamp Konak",
      },
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="48vh"
        eyebrow="Vodič kroz Taru"
        naslov="Blog i savjeti"
        lead="Sve što treba da znate prije dolaska — vrijeme, priprema, oprema i najljepše tačke kanjona Tare."
        slika={{
          src: "/images/blog-konak/blog-najbolje-vrijeme-rafting-konak.jpg",
          alt: "Rafting na Tari — blog i vodiči kampa Konak",
        }}
      />

      <section className="kon-section">
        <div className="kon-container flex flex-col gap-10">
          <BlogCard
            featured
            kategorija="IZDVOJENO · PRIPREMA"
            naslov={featured.title}
            opis="Kompletna lista — šta dobijate od nas, a šta nosite sami: odjeća, obuća, zaštita od sunca i sitnice koje prave razliku na rijeci."
            href={`/blog/${featured.slug}`}
            linkLabel="Pročitaj"
            gradient={featured.gradient}
          />

          <div className="kon-posts">
            {GRID_SLUGS.map((slug, i) => {
              const post = BLOG_POSTS[slug];
              return (
                <BlogCard
                  key={slug}
                  kategorija={post.cat}
                  naslov={post.title}
                  opis={post.excerpt}
                  href={`/blog/${post.slug}`}
                  gradient={
                    i === 0
                      ? "var(--gradient-slot-2)"
                      : "var(--gradient-slot-3)"
                  }
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
