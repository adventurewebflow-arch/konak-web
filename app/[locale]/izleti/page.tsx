import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard } from "@/components/BlogCard";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";

const COMBO_HREFS = ["/kontakt", "/kanjoning", "/kontakt"] as const;
const COMBO_IMAGES = [
  "/images/blog-konak/blog-np-sutjeska-konak.jpg",
  "/images/hero-slike-konak/kanjoning-pocetna.jpg",
  "/images/hero-slike-konak/izleti-konak.png",
] as const;

const MOUNTAIN_IMAGES = [
  "/images/hero-slike-konak/izleti-konak.png",
  "/images/blog-konak/blog-np-sutjeska-konak.jpg",
  "/images/hero-slike-konak/izleti-konak.png",
  "/images/hero-slike-konak/izleti-konak.png",
  "/images/hero-slike-konak/np-sutjeska-konak.webp",
] as const;

type ComboItem = {
  kategorija: string;
  naslov: string;
  opis: string;
  linkLabel: string;
  imageAlt: string;
};

type MountainItem = {
  naslov: string;
  meta: string;
  opis: string;
  imageAlt: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Izleti" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/izleti` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function IzletiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Izleti");

  const comboItems = t.raw("combinations.items") as ComboItem[];
  const KOMBINACIJE = comboItems.map((k, i) => ({
    ...k,
    href: COMBO_HREFS[i],
    slika: { src: COMBO_IMAGES[i], alt: k.imageAlt },
  }));

  const mountainItems = t.raw("mountain.items") as MountainItem[];
  const PLANINSKI = mountainItems.map((p, i) => ({
    ...p,
    slika: { src: MOUNTAIN_IMAGES[i], alt: p.imageAlt },
  }));

  const blogLead = t("mountain.blogLead");
  const blogLink = t("mountain.blogLink");
  const blogParts = blogLead.split(blogLink);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: KOMBINACIJE.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${k.href}`,
      name: k.naslov,
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="52vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
        slika={{
          src: "/images/hero-slike-konak/izleti-konak.png",
          alt: t("hero.imageAlt"),
        }}
      />

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("combinations.eyebrow")}
            naslov={t("combinations.naslov")}
          />
          <div className="kon-combos mt-10">
            {KOMBINACIJE.map((k) => (
              <BlogCard
                key={k.naslov}
                kategorija={k.kategorija}
                naslov={k.naslov}
                opis={k.opis}
                href={k.href}
                linkLabel={k.linkLabel}
                slika={k.slika}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("mountain.eyebrow")}
            naslov={t("mountain.naslov")}
          />
          <div className="kon-combos mt-8">
            {PLANINSKI.map((p) => (
              <BlogCard
                key={p.naslov}
                kategorija={p.meta}
                naslov={p.naslov}
                opis={p.opis}
                href="/kontakt"
                linkLabel={t("mountain.linkLabel")}
                slika={p.slika}
              />
            ))}
          </div>
          <p className="mt-6 font-sans text-sm text-text-secondary">
            {blogParts[0]}
            <Link
              href="/blog/aktivnosti-na-tari"
              className="font-semibold text-terracotta transition-colors hover:text-terracotta-hover"
            >
              {blogLink}
            </Link>
            {blogParts[1] ?? ""}
          </p>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <div
            className="flex flex-col items-center rounded-card-lg px-8 py-12 text-center sm:px-12 sm:py-14"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h2
              className="font-display font-extrabold text-white"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {t("cta.headline")}
            </h2>
            <p
              className="mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              {t("cta.lead")}
            </p>
            <div className="mt-8">
              <CtaButton href="/kontakt" arrow>
                {t("cta.button")}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
