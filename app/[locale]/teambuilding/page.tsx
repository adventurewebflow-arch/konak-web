import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureSplit } from "@/components/FeatureSplit";
import { ActivityCard } from "@/components/ActivityCard";
import { GroupInquiryForm } from "@/components/GroupInquiryForm";

const SITE = "https://www.raftingkampkonak.com";

const ACT_HREFS = ["/rafting", "/kanjoning", "/izleti"] as const;
const ACT_IMAGES = [
  "/images/hero-slike-konak/raftingtarom-jednodnevni.jpg",
  "/images/hero-slike-konak/kanjoning-pocetna.jpg",
  "/images/blog-konak/blog-np-sutjeska-konak.jpg",
] as const;
const ACT_NIVO = ["pocetnici", "srednje", "lagano"] as const;

type ActItem = {
  kategorija: string;
  naslov: string;
  trajanje: string;
  opis: string;
  imageAlt: string;
};

type OfferItem = { naslov: string; opis: string };

function IconBed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M4 12v4h16v-4M4 12h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMeal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4v8M10 4v8M6 8h4M14 4v16M18 8v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMeadow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21V9M8 21V13M16 21V13M4 21h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9c-2-3-5-4-7-3 2 1 4 3 7 3s5-2 7-3c-2-1-5 0-7 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OFFER_ICONS: ReactNode[] = [
  <IconBed key="bed" />,
  <IconMeal key="meal" />,
  <IconMeadow key="meadow" />,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teambuilding" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/teambuilding` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function TeambuildingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Teambuilding");
  const tc = await getTranslations("Common");

  const actItems = t.raw("activities.items") as ActItem[];
  const AKTIVNOSTI = actItems.map((a, i) => ({
    kategorija: a.kategorija,
    naslov: a.naslov,
    trajanje: a.trajanje,
    nivo: ACT_NIVO[i],
    opis: a.opis,
    cijena: tc("onRequest"),
    href: ACT_HREFS[i],
    slika: { src: ACT_IMAGES[i], alt: a.imageAlt },
  }));

  const offerItems = t.raw("offer.items") as OfferItem[];
  const chips = t.raw("whyKonak.chips") as string[];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("meta.ogTitle"),
    description: t("meta.description"),
    url: `${SITE}/teambuilding`,
    provider: {
      "@type": "LocalBusiness",
      name: "Rafting kamp Konak",
      telephone: "+38765848110",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hum, Foča",
        addressCountry: "BA",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Bosnia and Herzegovina",
    },
    serviceType: "Teambuilding",
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
        slika={{
          src: "/images/galerija/galerija25.jpg",
          alt: t("hero.imageAlt"),
        }}
      />

      <section className="kon-section">
        <div className="kon-container">
          <FeatureSplit
            eyebrow={t("whyKonak.eyebrow")}
            naslov={t("whyKonak.naslov")}
            opis={t("whyKonak.opis")}
            chips={chips}
            imageBadge={t("whyKonak.imageBadge")}
            slika={{
              src: "/images/galerija/galerija40.jpg",
              alt: t("whyKonak.imageAlt"),
            }}
          />
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("activities.eyebrow")}
            naslov={t("activities.naslov")}
          />
          <div className="kon-acts mt-10">
            {AKTIVNOSTI.map((a) => (
              <ActivityCard
                key={a.naslov}
                {...a}
                ctaLabel={t("activities.ctaLabel")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("offer.eyebrow")}
            naslov={t("offer.naslov")}
          />
          <div className="kon-grp-offer mt-10">
            {offerItems.map((p, i) => (
              <div
                key={p.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {OFFER_ICONS[i]}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {p.opis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand" id="upit">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("form.eyebrow")}
            naslov={t("form.naslov")}
          />
          <p
            className="mt-4 max-w-2xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
          >
            {t("form.lead")}
          </p>
          <div className="mt-8 max-w-2xl">
            <GroupInquiryForm />
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
