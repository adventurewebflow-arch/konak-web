import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/smjestaj-konak";
const AUTO = "/images/autokamp";

const GALERIJA = [
  { src: `${IMG}/kamp_konak.webp`, alt: "Lux bungalovi kampa Konak uz rijeku" },
  { src: `${IMG}/kamp_konak1.webp`, alt: "Smještaj kampa Konak — bungalovi na obali" },
  { src: `${IMG}/konak_ispred.webp`, alt: "Ulaz i dvorište rafting kampa Konak" },
  { src: `${IMG}/smjestaj_konak.webp`, alt: "Unutrašnjost lux bungalova kampa Konak" },
  { src: `${IMG}/smjestaj_konak2.webp`, alt: "Lux bungalov kampa Konak — soba" },
  { src: `${IMG}/smjestaj_konak3.webp`, alt: "Lux bungalov kampa Konak — odmor uz Taru" },
  { src: `${IMG}/toalet_kamp_konak.webp`, alt: "Kupatilo u bungalovu kampa Konak" },
  { src: `${AUTO}/auto-konak.jpg`, alt: "Auto kamp Konak — kamperi pod krošnjama" },
];

function IconBath() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 12V7a2 2 0 0 1 2-2h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconWaves() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5a9 9 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Smjestaj" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/smjestaj` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function SmjestajPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Smjestaj");

  const UKLJUCENO: { naslov: string; opis: string; ikona: ReactNode }[] = [
    {
      naslov: t("included.i1Naslov"),
      opis: t("included.i1Opis"),
      ikona: <IconBath />,
    },
    {
      naslov: t("included.i2Naslov"),
      opis: t("included.i2Opis"),
      ikona: <IconWaves />,
    },
    {
      naslov: t("included.i3Naslov"),
      opis: t("included.i3Opis"),
      ikona: <IconWifi />,
    },
  ];

  const lodgingLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Rafting kamp Konak — lux bungalovi",
    description: t("meta.description"),
    url: `${SITE}/smjestaj`,
    telephone: "+38765848110",
    numberOfRooms: 13,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Sopstveno kupatilo", value: true },
      { "@type": "LocationFeatureSpecification", name: "Topla voda", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    ],
  };

  const bodyCls = "font-sans text-body text-text-secondary";
  const bodyStyle = {
    fontSize: "clamp(16px, 1.4vw, 19px)",
    lineHeight: 1.65,
  } as const;

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow={t("hero.eyebrow")}
        naslov={
          <>
            {t("hero.naslov")}{" "}
            <span className="text-teal-light">{t("hero.naslovAccent")}</span>
          </>
        }
        lead={t("hero.lead")}
        slika={{
          src: `${IMG}/smjestaj_hero.webp.webp`,
          alt: t("hero.imageAlt"),
        }}
      />

      {/* Uvod — uski blok */}
      <section className="kon-section">
        <div
          className="kon-container space-y-5"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <p
            className="font-display text-xl font-semibold text-ink sm:text-2xl"
            style={{ lineHeight: 1.35 }}
          >
            {t("intro.lead")}
          </p>
          <p className={bodyCls} style={bodyStyle}>
            {t("intro.p1")}
          </p>
          <p className={bodyCls} style={bodyStyle}>
            {t("intro.p2")}
          </p>
        </div>
      </section>

      {/* Bungalovi */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1.05fr 0.95fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("bungalovi.eyebrow")}
              naslov={t("bungalovi.naslov")}
            />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                {t("bungalovi.p1")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                {t("bungalovi.p2")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                {t("bungalovi.p3")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                {t("bungalovi.p4")}
              </p>
              <p className="font-sans text-sm font-semibold text-muted">
                {t("bungalovi.note")}
              </p>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              src={`${IMG}/smjestaj_kamp_konak.webp`}
              alt={t("bungalovi.imageAlt")}
              className="aspect-[4/5] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Veče u kampu */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "0.95fr 1.05fr" }}
        >
          <div className="kon-split-media">
            <ImageSlot
              src={`${IMG}/kamp_konak1.webp`}
              alt={t("evening.imageAlt")}
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("evening.eyebrow")}
              naslov={t("evening.naslov")}
            />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                {t("evening.p1")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                {t("evening.p2")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                {t("evening.p3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auto kamp */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1.05fr 0.95fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("autoKamp.eyebrow")}
              naslov={t("autoKamp.naslov")}
            />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                {t("autoKamp.p1")}
              </p>
              <p className={bodyCls} style={bodyStyle}>
                <strong className="font-semibold text-ink">
                  {t("autoKamp.p2Strong")}
                </strong>
                {". "}
                {t("autoKamp.p2Text")}
              </p>
              <div className="pt-2">
                <CtaButton href="/rezervacija" variant="secondary" arrow>
                  {t("autoKamp.ctaButton")}
                </CtaButton>
              </div>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              src={`${AUTO}/autokapm-konak.jpg`}
              alt={t("autoKamp.imageAlt")}
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Galerija */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("gallery.eyebrow")}
            naslov={t("gallery.naslov")}
          />
          <div className="kon-bgal mt-10">
            {GALERIJA.map((g) => (
              <ImageSlot
                key={g.src}
                src={g.src}
                alt={g.alt}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Šta dobijate */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("included.eyebrow")}
            naslov={t("included.naslov")}
          />
          <div className="kon-bgal mt-10">
            {UKLJUCENO.map((u) => (
              <div
                key={u.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {u.ikona}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {u.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {u.opis}
                </p>
              </div>
            ))}
          </div>
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
          <p className={`mt-5 max-w-xl ${bodyCls}`} style={bodyStyle}>
            {t("cta.lead")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/ponuda" arrow>
              {t("cta.ctaOffer")}
            </CtaButton>
            <CtaButton href="/rezervacija" variant="secondary">
              {t("cta.ctaBook")}
            </CtaButton>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingLd) }}
      />
    </>
  );
}
