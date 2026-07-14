import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";

const SITE = "https://www.raftingkampkonak.com";
const LAT = 43.3528783;
const LNG = 18.8229302;
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;
const MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

type InfoItem = { label: string; value: string };
type RouteItem = { naslov: string; opis: string; meta: string };
type TipItem = { naslov: string; tekst: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "KakoDoNas" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/kako-do-nas` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function KakoDoNasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("KakoDoNas");

  const INFO = t.raw("location.info") as InfoItem[];
  const RUTE = t.raw("routes.items") as RouteItem[];
  const SAVJETI = t.raw("tips.items") as TipItem[];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rafting kamp Konak",
    url: `${SITE}/kako-do-nas`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hum",
      addressLocality: "Foča",
      postalCode: "73300",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LAT,
      longitude: LNG,
    },
    hasMap: MAPS_URL,
  };

  return (
    <>
      <Hero
        variant="b"
        visina="50vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
      />

      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("location.eyebrow")}
              naslov={t("location.naslov")}
            />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("location.lead")}
            </p>
            <dl className="mt-8 space-y-4">
              {INFO.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-sans text-base font-semibold text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="kon-split-media">
            <iframe
              title={t("maps.iframeTitle")}
              src={MAPS_EMBED}
              className="w-full rounded-card-lg border border-line shadow-soft"
              style={{ height: "clamp(320px, 46vh, 440px)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("routes.eyebrow")}
            naslov={t("routes.naslov")}
          />
          <div className="kon-routes mt-8">
            {RUTE.map((r) => (
              <article
                key={r.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {r.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {r.opis}
                </p>
                <p className="mt-3 font-sans text-sm font-semibold text-muted">
                  {r.meta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("tips.eyebrow")}
            naslov={t("tips.naslov")}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVJETI.map((s) => (
              <article
                key={s.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {s.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {s.tekst}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaButton href={MAPS_URL} arrow>
              {t("maps.button")}
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
