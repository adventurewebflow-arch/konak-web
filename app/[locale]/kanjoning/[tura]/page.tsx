import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";
import { TourCard } from "@/components/TourCard";
import { Breadcrumbs, breadcrumbListLd } from "@/components/Breadcrumbs";

const SITE = "https://www.raftingkampkonak.com";
const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";

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
  program: ProgramItem[];
  included: string[];
  cardKicker: string;
  cardCijena: string;
  hero: { src: string; alt: string };
  cardSlika: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  faq: { pitanje: string; odgovor: string }[];
  metaTitle: string;
  metaDescription: string;
  galleryEyebrow: string;
  galleryTitle: string;
}

/** Generički tekst — Petar ubacuje finalni. */
const NOT_INCLUDED = ["Piće u restoranu", "Lični troškovi"];

const NOTES = [
  "Nema minimalnog broja učesnika — vodimo i parove i pojedince. Možete se priključiti postojećoj grupi.",
  "Uzrast: pogodno za većinu uzrasta; djeca uz pratnju odraslih.",
  "Prethodno iskustvo nije potrebno — obuka je uključena prije spusta.",
  "Plaćanje: avans pri rezervaciji, ostatak u kampu (gotovina ili kartica).",
  "Dokumenti: lična karta ili pasoš (obavezno za sve učesnike).",
  "Zadržavamo pravo procjene vremenskih uslova i prilagođavanja programa radi bezbjednosti.",
];

