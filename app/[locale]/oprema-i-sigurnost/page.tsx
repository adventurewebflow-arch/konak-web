import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ImageSlot } from "@/components/ImageSlot";

const SITE = "https://www.raftingkampkonak.com";

type GearItem = { naslov: string; opis: string };

function IconSuit() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h8l2 4v12l-4-2-2 2-2-2-4 2V8l2-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBoot() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 10V6a2 2 0 0 1 2-2h2v16H6a2 2 0 0 1-2-2v-6h0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 4h6l2 6v8h-8V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconVest() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4 8 8v12l4-2 4 2V8l-4-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHelmet() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 14V10a6 6 0 1 1 12 0v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconPaddle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 5h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const GEAR_ICONS: ReactNode[] = [
  <IconSuit key="suit" />,
  <IconBoot key="boot" />,
  <IconVest key="vest" />,
  <IconHelmet key="helmet" />,
  <IconPaddle key="paddle" />,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Oprema" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/oprema-i-sigurnost` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "article",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function OpremaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Oprema");

  const gearItems = t.raw("gear.items") as GearItem[];

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.ogTitle"),
    about: t("meta.ogDescription"),
    author: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    url: `${SITE}/oprema-i-sigurnost`,
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
  };

  const bodyStyle = {
    fontSize: "clamp(16px, 1.4vw, 19px)",
    lineHeight: 1.65,
  } as const;

  return (
    <>
      <Hero
        variant="b"
        visina="52vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
      />

      <section className="kon-section">
        <div
          className="kon-container space-y-4 font-sans text-body"
          style={{
            maxWidth: "880px",
            ...bodyStyle,
          }}
        >
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {t("intro.subheading")}
          </p>
          <p className="text-text-secondary">{t("intro.p1")}</p>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-media">
            <ImageSlot
              src="/images/rafting/rafting-galerija8.jpg"
              alt={t("hero.imageAlt")}
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
          <div className="kon-split-body">
            <SectionHeader
              eyebrow={t("guides.eyebrow")}
              naslov={t("guides.naslov")}
            />
            <p
              className="mt-6 max-w-xl font-sans text-body text-text-secondary"
              style={bodyStyle}
            >
              {t("guides.lead")}
            </p>
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-card-lg border border-mint-border bg-mint-surface px-6 py-8 sm:px-10 sm:py-10">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
              {t("equipment.eyebrow")}
            </span>
            <h2
              className="mt-3 font-display font-extrabold text-pine"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {t("equipment.naslov")}
            </h2>
            <div
              className="mt-5 space-y-4 font-sans text-body text-text-secondary"
              style={bodyStyle}
            >
              <p>{t("equipment.p1")}</p>
              <p>{t("equipment.p2")}</p>
              <p>{t("equipment.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("gear.eyebrow")}
            naslov={t("gear.naslov")}
          />
          <div className="kon-eq mt-10">
            {gearItems.map((o, i) => (
              <div
                key={o.naslov}
                className="rounded-card border border-line bg-surface p-5 text-center"
              >
                <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {GEAR_ICONS[i]}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">
                  {o.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {o.opis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1fr 1fr", gap: "18px" }}
        >
          <article className="rounded-card-lg border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold text-pine">
              {t("briefing.naslov")}
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-secondary">
              {t("briefing.lead")}
            </p>
          </article>
          <article className="rounded-card-lg border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold text-pine">
              {t("weather.naslov")}
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-secondary">
              {t("weather.lead")}
            </p>
          </article>
        </div>

        <div className="kon-container mt-5">
          <article className="rounded-card-lg border border-mint-border bg-mint-surface p-6 sm:p-7">
            <h2 className="font-display text-lg font-bold text-pine sm:text-xl">
              {t("noExp.naslov")}
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-text-secondary">
              {t("noExp.lead")}
            </p>
          </article>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
