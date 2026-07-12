import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";
import { TourCard } from "@/components/TourCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbListLd } from "@/lib/breadcrumb-ld";

const SITE = "https://www.raftingkampkonak.com";
const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";
const HERO_IMG = "/images/hero-slike-konak";
const RAFTING_IMG = "/images/rafting";

const VALID_SLUGS = ["jednodnevni", "dvodnevni", "trodnevni", "cijela-tara"] as const;
type RaftingSlug = (typeof VALID_SLUGS)[number];

const TOUR_UNITS: Record<RaftingSlug, number> = {
  jednodnevni: 50,
  dvodnevni: 100,
  trodnevni: 140,
  "cijela-tara": 300,
};

interface ProgramItem {
  broj: number;
  label?: string;
  naslov: string;
  tekst: string;
}

interface PriceOption {
  label: string;
  price: string;
}

interface MenuItem {
  label?: string;
  tekst: string;
}

interface SimilarCard {
  href: string;
  naslov: string;
  opis: string;
  kicker: string;
  cijena: string;
  tag?: string;
  slika?: { src: string; alt: string };
  fakti?: { tekst: string }[];
}

interface TuraData {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  priceOptions: PriceOption[];
  unit: number;
  durationFact: string;
  stayFact: string;
  mealsFact: string;
  intro: string;
  introExtra?: string;
  program: ProgramItem[];
  menuTitle: string;
  menuItems: MenuItem[];
  menuNote?: string;
  canyonStay?: string;
  included: string[];
  notIncluded: string[];
  notesExtra: string[];
  similar: SimilarCard[];
  cardKicker: string;
  cardCijena: string;
  metaTitle: string;
  metaDescription: string;
}

interface SimilarStatic {
  href: string;
  slika?: { src: string; alt: string };
}

