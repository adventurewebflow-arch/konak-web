import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { StayCard } from "@/components/StayCard";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";

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

function IconParking() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8v8M10 8h3a2 2 0 0 1 0 4h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconPaw() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="7" r="1.6" fill="currentColor" />
      <circle cx="16" cy="9" r="1.6" fill="currentColor" />
      <path
        d="M7 13c1.2 2.5 3.8 4 5 4s3.8-1.5 5-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kamp" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/kamp` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
    },
  };
}

export default async function KampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Kamp");

  const ATMOSFERA = [
    {
      label: t("atmosfera.img1Label"),
      slika: {
        src: "/images/smjestaj-konak/kamp_konak.webp",
        alt: t("atmosfera.img1Alt"),
      },
    },
    {
      label: t("atmosfera.img2Label"),
      slika: {
        src: "/images/smjestaj-konak/kamp_konak1.webp",
        alt: t("atmosfera.img2Alt"),
      },
    },
    {
      label: t("atmosfera.img3Label"),
      slika: {
        src: "/images/hero-slike-konak/smjestaj-konak-pocetna.jpg",
        alt: t("atmosfera.img3Alt"),
      },
    },
  ];

  const POGODNOSTI: { naslov: string; opis: string; ikona: ReactNode }[] = [
    {
      naslov: t("amenities.a1Naslov"),
      opis: t("amenities.a1Opis"),
      ikona: <IconWaves />,
    },
    {
      naslov: t("amenities.a2Naslov"),
      opis: t("amenities.a2Opis"),
      ikona: <IconBath />,
    },
    {
      naslov: t("amenities.a3Naslov"),
      opis: t("amenities.a3Opis"),
      ikona: <IconParking />,
    },
    {
      naslov: t("amenities.a4Naslov"),
      opis: t("amenities.a4Opis"),
      ikona: <IconPaw />,
    },
  ];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction", "Campground"],
    name: "Rafting kamp Konak",
    description: t("meta.ogDescription"),
    url: `${SITE}/kamp`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.3528783,
      longitude: 18.8229302,
    },
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
          src: "/images/kamp/dobra_slika_konaka.webp",
          alt: t("hero.imageAlt"),
        }}
      />

      {/* O kampu split */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("about.eyebrow")}
              naslov={t("about.naslov")}
            />
            <div
              className="mt-6 max-w-xl space-y-4 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              className="aspect-[4/5] w-full rounded-card-lg shadow-soft"
              src="/images/smjestaj-konak/konak_ispred.webp"
              alt={t("about.imageAlt")}
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Atmosfera galerija */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("atmosfera.eyebrow")}
            naslov={t("atmosfera.naslov")}
          />
          <div className="kon-atmos mt-10">
            {ATMOSFERA.map((item, i) => (
              <ImageSlot
                key={item.label}
                className={`rounded-card ${i === 0 ? "aspect-[16/10] min-h-[220px]" : "aspect-[4/3]"}`}
                src={item.slika.src}
                alt={item.slika.alt}
                sizes="(max-width: 920px) 50vw, 400px"
              >
                <span className="absolute bottom-4 left-4 rounded-pill bg-pine/85 px-3 py-1 font-sans text-xs font-bold text-white backdrop-blur-sm">
                  {item.label}
                </span>
              </ImageSlot>
            ))}
          </div>
        </div>
      </section>

      {/* Smeštaj teaser */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("stay.eyebrow")}
            naslov={t("stay.naslov")}
          />
          <div className="kon-stay mt-10">
            <StayCard
              naslov={t("stay.bungaloviNaslov")}
              badge={t("stay.bungaloviBadge")}
              opis={t("stay.bungaloviOpis")}
              chips={[
                t("stay.bungaloviChip1"),
                t("stay.bungaloviChip2"),
                t("stay.bungaloviChip3"),
              ]}
              href="/smjestaj"
              slika={{
                src: "/images/smjestaj-konak/smjestaj_kamp_konak.webp",
                alt: t("stay.bungaloviNaslov"),
              }}
            />
            <StayCard
              naslov={t("stay.autoKampNaslov")}
              cijena={t("stay.autoKampCijena")}
              opis={t("stay.autoKampOpis")}
              chips={[
                t("stay.autoKampChip1"),
                t("stay.autoKampChip2"),
                t("stay.autoKampChip3"),
                t("stay.autoKampChip4"),
              ]}
              href="/smjestaj"
              slika={{
                src: "/images/autokamp/autokapm-konak.jpg",
                alt: t("stay.autoKampNaslov"),
              }}
            />
          </div>
        </div>
      </section>

      {/* Pogodnosti */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("amenities.eyebrow")}
            naslov={t("amenities.naslov")}
          />
          <div className="kon-amen mt-10">
            {POGODNOSTI.map((p) => (
              <div
                key={p.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {p.ikona}
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
