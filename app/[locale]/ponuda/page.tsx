import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { PonudaCatalog } from "@/components/PonudaCatalog";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";

const OFFERS: {
  name: string;
  price: number;
  url: string;
  description?: string;
}[] = [
  {
    name: "Jednodnevni rafting",
    price: 50,
    url: "/rafting/jednodnevni",
    description: "50 EUR bez ručka / 65 EUR sa domaćim ručkom",
  },
  { name: "Dvodnevni aranžman", price: 100, url: "/rafting/dvodnevni" },
  { name: "Trodnevni aranžman", price: 140, url: "/rafting/trodnevni" },
  { name: "Rafting cijelom Tarom", price: 300, url: "/rafting/cijela-tara" },
  { name: "Kanjoning Nevidio", price: 130, url: "/kanjoning/nevidio" },
  { name: "Kanjoning Hrčavka", price: 120, url: "/kanjoning/hrcavka" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ponuda" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/ponuda` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
    },
  };
}

export default async function PonudaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Ponuda");

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t("hero.eyebrow") + " — Rafting kamp Konak",
    url: `${SITE}/ponuda`,
    itemListElement: OFFERS.map((o, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: o.name,
      price: o.price,
      priceCurrency: "EUR",
      url: `${SITE}${o.url}`,
      ...("description" in o && o.description
        ? { description: o.description }
        : {}),
      seller: {
        "@type": "LocalBusiness",
        name: "Rafting kamp Konak",
      },
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="44vh"
        eyebrow={t("hero.eyebrow")}
        naslov={
          <>
            {t("hero.naslov")}
            <br />
            {t("hero.naslovLine2")}
          </>
        }
        lead={t("hero.lead")}
        slika={{
          src: "/images/galerija/galerija9.jpg",
          alt: t("hero.imageAlt"),
        }}
      />

      <section className="kon-section">
        <div className="kon-container">
          <PonudaCatalog />
        </div>
      </section>

      {/* Napomena */}
      <section className="kon-section bg-sand py-8">
        <div className="kon-container">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-text-secondary">
            {(["n1", "n2", "n3", "n4"] as const).map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-teal" aria-hidden="true" />
                {t(`notes.${key}`)}
              </li>
            ))}
            <li className="italic text-muted">{t("notes.weekend")}</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="kon-section">
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
            {t("cta.title")}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
