import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";
import { ReviewCard } from "@/components/ReviewCard";
import { BlogCard } from "@/components/BlogCard";
import { FaqAccordion } from "@/components/FaqAccordion";

const IMG = "/images/hero-slike-konak";
const BLOG_IMG = "/images/blog-konak";
const GOOGLE_RATING = 5;
const GOOGLE_REVIEW_COUNT = 194;
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

const TOUR_META = [
  { key: "oneDay" as const, href: "/rafting/jednodnevni", cijena: "50€", featured: false, src: `${IMG}/raftingtarom-jednodnevni.jpg` },
  { key: "twoDay" as const, href: "/rafting/dvodnevni", cijena: "100€", featured: false, src: `${IMG}/raftingtarom-dvodnevni.jpg` },
  { key: "threeDay" as const, href: "/rafting/trodnevni", cijena: "140€", featured: true, src: `${IMG}/raftingtarom-trodnevni.jpg` },
  { key: "fourDay" as const, href: "/rafting/cijela-tara", cijena: "300€", featured: false, src: `${IMG}/raftingtarom-cetverodnevni.jpg` },
];

const BLOG_META = [
  { n: 1 as const, href: "/blog/kada-na-taru", src: `${BLOG_IMG}/blog-najbolje-vrijeme-rafting-konak.jpg` },
  { n: 2 as const, href: "/blog/sta-ponijeti-na-rafting", src: `${BLOG_IMG}/blog-sta-ponijeti-konak.jpg` },
  { n: 3 as const, href: "/blog/np-sutjeska-vodic", src: `${BLOG_IMG}/blog-np-sutjeska-konak.jpg` },
];

const RECENZIJE = [
  {
    tekst:
      "Don't know which words to use to describe my satisfaction, saying perfect, great or amazing is not enough. Camp is brand new, food is excellent, exceptional service by all means. Hosts are the best people who did everything to ensure good…",
    ime: "Dejan Misic",
    grad: "Google",
    ocjena: 5,
  },
  {
    tekst:
      "Beautiful camp, wonderful nature, excellent hosts and food. Tara and Drina are among the most beautiful rivers in the world.",
    ime: "Miodrag Banovacki",
    grad: "Google",
    ocjena: 5,
  },
  {
    tekst:
      "This is definitely the adventure my family will always remember. I highly recommend Camp Konak to all of my friends and family. Customer service is unmatched. Experience these guys have is unheard of. My family is coming back for more fun. Thank you camp Konak for everything you have done to make our vacation pleasant and memorable.",
    ime: "MAPA REALTY NW",
    grad: "Google",
    ocjena: 5,
  },
];

function IconStar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8-4.3-4.1 5.9-.9L12 3Z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c4-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 3 7 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