const RELATED_RAFTING = [
  {
    href: "/rafting/jednodnevni",
    naslov: "Jednodnevni rafting",
    opis: "Spust uz ručak i stajanja za kupanje u srcu kanjona.",
    kicker: "1 DAN · bez noćenja",
    cijena: "50€",
    slika: {
      src: "/images/hero-slike-konak/raftingtarom-jednodnevni.jpg",
      alt: "Jednodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/trodnevni",
    naslov: "Trodnevni aranžman",
    opis: "Najpopularniji aranžman: rafting, relax i dvije večeri u kampu.",
    kicker: "3 DANA · 2 noćenja",
    cijena: "140€",
    slika: {
      src: "/images/hero-slike-konak/raftingtarom-trodnevni.jpg",
      alt: "Trodnevni rafting na Tari",
    },
  },
];

// Podaci iz page-kanjoning.md + page-aktivnosti.md; cijene potvrđene u Task 12/13.
const TURE: Record<string, TuraData> = {
  nevidio: {
    badge: "NEVIDIO · CRNA GORA · zahtjevno · jun–okt",
    title: "Kanjoning Nevidio",
    subtitle:
      "Najzahtjevniji kanjon Crne Gore — rijeka Komarnica ispod Durmitora. Skokovi, spustovi i plivanje kroz uske prolaze, za prave avanturiste.",
    price: "od 130€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Radni dan", price: "130€" },
      { label: "Vikend", price: "140€" },
    ],
    unit: 130,
    durationFact: "Cijeli dan",
    stayFact: "bez noćenja",
    mealsFact: "1 (ručak)",
    intro:
      "Najljepši i najzahtjevniji kanjon u okolini — skokovi, spuštanje uz vodu i plivanje kroz uske prolaze rijeke Komarnice ispod Durmitora. Organizujemo cjelodnevni izlet sa iskusnim vodičem, kompletnom opremom i prevozom iz kampa. Sezona jun–okt.",
    program: [
      {
        broj: 1,
        label: "JUTRO",
        naslov: "Doček i oprema",
        tekst:
          "Dočekujemo vas u kampu i podešavamo kompletnu opremu: neopren, prsluk, kacigu i karabinjere. Prije polaska svi prolaze kratku sigurnosnu obuku sa licenciranim vodičem.",
      },
      {
        broj: 2,
        label: "POLAZAK",
        naslov: "Prevoz do kanjona Komarnice",
        tekst:
          "Organizovanim prevozom krećemo prema kanjonu Nevidio u Crnoj Gori, ispod masiva Durmitora. Vožnja kroz planinske predele uvodi vas u atmosferu avanture.",
      },
      {
        broj: 3,
        label: "KANJON",
        naslov: "Skokovi, spustovi i prolaz",
        tekst:
          "S vodičem ulazite u kanjon i prolazite kroz uske dionice sa skokovima, prirodnim toboganima i plivanjem u smaragdnoj vodi. Tempo je prilagođen grupi, ali kanjon zahtijeva dobru kondiciju.",
      },
      {
        broj: 4,
        label: "POVRATAK",
        naslov: "Ručak i povratak u kamp",
        tekst:
          "Po izlasku iz kanjona slijedi ručak i predah prije povratka u kamp Konak. Veče provodite uz rijeku sa uspomenama sa najzahtjevnijeg kanjona u okolini.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani vodič",
      "Prevoz do kanjona",
      "Ručak",
      "Osiguranje",
    ],
    cardKicker: "NEVIDIO · cijeli dan",
    cardCijena: "130€",
    hero: {
      src: "/images/hero-slike-konak/kanjoning-pocetna.jpg",
      alt: "Kanjoning Nevidio — spust niz vodopad u kanjonu",
    },
    cardSlika: {
      src: "/images/hero-slike-konak/kanjoning-pocetna.jpg",
      alt: "Kanjoning Nevidio — spust niz vodopad u kanjonu",
    },
    gallery: [
      {
        src: "/images/galerija/galerija13.jpg",
        alt: "Pauza uz tirkiznu rijeku u kanjonu",
      },
      {
        src: "/images/galerija/galerija14.jpg",
        alt: "Kupanje i avantura u kristalnoj vodi kanjona",
      },
      {
        src: "/images/rafting/rafting-galerija5.jpg",
        alt: "Stijene i zelenilo kanjona oko rijeke",
      },
    ],
    faq: [
      {
        pitanje: "Da li je Nevidio za početnike?",
        odgovor:
          "Nevidio je najzahtjevniji kanjon u okolini i namijenjen iskusnijim avanturistima. Za prvi kanjoning preporučujemo Hrčavku — pitomiji kanjon u NP Sutjeska.",
      },
      {
        pitanje: "Šta je uključeno u cijenu?",
        odgovor:
          "Kompletna oprema, licencirani vodič, prevoz do kanjona, ručak i osiguranje. Sve je organizovano iz kampa — bez skrivenih troškova.",
      },
      {
        pitanje: "Kako se primjenjuje vikend cijena?",
        odgovor:
          "Vikend cijena važi za subotu i nedjelju. Cijena se automatski prilagodi datumu koji izaberete u rezervaciji.",
      },
      {
        pitanje: "Da li treba znati plivati?",
        odgovor:
          "Plivanje nije neophodno, ali preporučljivo je osnovno znanje plivanja i dobra fizička kondicija zbog zahtjevnosti kanjona i dužine ture.",
      },
      {
        pitanje: "Kada je sezona za kanjoning Nevidio?",
        odgovor:
          "Kanjoning Nevidio organizujemo od juna do oktobra, kada su uvjeti u kanjonu najpovoljniji i sigurni za vođenje grupa.",
      },
    ],
    metaTitle: "Kanjoning Nevidio — od 130€ | Rafting kamp Konak",
    metaDescription:
      "Kanjoning Nevidio (kanjon Komarnice, Durmitor): najzahtjevniji kanjon Crne Gore. Skokovi, spustovi i plivanje uz licenciranog vodiča. Radni dan od 130€, vikend 140€.",
    galleryEyebrow: "Iz kanjona",
    galleryTitle: "Trenuci iz Nevidia",
  },
  hrcavka: {
    badge: "HRČAVKA · NP SUTJESKA · pristupačno · jun–okt",
    title: "Kanjoning Hrčavka",
    subtitle:
      "Pitomiji kanjon u Nacionalnom parku Sutjeska, kod Tjentišta — idealan za prvi susret sa kanjoningom. Skokovi u bazene i prirodni tobogani.",
    price: "od 120€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Radni dan", price: "120€" },
      { label: "Vikend", price: "130€" },
    ],
    unit: 120,
    durationFact: "Pola dana",
    stayFact: "bez noćenja",
    mealsFact: "nije uključeno",
    intro:
      "Pitomiji kanjon nadomak kampa, idealan za prvi susret sa kanjoningom. U Nacionalnom parku Sutjeska, kod Tjentišta, čekaju vas skokovi u smaragdne bazene i prirodni tobogani uz iskusnog vodiča. Sezona jun–okt.",
    program: [
      {
        broj: 1,
        label: "JUTRO",
        naslov: "Doček i oprema",
        tekst:
          "Dočekujemo vas u kampu i podešavamo opremu: neopren, prsluk, kacigu i karabinjere. Vodič objašnjava tehniku kretanja kroz kanjon i sigurnosna pravila.",
      },
      {
        broj: 2,
        label: "POLAZAK",
        naslov: "Vožnja do NP Sutjeska",
        tekst:
          "Kratkim prevozom stižemo do kanjona Hrčavka kod Tjentišta, u srcu Nacionalnog parka Sutjeska. Usput uživate u planinskim pejzažima prije ulaska u kanjon.",
      },
      {
        broj: 3,
        label: "KANJON",
        naslov: "Skokovi i prirodni tobogani",
        tekst:
          "Uz vodiča prolazite kroz kanjon sa skokovima u smaragdne bazene i prirodnim toboganima. Tempo je prilagođen grupi — idealno i za one koji prvi put ulaze u kanjon.",
      },
      {
        broj: 4,
        label: "POVRATAK",
        naslov: "Izlazak i povratak u kamp",
        tekst:
          "Po završetku avanture vraćamo se u kamp Konak. Ostatak dana možete posvetiti opuštanju uz rijeku ili kombinovati sa drugim aktivnostima.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani vodič",
      "Prevoz do kanjona",
      "Osiguranje",
    ],
    cardKicker: "HRČAVKA · pola dana",
    cardCijena: "120€",
    hero: {
      src: "/images/galerija/galerija15.jpg",
      alt: "Kanjoning Hrčavka — učesnici ispred vodopada u kanjonu",
    },
    cardSlika: {
      src: "/images/galerija/galerija15.jpg",
      alt: "Kanjoning Hrčavka — učesnici ispred vodopada u kanjonu",
    },
    gallery: [
      {
        src: "/images/galerija/galerija13.jpg",
        alt: "Kupanje i pauza u tirkiznoj vodi kanjona",
      },
      {
        src: "/images/galerija/galerija14.jpg",
        alt: "Porodična avantura u kristalnoj vodi uz opremu",
      },
      {
        src: "/images/rafting/rafting-galerija2.jpg",
        alt: "Stijene i zelenilo oko rijeke u kanjonu",
      },
    ],
    faq: [
      {
        pitanje: "Je li Hrčavka dobra za prvi kanjoning?",
        odgovor:
          "Da — Hrčavka je pitomiji kanjon u NP Sutjeska i jedan od najboljih izbora za prvi susret sa kanjoningom. Skokovi i tobogani su prilagođeni i početnicima.",
      },
      {
        pitanje: "Šta je uključeno u cijenu?",
        odgovor:
          "Kompletna oprema, licencirani vodič, prevoz do kanjona i osiguranje. Obrok nije uključen — možete ga dodati uz boravak u kampu.",
      },
      {
        pitanje: "Kako se primjenjuje vikend cijena?",
        odgovor:
          "Vikend cijena važi za subotu i nedjelju. Cijena se automatski prilagodi datumu koji izaberete u rezervaciji.",
      },
      {
        pitanje: "Da li treba znati plivati?",
        odgovor:
          "Nije neophodno. Svi nose prsluk i kacigu, a vodič vodi grupu kroz kanjon. Dovoljno je da se ne plašite vode i slušate uputstva.",
      },
      {
        pitanje: "Kada je sezona za kanjoning Hrčavka?",
        odgovor:
          "Kanjoning Hrčavka organizujemo od juna do oktobra, u periodu kada je nivo vode u kanjonu idealan za siguran i ugodan spust.",
      },
    ],
    metaTitle: "Kanjoning Hrčavka — od 120€ | Rafting kamp Konak",
    metaDescription:
      "Kanjoning Hrčavka u NP Sutjeska (Tjentište): pitomiji kanjon idealan za početnike. Skokovi u bazene i prirodni tobogani. Radni dan od 120€, vikend 130€.",
    galleryEyebrow: "Iz kanjona",
    galleryTitle: "Trenuci iz Hrčavke",
  },
};

