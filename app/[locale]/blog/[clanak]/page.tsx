import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { CtaButton } from "@/components/CtaButton";
import {
  blogPostUrl,
  getAllBlogSlugs,
  getBlogPostMeta,
} from "@/lib/blog-posts";
import { OG_IMAGES } from "@/lib/seo";

const SITE = "https://www.raftingkampkonak.com";

type BlogBlock = { h: string; p: string[] };

type PostCopy = {
  cat: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  ctaLabel: string;
  blocks: BlogBlock[];
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((clanak) => ({ clanak }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; clanak: string }>;
}): Promise<Metadata> {
  const { locale, clanak } = await params;
  const meta = getBlogPostMeta(clanak);
  if (!meta) return {};

  const t = await getTranslations({ locale, namespace: "BlogClanak" });
  const posts = t.raw("posts") as Record<string, PostCopy>;
  const post = posts[clanak];
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `${SITE}/blog/${clanak}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: meta.datePublished,
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function BlogClanakPage({
  params,
}: {
  params: Promise<{ locale: string; clanak: string }>;
}) {
  const { locale, clanak } = await params;
  const meta = getBlogPostMeta(clanak);
  if (!meta) notFound();

  setRequestLocale(locale);
  const tc = await getTranslations("Common");
  const t = await getTranslations("BlogClanak");

  const posts = t.raw("posts") as Record<string, PostCopy>;
  const post = posts[clanak];
  if (!post) notFound();

  const hasCta = Boolean(meta.ctaHref);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.lead,
    url: blogPostUrl(meta.slug),
    datePublished: meta.datePublished,
    author: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    mainEntityOfPage: `${SITE}/blog/${meta.slug}`,
  };

  return (
    <>
      <Hero
        variant="b"
        visina="48vh"
        eyebrow={post.cat}
        naslov={post.title}
        nazadLink={{ href: "/blog", label: tc("backAllArticles") }}
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
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {hasCta ? t("cta.headline") : t("cta.headlineDefault")}
            </h3>
            <p
              className="mx-auto mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              {hasCta ? t("cta.lead") : t("cta.leadDefault")}
            </p>
            <div className="mt-8">
              <CtaButton href={meta.ctaHref ?? "/rezervacija"} arrow>
                {hasCta ? post.ctaLabel : t("cta.defaultButton")}
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
