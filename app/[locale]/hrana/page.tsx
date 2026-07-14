import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { MenuCard } from "@/components/MenuCard";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/hrana";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hrana" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/hrana` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function HranaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hrana");

  const JELOVNIK = [
    {
      eyebrow: t("menu.item1Eyebrow"),
      naslov: t("menu.item1Naslov"),
      opis: t("menu.item1Opis"),
      slika: { src: `${IMG}/dorucak2.jpg`, alt: t("menu.item1Alt") },
    },
    {
      eyebrow: t("menu.item2Eyebrow"),
      naslov: t("menu.item2Naslov"),
      opis: t("menu.item2Opis"),
      slika: { src: `${IMG}/rucak_konak.jpg`, alt: t("menu.item2Alt") },
    },
    {
      eyebrow: t("menu.item3Eyebrow"),
      naslov: t("menu.item3Naslov"),
      opis: t("menu.item3Opis"),
      slika: { src: `${IMG}/dorucak3.jpg`, alt: t("menu.item3Alt") },
    },
    {
      eyebrow: t("menu.item4Eyebrow"),
      naslov: t("menu.item4Naslov"),
      opis: t("menu.item4Opis"),
      slika: { src: `${IMG}/dorucak-dezert-konak.jpg`, alt: t("menu.item4Alt") },
    },
  ];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Rafting kamp Konak — restoran",
    servesCuisine: "Domaća, balkanska",
    url: `${SITE}/hrana`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: JELOVNIK.map((j) => ({
        "@type": "MenuSection",
        name: j.naslov,
        description: j.opis,
      })),
    },
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow={t("hero.eyebrow")}
        naslov={
          <>
            {t("hero.naslovLine1")}
            <br />
            {t("hero.naslovLine2")}
          </>
        }
        lead={t("hero.lead")}
        slika={{
          src: `${IMG}/sac-konak.jpg`,
          alt: t("hero.imageAlt"),
        }}
      />

      {/* Uvod */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container space-y-4 font-sans text-body"
          style={{
            maxWidth: "880px",
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.65,
          }}
        >
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {t("intro.lead")}
          </p>
          <p>{t("intro.p1")}</p>
          <p>{t("intro.p2")}</p>
        </div>
      </section>

      {/* Kuvar Brane — istaknuti tekstualni blok */}
      <section className="kon-section">
        <div className="kon-container">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-card-lg border border-mint-border bg-mint-surface px-6 py-8 sm:px-10 sm:py-10">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
              {t("brane.eyebrow")}
            </span>
            <h2
              className="mt-3 font-display font-extrabold text-pine"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {t("brane.naslov")}
            </h2>
            <p
              className="mt-5 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
            >
              {t("brane.p1")}
            </p>
            <p className="mt-4 font-sans text-sm font-semibold text-text-secondary">
              {t("brane.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Jelovnik 2×2 */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <div className="kon-menu">
            {JELOVNIK.map((j) => (
              <MenuCard key={j.naslov} {...j} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              {t("cta.title")}
            </h2>
            <p
              className="mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              {t("cta.lead")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/rezervacija" arrow>
                {t("cta.ctaBook")}
              </CtaButton>
              <CtaButton href="/kontakt" variant="ghost">
                {t("cta.ctaGroup")}
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
