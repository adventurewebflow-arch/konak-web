import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";
import { GallerySlider } from "@/components/GallerySlider";
import { FaqAccordion } from "@/components/FaqAccordion";

const SITE = "https://www.raftingkampkonak.com";
const HERO_IMG = "/images/hero-slike-konak";
const RAFTING_IMG = "/images/rafting";

function IconGear() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGuide() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMeal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 3c-1.7 0-3 2-3 4.5S15.3 12 17 12v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 2.5V11c0 4.6-3 8-7 9.5C8 19 5 15.6 5 11V5.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
  const tr = await getTranslations({ locale, namespace: "Rafting" });

  return {
    title: { absolute: tr("meta.title") },
    description: tr("meta.description"),
    keywords: tr("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/rafting` },
    openGraph: {
      title: tr("meta.ogTitle"),
      description: tr("meta.ogDescription"),
      type: "website",
    },
  };
}

export default async function RaftingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tr = await getTranslations("Rafting");
  const tc = await getTranslations("Common");

  const TURE = [
    {
      href: "/rafting/jednodnevni",
      kicker: tr("cards.jednodnevni.kicker"),
      naslov: tr("cards.jednodnevni.title"),
      opis: tr("cards.jednodnevni.description"),
      cijena: "50€",
      cijenaLabel: tc("from"),
      obrnuto: false,
      slika: {
        src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`,
        alt: tr("cards.jednodnevni.imageAlt"),
      },
    },
    {
      href: "/rafting/dvodnevni",
      kicker: tr("cards.dvodnevni.kicker"),
      naslov: tr("cards.dvodnevni.title"),
      opis: tr("cards.dvodnevni.description"),
      cijena: "100€",
      cijenaLabel: tc("from"),
      obrnuto: true,
      slika: {
        src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
        alt: tr("cards.dvodnevni.imageAlt"),
      },
    },
    {
      href: "/rafting/trodnevni",
      kicker: tr("cards.trodnevni.kicker"),
      naslov: tr("cards.trodnevni.title"),
      opis: tr("cards.trodnevni.description"),
      cijena: "140€",
      cijenaLabel: tc("from"),
      tag: tr("cards.trodnevni.tag"),
      obrnuto: false,
      slika: {
        src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
        alt: tr("cards.trodnevni.imageAlt"),
      },
    },
    {
      href: "/rafting/cijela-tara",
      kicker: tr("cards.cijelaTara.kicker"),
      naslov: tr("cards.cijelaTara.title"),
      opis: tr("cards.cijelaTara.description"),
      cijena: "300€",
      cijenaLabel: tc("from"),
      tamna: true,
      obrnuto: true,
      slika: {
        src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
        alt: tr("cards.cijelaTara.imageAlt"),
      },
    },
  ];

  const UKLJUCENO: { naslov: string; opis: string; ikona: ReactNode }[] = [
    {
      naslov: tr("included.gearTitle"),
      opis: tr("included.gearDesc"),
      ikona: <IconGear />,
    },
    {
      naslov: tr("included.guideTitle"),
      opis: tr("included.guideDesc"),
      ikona: <IconGuide />,
    },
    {
      naslov: tr("included.mealsTitle"),
      opis: tr("included.mealsDesc"),
      ikona: <IconMeal />,
    },
    {
      naslov: tr("included.feesTitle"),
      opis: tr("included.feesDesc"),
      ikona: <IconShield />,
    },
  ];

  const UKLJUCENO_TRAKA = [
    tr("included.strip1"),
    tr("included.strip2"),
    tr("included.strip3"),
    tr("included.strip4"),
  ];

  const FAQ = [
    { pitanje: tr("faq.q1"), odgovor: tr("faq.a1") },
    { pitanje: tr("faq.q2"), odgovor: tr("faq.a2") },
    { pitanje: tr("faq.q3"), odgovor: tr("faq.a3") },
    { pitanje: tr("faq.q4"), odgovor: tr("faq.a4") },
    { pitanje: tr("faq.q5"), odgovor: tr("faq.a5") },
  ];

  const GALERIJA_TEASER = [
    {
      href: "/galerija",
      src: `${RAFTING_IMG}/rafting-galerija1.jpg`,
      alt: tr("gallery.alt1"),
    },
    {
      href: "/galerija",
      src: `${RAFTING_IMG}/rafting-galerija7.jpg`,
      alt: tr("gallery.alt2"),
    },
    {
      href: "/galerija",
      src: `${RAFTING_IMG}/rafting-galerija12.jpg`,
      alt: tr("gallery.alt3"),
    },
    {
      href: "/galerija",
      src: `${RAFTING_IMG}/rafting-galerija16.jpg`,
      alt: tr("gallery.alt4"),
    },
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TURE.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${t.href}`,
      name: t.naslov,
    })),
  };

  return (
    <>
      {/* Hero */}
      <Hero
        variant="b"
        visina="60vh"
        eyebrow={tr("hero.eyebrow")}
        naslov={tr("hero.title")}
        lead={tr("hero.lead")}
        slika={{
          src: `${RAFTING_IMG}/rafting-hero.jpg`,
          alt: tr("hero.imageAlt"),
        }}
      />

      {/* Tour cards */}
      <section className="kon-section">
        <div className="kon-container flex flex-col gap-6">
          {TURE.map((t) => (
            <TourCard
              key={t.href}
              varijanta="red"
              href={t.href}
              kicker={t.kicker}
              naslov={t.naslov}
              opis={t.opis}
              cijena={t.cijena}
              cijenaLabel={t.cijenaLabel}
              tag={t.tag}
              tamna={t.tamna}
              obrnuto={t.obrnuto}
              slika={t.slika}
            />
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={tr("included.eyebrow")}
            naslov={tr("included.title")}
          />

          <div className="kon-incl mt-10">
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

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 rounded-card border border-line bg-surface px-6 py-4">
            {UKLJUCENO_TRAKA.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-text-secondary"
              >
                <span className="text-amber">
                  <IconDot />
                </span>
                {t}
              </li>
            ))}
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
            {tr("cta.title")}
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            {tr("cta.body")}
          </p>
          <div className="mt-8">
            <CtaButton href="/rezervacija" arrow>
              {tr("cta.button")}
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={tr("gallery.eyebrow")}
            naslov={tr("gallery.title")}
            link={{ href: "/galerija", label: tr("gallery.link") }}
          />

          <div className="mt-10">
            <GallerySlider
              label={tr("gallery.sliderLabel")}
              items={GALERIJA_TEASER}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="kon-section">
        <div
          className="kon-container"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <SectionHeader
            eyebrow={tr("faq.eyebrow")}
            naslov={tr("faq.title")}
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={FAQ} />
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
