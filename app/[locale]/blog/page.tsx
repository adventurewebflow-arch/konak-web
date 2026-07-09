import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
      <section
        className="kon-section bg-sand"
        style={{ paddingBlock: "clamp(44px, 8vh, 84px)" }}
      >
        <div className="kon-container">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
            Vodič kroz Taru
          </span>
          <h1
            className="mt-3 font-display font-extrabold text-pine"
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Blog i savjeti
          </h1>
          <p
            className="mt-5 max-w-2xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            Sve što treba da znate prije dolaska — vrijeme, priprema, oprema i
            najljepše tačke kanjona Tare.
          </p>
        </div>
      </section>

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