function SlotLabel({ text }: { text: string }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: "var(--overlay-card)" }}
        aria-hidden="true"
      />
      <span className="absolute bottom-3 left-3 rounded-pill bg-white/15 px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
        {text}
      </span>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tc = await getTranslations("Common");

  const trustItems = [
    { title: t("intro.trust1Title"), desc: t("intro.trust1Desc") },
    { title: t("intro.trust2Title"), desc: t("intro.trust2Desc") },
    { title: t("intro.trust3Title"), desc: t("intro.trust3Desc") },
    { title: t("intro.trust4Title"), desc: t("intro.trust4Desc") },
  ];

  const whyStats = [
    { broj: t("why.stat1Num"), opis: t("why.stat1Desc") },
    { broj: t("why.stat2Num"), opis: t("why.stat2Desc") },
    { broj: t("why.stat3Num"), opis: t("why.stat3Desc") },
    { broj: t("why.stat4Num"), opis: t("why.stat4Desc") },
  ];

  const campChips = [
    t("camp.chip1"),
    t("camp.chip2"),
    t("camp.chip3"),
    t("camp.chip4"),
  ];

  const faqItems = Array.from({ length: 13 }, (_, i) => {
    const n = i + 1;
    return {
      pitanje: t(`faq.q${n}` as "faq.q1"),
      odgovor: t(`faq.a${n}` as "faq.a1"),
    };
  });

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rafting kamp Konak",
    url: "https://www.raftingkampkonak.com",
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hum",
      addressLocality: "Foča",
      postalCode: "73300",
      addressCountry: "BA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_RATING,
      bestRating: 5,
      reviewCount: GOOGLE_REVIEW_COUNT,
    },
    review: RECENZIJE.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.ime },
      reviewBody: r.tekst,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.ocjena,
        bestRating: 5,
      },
    })),
  };

  return (
    <>
      <Hero
        variant="a"
        eyebrow={t("hero.eyebrow")}
        slika={{
          src: `${IMG}/hero-pocetna.jpg`,
          alt: t("hero.imageAlt"),
        }}
        trust={[
          { icon: <IconStar />, label: tc("googleReviewsRated") },
          { icon: <IconShield />, label: tc("licensedSkippers") },
          { icon: <IconPin />, label: t("hero.trustLocation") },
        ]}
        naslov={
          <>
            {t("hero.title")}
            <br />
            <span className="text-teal-light">{t("hero.titleAccent")}</span>
          </>
        }
        lead={t("hero.lead")}
        cta={[
          { label: t("hero.ctaTours"), href: "/rafting", arrow: true },
          { label: t("hero.ctaPrice"), href: "/rezervacija", variant: "ghost" },
        ]}
      />

      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1.15fr .85fr" }}
        >
          <div>
            <SectionHeader
              eyebrow={t("intro.eyebrow")}
              naslov={
                <>
                  {t("intro.titleLine1")}
                  <br />
                  {t("intro.titleLine2")}
                </>
              }
            />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("intro.body")}
            </p>
          </div>

          <div className="rounded-card-lg border border-line bg-surface-warm p-7 shadow-soft sm:p-8">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-extrabold leading-none text-pine">
                {t("intro.years")}
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              {t("intro.yearsSub")}
            </p>

            <div className="my-6 h-px bg-line" />

            <ul className="flex flex-col gap-5">
              {trustItems.map((s) => (
                <li key={s.title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-mint-surface text-teal">
                    <IconCheck />
                  </span>
                  <span>
                    <span className="block font-sans text-[15px] font-bold text-ink">
                      {s.title}
                    </span>
                    <span className="block font-sans text-sm text-text-secondary">
                      {s.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("tours.eyebrow")}
            naslov={
              <>
                {t("tours.titleLine1")}
                <br />
                {t("tours.titleLine2")}
              </>
            }
            link={{ href: "/rafting", label: t("tours.linkAll") }}
          />

          <div className="kon-grid4 mt-10">
            {TOUR_META.map((tour) => (
              <TourCard
                key={tour.href}
                href={tour.href}
                kicker={t(`tours.${tour.key}.kicker`)}
                naslov={t(`tours.${tour.key}.title`)}
                tag={tour.featured ? tc("featuredTitle") : undefined}
                fakti={[
                  { tekst: t(`tours.${tour.key}.fact1`) },
                  { tekst: t(`tours.${tour.key}.fact2`) },
                  { tekst: t(`tours.${tour.key}.fact3`) },
                ]}
                cijena={tour.cijena}
                cijenaLabel={tc("from")}
                slika={{
                  src: tour.src,
                  alt: t(`tours.${tour.key}.alt`),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: ".85fr 1.15fr" }}
        >
          <div>
            <SectionHeader
              eyebrow={t("activities.eyebrow")}
              naslov={<>{t("activities.title")}</>}
            />
            <p
              className="mt-6 max-w-lg font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("activities.body")}
            </p>
            <div className="mt-8">
              <CtaButton href="/aktivnosti" variant="secondary" arrow>
                {t("activities.cta")}
              </CtaButton>
            </div>
          </div>

          <div className="grid min-h-[360px] grid-cols-2 grid-rows-2 gap-3 sm:min-h-[440px]">
            <ImageSlot
              src={`${IMG}/np-sutjeska-konak.webp`}
              alt={t("activities.altSutjeska")}
              className="row-span-2 h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text={t("activities.labelSutjeska")} />
            </ImageSlot>
            <ImageSlot
              src={`${IMG}/kanjoning-pocetna.jpg`}
              alt={t("activities.altCanyoning")}
              className="h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text={t("activities.labelCanyoning")} />
            </ImageSlot>
            <ImageSlot
              src={`${IMG}/izleti-konak.png`}
              alt={t("activities.altTrips")}
              className="h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text={t("activities.labelTrips")} />
            </ImageSlot>
          </div>
        </div>
      </section>

      <section className="kon-section" style={{ background: "var(--gradient-hero)" }}>
        <div className="kon-container kon-split">
          <div>
            <SectionHeader
              tone="dark"
              eyebrow={t("why.eyebrow")}
              naslov={
                <>
                  {t("why.titleLine1")}
                  <br />
                  {t("why.titleLine2")}
                </>
              }
            />
            <p
              className="mt-6 font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("why.p1Before")}
              <strong className="font-semibold text-white">{t("why.p1Strong")}</strong>
              {t("why.p1After")}
            </p>
            <p
              className="mt-4 font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("why.p2Before")}
              <strong className="font-semibold text-white">{t("why.p2Strong")}</strong>
              {t("why.p2After")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {whyStats.map((s) => (
              <div
                key={s.broj}
                className="rounded-card border border-white/12 bg-white/5 p-5 sm:p-6"
              >
                <span className="block font-display text-3xl font-extrabold leading-none text-teal-light sm:text-4xl">
                  {s.broj}
                </span>
                <span className="mt-2 block font-sans text-sm text-on-dark-muted">
                  {s.opis}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1.15fr .85fr" }}
        >
          <ImageSlot
            src={`${IMG}/smjestaj-konak-pocetna.jpg`}
            alt={t("camp.imageAlt")}
            className="aspect-[4/3] rounded-card-lg"
            sizes="(max-width: 960px) 100vw, 700px"
          >
            <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3.5 py-1.5 font-sans text-xs font-bold text-pine backdrop-blur-sm">
              {t("camp.badge")}
            </span>
          </ImageSlot>

          <div>
            <SectionHeader
              eyebrow={t("camp.eyebrow")}
              naslov={
                <>
                  {t("camp.titleLine1")}
                  <br />
                  {t("camp.titleLine2")}
                </>
              }
            />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              {t("camp.body")}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {campChips.map((c) => (
                <li
                  key={c}
                  className="rounded-pill border border-line-chip bg-surface px-4 py-2 font-sans text-sm font-semibold text-text-secondary"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CtaButton href="/kamp" variant="secondary" arrow>
                {t("camp.cta")}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                {t("reviews.eyebrow")}
              </span>
              <h2
                className="mt-3 font-display font-extrabold text-pine"
                style={{
                  fontSize: "clamp(30px, 4.5vw, 58px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                {t("reviews.title")}
              </h2>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2.5 rounded-pill border border-line bg-surface px-4 py-2.5 shadow-soft">
              <span className="flex gap-0.5 text-amber" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} />
                ))}
              </span>
              <span className="font-display text-lg font-bold text-ink">5.0</span>
              <span className="font-sans text-sm text-muted">
                · {GOOGLE_REVIEW_COUNT} {tc("googleReviews")}
              </span>
            </div>
          </div>

          <div className="kon-revs mt-10">
            {RECENZIJE.map((r) => (
              <ReviewCard
                key={r.ime}
                tekst={r.tekst}
                ime={r.ime}
                grad={r.grad}
                ocjena={r.ocjena}
              />
            ))}
          </div>

          <div className="mt-8">
            <CtaButton href={GOOGLE_MAPS_URL} variant="secondary" arrow>
              {t("reviews.cta")}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div
          className="kon-container"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <SectionHeader
            eyebrow={t("faq.eyebrow")}
            naslov={t("faq.title")}
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={faqItems} />
          </div>
          <p className="mt-8 text-center font-sans text-[15px] text-text-secondary">
            {t("faq.more")}{" "}
            <Link
              href="/kontakt"
              className="font-bold text-terracotta transition-colors hover:text-terracotta-hover"
            >
              {t("faq.writeUs")}
            </Link>
          </p>
        </div>
      </section>

      <section className="kon-section" style={{ background: "var(--gradient-hero)" }}>
        <div className="kon-container">
          <SectionHeader
            tone="dark"
            eyebrow={t("blog.eyebrow")}
            naslov={t("blog.title")}
            link={{ href: "/blog", label: tc("backAllArticles") }}
          />
          <div className="kon-blog mt-10">
            {BLOG_META.map((b) => (
              <BlogCard
                key={b.href}
                href={b.href}
                kategorija={t(`blog.cat${b.n}`)}
                naslov={t(`blog.title${b.n}`)}
                opis={t(`blog.desc${b.n}`)}
                slika={{
                  src: b.src,
                  alt: t(`blog.alt${b.n}`),
                }}
              />
            ))}
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
