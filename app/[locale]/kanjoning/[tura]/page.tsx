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

const VALID_SLUGS = ["nevidio", "hrcavka"] as const;
type CanyonSlug = (typeof VALID_SLUGS)[number];

const CANYON_UNITS: Record<CanyonSlug, number> = {
  nevidio: 130,
  hrcavka: 120,
};

const CANYON_CARD_STATIC: Record<CanyonSlug, { kicker: string; cijena: string }> = {
  nevidio: { kicker: "NEVIDIO · cijeli dan", cijena: "130€" },
  hrcavka: { kicker: "HRČAVKA · pola dana", cijena: "120€" },
};

const RELATED_RAFTING_STATIC = [
  {
    href: "/rafting/jednodnevni",
    kicker: "1 DAN · bez noćenja",
    cijena: "50€",
    slika: { src: "/images/hero-slike-konak/raftingtarom-jednodnevni.jpg", alt: "Jednodnevni rafting na Tari" },
  },
  {
    href: "/rafting/trodnevni",
    kicker: "3 DANA · 2 noćenja",
    cijena: "140€",
    slika: { src: "/images/hero-slike-konak/raftingtarom-trodnevni.jpg", alt: "Trodnevni rafting na Tari" },
  },
];

interface CanyonImages {
  hero: { src: string; alt: string };
  cardSlika: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
}