const SIMILAR_STATIC: Record<RaftingSlug, SimilarStatic[]> = {
  jednodnevni: [
    { href: "/rafting/dvodnevni", slika: { src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`, alt: "Dvodnevni rafting" } },
    { href: "/rafting/trodnevni", slika: { src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`, alt: "Trodnevni rafting" } },
    { href: "/kanjoning/hrcavka" },
  ],
  dvodnevni: [
    { href: "/rafting/jednodnevni", slika: { src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`, alt: "Jednodnevni rafting" } },
    { href: "/rafting/trodnevni", slika: { src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`, alt: "Trodnevni rafting" } },
    { href: "/rafting/cijela-tara", slika: { src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`, alt: "Rafting cijelim tokom" } },
  ],
  trodnevni: [
    { href: "/rafting/dvodnevni", slika: { src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`, alt: "Dvodnevni rafting" } },
    { href: "/rafting/cijela-tara", slika: { src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`, alt: "Rafting cijelim tokom" } },
    { href: "/kanjoning/hrcavka" },
  ],
  "cijela-tara": [
    { href: "/rafting/trodnevni", slika: { src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`, alt: "Trodnevni rafting" } },
    { href: "/kanjoning/nevidio" },
    { href: "/rafting/dvodnevni", slika: { src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`, alt: "Dvodnevni rafting" } },
  ],
};

const TURA_IMAGES: Record<
  RaftingSlug,
  { hero: { src: string; alt: string }; gallery: { src: string; alt: string }[] }
> = {
  jednodnevni: {
    hero: { src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`, alt: "Jednodnevni rafting na Tari" },
    gallery: [
      { src: `${RAFTING_IMG}/rafting-galerija1.jpg`, alt: "Jednodnevni rafting — spust kroz kanjon Tare" },
      { src: `${RAFTING_IMG}/rafting-galerija2.jpg`, alt: "Jednodnevni rafting — čamac na Tari" },
      { src: `${RAFTING_IMG}/rafting-galerija3.jpg`, alt: "Jednodnevni rafting — kupanje u smaragdnoj vodi" },
    ],
  },
  dvodnevni: {
    hero: { src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`, alt: "Dvodnevni rafting na Tari" },
    gallery: [
      { src: `${RAFTING_IMG}/rafting-galerija4.jpg`, alt: "Dvodnevni rafting — kamp i noćenje uz Taru" },
      { src: `${RAFTING_IMG}/rafting-galerija5.jpg`, alt: "Dvodnevni rafting — spust niz bukove" },
      { src: `${RAFTING_IMG}/rafting-galerija6.jpg`, alt: "Dvodnevni rafting — druženje u kampu" },
    ],
  },
  trodnevni: {
    hero: { src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`, alt: "Trodnevni rafting na Tari" },
    gallery: [
      { src: `${RAFTING_IMG}/rafting-galerija7.jpg`, alt: "Trodnevni rafting — dionica Brštanovica" },
      { src: `${RAFTING_IMG}/rafting-galerija8.jpg`, alt: "Trodnevni rafting — grupa na Tari" },
      { src: `${RAFTING_IMG}/rafting-galerija9.jpg`, alt: "Trodnevni rafting — večer u kampu Konak" },
    ],
  },
  "cijela-tara": {
    hero: { src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`, alt: "Rafting cijelim tokom Tare" },
    gallery: [
      { src: `${RAFTING_IMG}/rafting-galerija12.jpg`, alt: "Cijela Tara — gornji tok i kanjon" },
      { src: `${RAFTING_IMG}/rafting-galerija14.jpg`, alt: "Cijela Tara — ekspedicija niz rijeku" },
      { src: `${RAFTING_IMG}/rafting-galerija16.jpg`, alt: "Cijela Tara — dolazak u Hum" },
    ],
  },
};

function buildRaftingTour(
  tura: RaftingSlug,
  tTD: Awaited<ReturnType<typeof getTranslations>>,
): TuraData {
  const raw = tTD.raw(`tours.${tura}`) as Record<string, string>;

  const program: ProgramItem[] = [];
  for (let i = 1; i <= 6; i++) {
    if (!raw[`p${i}Title`]) break;
    program.push({
      broj: i,
      label: raw[`p${i}Label`] || undefined,
      naslov: raw[`p${i}Title`],
      tekst: raw[`p${i}Text`],
    });
  }

  const menuItems: MenuItem[] = [];
  for (let i = 1; i <= 8; i++) {
    if (!raw[`menu${i}Text`]) break;
    menuItems.push({
      label: raw[`menu${i}Label`] || undefined,
      tekst: raw[`menu${i}Text`],
    });
  }

  const included: string[] = [];
  for (let i = 1; i <= 12; i++) {
    if (!raw[`i${i}`]) break;
    included.push(raw[`i${i}`]);
  }

  const priceOptions: PriceOption[] = [];
  for (let i = 1; i <= 5; i++) {
    if (!raw[`priceOpt${i}`]) break;
    priceOptions.push({
      label: raw[`priceOpt${i}Label`],
      price: raw[`priceOpt${i}`],
    });
  }

  const notIncluded: string[] = [
    tTD("notIncludedBase.n1"),
    tTD("notIncludedBase.n2"),
  ];
  if (raw["notIncludedExtra"]) notIncluded.push(raw["notIncludedExtra"]);

  const notesExtra: string[] = [];
  for (let i = 1; i <= 3; i++) {
    if (!raw[`notesExtra${i}`]) break;
    notesExtra.push(raw[`notesExtra${i}`]);
  }

  const staticSimilar = SIMILAR_STATIC[tura] ?? [];
  const similar: SimilarCard[] = staticSimilar.map((stat, i) => {
    const n = i + 1;
    return {
      href: stat.href,
      naslov: raw[`similar${n}Title`] ?? "",
      opis: raw[`similar${n}Opis`] ?? "",
      kicker: raw[`similar${n}Kicker`] ?? "",
      cijena: raw[`similar${n}Cijena`] ?? "",
      tag: raw[`similar${n}Tag`] || undefined,
      slika: stat.slika,
    };
  });

  return {
    badge: raw["badge"],
    title: raw["title"],
    subtitle: raw["subtitle"],
    price: raw["price"],
    priceNote: raw["priceNote"],
    priceOptions,
    unit: TOUR_UNITS[tura],
    durationFact: raw["durationFact"],
    stayFact: raw["stayFact"],
    mealsFact: raw["mealsFact"],
    intro: raw["intro"],
    introExtra: raw["introExtra"] || undefined,
    program,
    menuTitle: raw["menuTitle"],
    menuItems,
    menuNote: raw["menuNote"] || undefined,
    canyonStay: raw["canyonStay"] || undefined,
    included,
    notIncluded,
    notesExtra,
    similar,
    cardKicker: "",
    cardCijena: "",
    metaTitle: raw["metaTitle"],
    metaDescription: raw["metaDescription"],
  };
}

export function generateStaticParams() {
  return VALID_SLUGS.map((tura) => ({ tura }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}): Promise<Metadata> {
  const { locale, tura } = await params;
  if (!VALID_SLUGS.includes(tura as RaftingSlug)) return {};
  const tTD = await getTranslations({ locale, namespace: "TuraDetalj" });
  const raw = tTD.raw(`tours.${tura}`) as Record<string, string>;
  return {
    title: { absolute: raw["metaTitle"] },
    description: raw["metaDescription"],
    keywords: ["rafting Tara", "rafting na Tari", raw["title"]?.toLowerCase(), "rafting cijena", "rafting kamp Konak"].filter(Boolean) as string[],
    alternates: { canonical: `${SITE}/rafting/${tura}` },
    openGraph: {
      title: raw["title"],
      description: raw["subtitle"],
      type: "website",
    },
  };
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7v11M3 12h18v6M21 12v-1a3 3 0 0 0-3-3h-7v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="10.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
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

export default async function TuraDetaljPage({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}) {
  const { locale, tura } = await params;
  if (!VALID_SLUGS.includes(tura as RaftingSlug)) notFound();
  setRequestLocale(locale);

  const tTD = await getTranslations("TuraDetalj");
  const tc = await getTranslations("Common");
  const tf = await getTranslations("Forms");
  const tn = await getTranslations("Nav");

  const tour = buildRaftingTour(tura as RaftingSlug, tTD);
  const images = TURA_IMAGES[tura as RaftingSlug];

  const notesSharedRaw = tTD.raw("notesShared") as Record<string, string>;
  const NOTES_SHARED = Object.values(notesSharedRaw);
  const notes = [...NOTES_SHARED, ...tour.notesExtra];

  const faqRaw = tTD.raw("faqShared") as Record<string, string>;
  const FAQ: { pitanje: string; odgovor: string }[] = [];
  for (let i = 1; i <= 10; i++) {
    if (!faqRaw[`q${i}`]) break;
    FAQ.push({ pitanje: faqRaw[`q${i}`], odgovor: faqRaw[`a${i}`] });
  }

  const crumbs = [
    { label: tc("homeCrumb"), href: "/" },
    { label: tn("offer"), href: "/ponuda" },
    { label: tour.title, href: `/rafting/${tura}` },
  ];

  const waText = encodeURIComponent(
    tTD("ui.waTemplate", { title: tour.title, price: tour.price }),
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit: ${tour.title}`,
  )}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.subtitle,
    brand: { "@type": "Organization", name: "Rafting kamp Konak" },
    offers: {
      "@type": "Offer",
      price: tour.unit,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/rafting/${tura}`,
    },
  };

  const crumbsLd = breadcrumbListLd(crumbs, SITE);

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <Hero
        variant="b"
        eyebrow={tour.badge}
        naslov={tour.title}
        lead={tour.subtitle}
        nazadLink={{ href: "/rafting", label: tc("backAllRafting") }}
        slika={images.hero}
      />

      <section className="kon-section">
        <div className="kon-container kon-td-grid">
          <div>
            <div className="kon-td-facts">
              {[
                { label: tc("duration"), value: tour.durationFact, icon: <IconClock /> },
                { label: tc("stay"), value: tour.stayFact, icon: <IconBed /> },
                { label: tc("meals"), value: tour.mealsFact, icon: <IconMeal /> },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-card border border-line bg-surface p-6"
                >
                  <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-mint-surface text-teal">
                    {f.icon}
                  </span>
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
                    {f.label}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold text-ink">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-8 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.7 }}
            >
              {tour.intro}
            </p>
            {tour.introExtra && (
              <p
                className="mt-4 font-sans font-semibold text-ink"
                style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
              >
                {tour.introExtra}
              </p>
            )}

            <h2 className="mt-10 font-display text-2xl font-extrabold text-pine">
              {tTD("ui.schedule")}
            </h2>
            <ol className="mt-6">
              {tour.program.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine font-display text-base font-bold text-white">
                      {p.broj}
                    </span>
                    {i < tour.program.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />
                    )}
                  </div>
                  <div className={i < tour.program.length - 1 ? "pb-7" : ""}>
                    {p.label && (
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal">
                        {p.label}
                      </span>
                    )}
                    <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                      {p.naslov}
                    </h3>
                    <p className="mt-1.5 max-w-xl font-sans text-[15px] leading-[1.65] text-text-secondary">
                      {p.tekst}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {tour.canyonStay && (
              <div className="mt-10 rounded-card border border-mint-border bg-mint-surface p-6">
                <h3 className="font-display text-lg font-extrabold text-pine">
                  {tTD("ui.canyonStay")}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.65] text-body">
                  {tour.canyonStay}
                </p>
              </div>
            )}

            <div className="mt-10 rounded-card-lg border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-pine">
                {tour.menuTitle}
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {tour.menuItems.map((item, i) => (
                  <div key={i}>
                    {item.label && (
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
                        {item.label}
                      </span>
                    )}
                    <p
                      className={`font-sans text-[15px] leading-[1.65] text-body ${
                        item.label ? "mt-1.5" : ""
                      }`}
                    >
                      {item.tekst}
                    </p>
                  </div>
                ))}
              </div>
              {tour.menuNote && (
                <p className="mt-5 font-sans text-sm italic text-text-secondary">
                  {tour.menuNote}
                </p>
              )}
            </div>
          </div>

          <aside className="kon-td-side">
            <div className="rounded-card-lg bg-pine p-7 text-on-dark">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal-light">
                {tc("pricePerPerson")}
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-white">
                  {tour.price}
                </span>
              </div>
              <p className="mt-1 font-sans text-sm text-on-dark-muted">
                {tour.priceNote}
              </p>

              <ul className="mt-4 flex flex-col gap-2 rounded-input bg-white/8 p-3.5">
                {tour.priceOptions.map((opt) => (
                  <li
                    key={opt.label}
                    className="flex items-baseline justify-between gap-3 font-sans text-sm"
                  >
                    <span className="text-on-dark-muted">{opt.label}</span>
                    <span className="font-display text-base font-bold text-white">
                      {opt.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-white/12" />

              <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal-light">
                {tTD("ui.included")}
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tour.included.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2.5 font-sans text-sm text-on-dark"
                  >
                    <span className="mt-0.5 text-teal-light">
                      <IconCheck />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>

              <span className="mt-6 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-on-dark-muted">
                {tTD("ui.notIncluded")}
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {tour.notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 font-sans text-sm text-on-dark-muted"
                  >
                    <span className="mt-0.5 opacity-70">
                      <IconX />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2.5">
                <CtaButton href={waHref} variant="primary" className="w-full">
                  {tf("whatsappCta")}
                </CtaButton>
                <CtaButton href={mailHref} variant="ghost" className="w-full">
                  {tTD("ui.emailCta")}
                </CtaButton>
              </div>

              <p className="mt-4 font-sans text-xs leading-relaxed text-on-dark-muted">
                {tTD("ui.cashDisclaimer")}
              </p>

              <div className="mt-4 text-center">
                <Link
                  href="/rezervacija"
                  className="font-sans text-sm font-bold text-amber-light transition-colors hover:text-white"
                >
                  {tTD("ui.reserveOnline")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="kon-section pt-0">
        <div className="kon-container">
          <div className="rounded-card-lg border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-extrabold text-pine sm:text-2xl">
              {tTD("ui.notes")}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 font-sans text-[15px] leading-relaxed text-body"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                    aria-hidden="true"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={tTD("ui.galleryEyebrow")}
            naslov={tTD("ui.galleryTitle")}
            link={{ href: "/galerija", label: tTD("ui.galleryFull") }}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {images.gallery.map((g) => (
              <ImageSlot
                key={g.src}
                src={g.src}
                alt={g.alt}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={tTD("ui.similarEyebrow")}
            naslov={tTD("ui.similarTitle")}
            link={{ href: "/rafting", label: tc("backAllRafting") }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {tour.similar.map((card) => (
              <TourCard
                key={card.href}
                href={card.href}
                naslov={card.naslov}
                opis={card.opis}
                kicker={card.kicker}
                cijena={card.cijena}
                cijenaLabel={tc("from")}
                tag={card.tag ? tc("featuredTitle") : undefined}
                slika={card.slika}
                fakti={card.fakti}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container" style={{ maxWidth: "var(--container-narrow)" }}>
          <SectionHeader
            eyebrow={tTD("ui.faqEyebrow")}
            naslov={tTD("ui.faqTitle")}
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
    </>
  );
}
