import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CestaPitanja" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/cesta-pitanja` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function CestaPitanjaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CestaPitanja");

  const FAQ = t.raw("items") as FaqItem[];

  return (
    <>
      <Hero
        variant="b"
        visina="44vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
      />

      <section className="kon-section">
        <div className="kon-container" style={{ maxWidth: "880px" }}>
          <FaqAccordion items={FAQ} />
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container" style={{ maxWidth: "880px" }}>
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
    </>
  );
}
