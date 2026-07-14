import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard } from "@/components/BlogCard";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";

const HREFS = ["/rafting", "/kanjoning", "/izleti", "/kontakt"] as const;
const IMAGES = [
  "/images/hero-slike-konak/raftingtarom-jednodnevni.jpg",
  "/images/hero-slike-konak/kanjoning-pocetna.jpg",
  "/images/blog-konak/blog-np-sutjeska-konak.jpg",
  "/images/hero-slike-konak/np-sutjeska-konak.webp",
] as const;

type Item = {
  kategorija: string;
  naslov: string;
  opis: string;
  linkLabel: string;
  imageAlt: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Aktivnosti" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/aktivnosti` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function AktivnostiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Aktivnosti");

  const items = t.raw("items") as Item[];
  const AKTIVNOSTI = items.map((item, i) => ({
    ...item,
    href: HREFS[i],
    slika: { src: IMAGES[i], alt: item.imageAlt },
  }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: AKTIVNOSTI.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${a.href}`,
      name: a.naslov,
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="54vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
        slika={{
          src: "/images/blog-konak/blog-np-sutjeska-konak.jpg",
          alt: t("hero.imageAlt"),
        }}
      />

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("overview.eyebrow")}
            naslov={t("overview.naslov")}
          />
          <p
            className="mt-5 max-w-2xl font-sans text-body text-text-secondary"
            style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
          >
            {t("overview.lead")}
          </p>
          <div className="kon-acts mt-10">
            {AKTIVNOSTI.map((a) => (
              <BlogCard
                key={a.naslov}
                kategorija={a.kategorija}
                naslov={a.naslov}
                opis={a.opis}
                href={a.href}
                linkLabel={a.linkLabel}
                slika={a.slika}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div
          className="kon-container flex flex-col items-center text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <h2
            className="font-display font-extrabold text-pine"
            style={{
              fontSize: "clamp(30px, 4.5vw, 58px)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}
          >
            {t("cta.headline")}
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            {t("cta.lead")}
          </p>
          <div className="mt-8">
            <CtaButton href="/rezervacija" arrow>
              {t("cta.button")}
            </CtaButton>
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