export function generateStaticParams() {
  return Object.keys(TURE).map((tura) => ({ tura }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}): Promise<Metadata> {
  const { tura } = await params;
  const t = TURE[tura];
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [
      "kanjoning",
      t.title.toLowerCase(),
      "kanjoning Tara",
      "kanjoning kamp Konak",
    ],
    alternates: { canonical: `${SITE}/kanjoning/${tura}` },
    openGraph: {
      title: t.title,
      description: t.subtitle,
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
  const t = TURE[tura];
  if (!t) notFound();
  setRequestLocale(locale);

  const crumbs = [
    { label: "Naslovna", href: "/" },
    { label: "Ponuda", href: "/ponuda" },
    { label: t.title, href: `/kanjoning/${tura}` },
  ];

  const otherKanjoning = Object.entries(TURE)
    .filter(([slug]) => slug !== tura)
    .map(([slug, data]) => ({
      href: `/kanjoning/${slug}`,
      naslov: data.title,
      opis: data.subtitle,
      kicker: data.cardKicker,
      cijena: data.cardCijena,
      slika: data.cardSlika,
      fakti: [{ tekst: data.durationFact }, { tekst: data.stayFact }],
    }));

  const similar = [
    ...otherKanjoning,
    ...RELATED_RAFTING.map((r) => ({ ...r, fakti: undefined as { tekst: string }[] | undefined })),
  ].slice(0, 3);

  const waText = encodeURIComponent(
    `Zdravo! Zanima me ${t.title} (${t.price}). Molim vas slobodne termine i detalje.`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit: ${t.title}`,
  )}`;

  const tripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.title,
    description: t.subtitle,
    touristType: "Adventure tourism",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Rafting kamp Konak",
      url: SITE,
    },
    offers: {
      "@type": "Offer",
      price: t.unit,
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
        eyebrow={t.badge}
        naslov={t.title}
        lead={t.subtitle}
        nazadLink={{ href: "/kanjoning", label: "Svi kanjoning izleti" }}
        slika={t.hero}
      />

      <section className="kon-section">
        <div className="kon-container kon-td-grid">
          <div>
            <div className="kon-td-facts">
              {[
                { label: "TRAJANJE", value: t.durationFact, icon: <IconClock /> },
                { label: "SMEŠTAJ", value: t.stayFact, icon: <IconBed /> },
                { label: "OBROCI", value: t.mealsFact, icon: <IconMeal /> },
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
              {t.intro}
            </p>

            <h2 className="mt-10 font-display text-2xl font-extrabold text-pine">
              Program ture
            </h2>
            <ol className="mt-6">
              {t.program.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine font-display text-base font-bold text-white">
                      {p.broj}
                    </span>
                    {i < t.program.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />
                    )}
                  </div>
                  <div className={i < t.program.length - 1 ? "pb-7" : ""}>
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
                Cijena / osobi
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-white">
                  {t.price}
                </span>
              </div>
              <p className="mt-1 font-sans text-sm text-on-dark-muted">
                {t.priceNote}
              </p>

              <ul className="mt-4 flex flex-col gap-2 rounded-input bg-white/8 p-3.5">
                {t.priceOptions.map((opt) => (
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
                U cijenu uključeno
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.included.map((inc) => (
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
                Nije uključeno
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {NOT_INCLUDED.map((item) => (
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
                  Pošalji upit na WhatsApp
                </CtaButton>
                <CtaButton href={mailHref} variant="ghost" className="w-full">
                  Ili pošalji e-mailom
                </CtaButton>
              </div>

              <p className="mt-4 font-sans text-xs leading-relaxed text-on-dark-muted">
                Okvirna cijena za radne dane. Tačan termin i ponudu potvrđujemo
                nakon upita.
              </p>

              <div className="mt-4 text-center">
                <Link
                  href="/rezervacija"
                  className="font-sans text-sm font-bold text-amber-light transition-colors hover:text-white"
                >
                  Rezerviši online →
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
              Napomene
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
            eyebrow={t.galleryEyebrow}
            naslov={t.galleryTitle}
            link={{ href: "/galerija", label: "Cijela galerija" }}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.gallery.map((img) => (
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
            eyebrow="Istraži dalje"
            naslov="Slične ponude"
            link={{ href: "/ponuda", label: "Sva ponuda" }}
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
                cijenaLabel="od"
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
            eyebrow="Česta pitanja"
            naslov="Sve što vas zanima."
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={t.faq} />
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