const CANYON_IMAGES: Record<CanyonSlug, CanyonImages> = {
  nevidio: {
    hero: { src: "/images/hero-slike-konak/kanjoning-pocetna.jpg", alt: "Kanjoning Nevidio — spust niz vodopad u kanjonu" },
    cardSlika: { src: "/images/hero-slike-konak/kanjoning-pocetna.jpg", alt: "Kanjoning Nevidio" },
    gallery: [
      { src: "/images/galerija/galerija13.jpg", alt: "Pauza uz tirkiznu rijeku u kanjonu" },
      { src: "/images/galerija/galerija14.jpg", alt: "Kupanje i avantura u kristalnoj vodi kanjona" },
      { src: "/images/rafting/rafting-galerija5.jpg", alt: "Stijene i zelenilo kanjona oko rijeke" },
    ],
  },
  hrcavka: {
    hero: { src: "/images/galerija/galerija15.jpg", alt: "Kanjoning Hrčavka — učesnici ispred vodopada u kanjonu" },
    cardSlika: { src: "/images/galerija/galerija15.jpg", alt: "Kanjoning Hrčavka" },
    gallery: [
      { src: "/images/galerija/galerija13.jpg", alt: "Kupanje i pauza u tirkiznoj vodi kanjona" },
      { src: "/images/galerija/galerija14.jpg", alt: "Porodična avantura u kristalnoj vodi uz opremu" },
      { src: "/images/rafting/rafting-galerija2.jpg", alt: "Stijene i zelenilo oko rijeke u kanjonu" },
    ],
  },
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

function buildCanyonTour(
  tura: CanyonSlug,
  tTD: Awaited<ReturnType<typeof getTranslations>>,
) {
  const raw = tTD.raw(`canyon.${tura}`) as Record<string, string>;

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

  const priceOptions: PriceOption[] = [];
  for (let i = 1; i <= 4; i++) {
    if (!raw[`priceOpt${i}`]) break;
    priceOptions.push({
      label: raw[`priceOpt${i}Label`],
      price: raw[`priceOpt${i}`],
    });
  }

  const included: string[] = [];
  for (let i = 1; i <= 10; i++) {
    if (!raw[`i${i}`]) break;
    included.push(raw[`i${i}`]);
  }

  const faq: { pitanje: string; odgovor: string }[] = [];
  for (let i = 1; i <= 6; i++) {
    if (!raw[`faq_q${i}`]) break;
    faq.push({ pitanje: raw[`faq_q${i}`], odgovor: raw[`faq_a${i}`] });
  }

  return {
    badge: raw["badge"],
    title: raw["title"],
    subtitle: raw["subtitle"],
    price: raw["price"],
    priceNote: raw["priceNote"],
    priceOptions,
    unit: CANYON_UNITS[tura],
    durationFact: raw["durationFact"],
    stayFact: raw["stayFact"],
    mealsFact: raw["mealsFact"],
    intro: raw["intro"],
    program,
    included,
    faq,
    galleryEyebrow: raw["galleryEyebrow"],
    galleryTitle: raw["galleryTitle"],
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
  if (!VALID_SLUGS.includes(tura as CanyonSlug)) return {};
  const tTD = await getTranslations({ locale, namespace: "TuraDetalj" });
  const raw = tTD.raw(`canyon.${tura}`) as Record<string, string>;
  return {
    title: { absolute: raw["metaTitle"] },
    description: raw["metaDescription"],
    keywords: ["kanjoning", raw["title"]?.toLowerCase(), "kanjoning Tara", "kanjoning kamp Konak"].filter(Boolean) as string[],
    alternates: { canonical: `${SITE}/kanjoning/${tura}` },
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

export default async function KanjoningTuraPage({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}) {
  const { locale, tura } = await params;
  if (!VALID_SLUGS.includes(tura as CanyonSlug)) notFound();
  setRequestLocale(locale);

  const tTD = await getTranslations("TuraDetalj");
  const tc = await getTranslations("Common");
  const tf = await getTranslations("Forms");
  const tn = await getTranslations("Nav");
  const tr = await getTranslations("Rafting");

  const tour = buildCanyonTour(tura as CanyonSlug, tTD);
  const images = CANYON_IMAGES[tura as CanyonSlug];

  const notIncluded: string[] = [
    tTD("notIncludedCanyon.n1"),
    tTD("notIncludedCanyon.n2"),
  ];

  const notesRaw = tTD.raw("notesCanyon") as Record<string, string>;
  const NOTES = Object.values(notesRaw);

  const crumbs = [
    { label: tc("homeCrumb"), href: "/" },
    { label: tn("offer"), href: "/ponuda" },
    { label: tour.title, href: `/kanjoning/${tura}` },
  ];

  const otherSlug = (tura === "nevidio" ? "hrcavka" : "nevidio") as CanyonSlug;
  const otherRaw = tTD.raw(`canyon.${otherSlug}`) as Record<string, string>;
  const raftingJRaw = tTD.raw("tours.jednodnevni") as Record<string, string>;
  const raftingTRaw = tTD.raw("tours.trodnevni") as Record<string, string>;

  const similar = [
    {
      href: `/kanjoning/${otherSlug}`,
      naslov: otherRaw["title"],
      opis: otherRaw["subtitle"],
      kicker: CANYON_CARD_STATIC[otherSlug].kicker,
      cijena: CANYON_CARD_STATIC[otherSlug].cijena,
      slika: CANYON_IMAGES[otherSlug].cardSlika,
      fakti: [{ tekst: otherRaw["durationFact"] }, { tekst: otherRaw["stayFact"] }] as { tekst: string }[],
    },
    {
      href: RELATED_RAFTING_STATIC[0].href,
      naslov: raftingJRaw["title"],
      opis: tr("cards.jednodnevni.description"),
      kicker: RELATED_RAFTING_STATIC[0].kicker,
      cijena: RELATED_RAFTING_STATIC[0].cijena,
      slika: RELATED_RAFTING_STATIC[0].slika,
      fakti: undefined as { tekst: string }[] | undefined,
    },
    {
      href: RELATED_RAFTING_STATIC[1].href,
      naslov: raftingTRaw["title"],
      opis: tr("cards.trodnevni.description"),
      kicker: RELATED_RAFTING_STATIC[1].kicker,
      cijena: RELATED_RAFTING_STATIC[1].cijena,
      slika: RELATED_RAFTING_STATIC[1].slika,
      fakti: undefined as { tekst: string }[] | undefined,
    },
  ];

  const waText = encodeURIComponent(
    tTD("ui.waTemplate", { title: tour.title, price: tour.price }),
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit: ${tour.title}`,
  )}`;

  const tripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.subtitle,
    touristType: "Adventure tourism",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Rafting kamp Konak",
      url: SITE,
    },
    offers: {
      "@type": "Offer",
      price: tour.unit,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/kanjoning/${tura}`,
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
        nazadLink={{ href: "/kanjoning", label: tc("backAllCanyoning") }}
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

            <h2 className="mt-10 font-display text-2xl font-extrabold text-pine">
              {tTD("ui.scheduleCanyon")}
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
                {notIncluded.map((item) => (
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
                {tTD("ui.cashDisclaimerCanyon")}
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
              {NOTES.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 font-sans text-[15px] leading-relaxed text-body"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
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
            eyebrow={tour.galleryEyebrow}
            naslov={tour.galleryTitle}
            link={{ href: "/galerija", label: tTD("ui.galleryFull") }}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {images.gallery.map((img) => (
              <ImageSlot
                key={img.src}
                src={img.src}
                alt={img.alt}
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
            link={{ href: "/ponuda", label: tTD("ui.similarAllOffer") }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {similar.map((card) => (
              <TourCard
                key={card.href}
                href={card.href}
                naslov={card.naslov}
                opis={card.opis}
                kicker={card.kicker}
                cijena={card.cijena}
                cijenaLabel={tc("from")}
                slika={"slika" in card ? card.slika : undefined}
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
            <FaqAccordion items={tour.faq} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
    </>
  );
}
