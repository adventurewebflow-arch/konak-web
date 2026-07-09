import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { CtaButton } from "@/components/CtaButton";
import {
  BLOG_POSTS,
  blogPostUrl,
  getAllBlogSlugs,
} from "@/lib/blog-posts";

const SITE = "https://www.raftingkampkonak.com";

export function generateStaticParams() {
  return getAllBlogSlugs().map((clanak) => ({ clanak }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; clanak: string }>;
}): Promise<Metadata> {
  const { clanak } = await params;
  const post = BLOG_POSTS[clanak];
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE}/blog/${clanak}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.datePublished,
    },
  };
}

export default async function BlogClanakPage({
  params,
}: {
  params: Promise<{ locale: string; clanak: string }>;
}) {
  const { locale, clanak } = await params;
  const post = BLOG_POSTS[clanak];
  if (!post) notFound();
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.lead,
    url: blogPostUrl(post.slug),
    datePublished: post.datePublished,
    author: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
  };

  return (
    <>
      <Hero
        variant="b"
        visina="48vh"
        eyebrow={post.cat}
        naslov={post.title}
        nazadLink={{ href: "/blog", label: "Svi članci" }}
      />

      <article className="kon-section">
        <div className="kon-container" style={{ maxWidth: "820px" }}>
          <p
            className="font-sans text-body text-ink"
            style={{
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.65,
            }}
          >
            {post.lead}
          </p>

          <div className="mt-10 space-y-10">
            {post.blocks.map((block) => (
              <section key={block.h}>
                <h2 className="font-display text-2xl font-bold text-pine">
                  {block.h}
                </h2>
                <div className="mt-4 space-y-4">
                  {block.p.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="font-sans text-[16px] leading-relaxed text-text-secondary"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="kon-section bg-sand">
        <div className="kon-container" style={{ maxWidth: "820px" }}>
          <div
            className="rounded-card-lg px-8 py-10 text-center sm:px-12"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h3
              className="font-display text-2xl font-bold text-white sm:text-3xl"
            >
              Spremni za Taru?
            </h3>
            <p
              className="mx-auto mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              Izaberite turu i termin — cijenu računamo odmah, a upit šaljete u
              dva klika.
            </p>
            <div className="mt-8">
              <CtaButton href="/rezervacija" arrow>
                Rezerviši rafting
              </CtaButton>
            </div>
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
