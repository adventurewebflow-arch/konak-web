import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";

const SITE = "https://www.raftingkampkonak.com";
const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";

interface ProgramItem {
  broj: number;
  label?: string;
  naslov: string;
  tekst: string;
}

interface TuraData {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  unit: number;
  durationFact: string;
  stayFact: string;
  mealsFact: string;
  intro: string;
  program: ProgramItem[];
  included: string[];
  metaTitle: string;
  metaDescription: string;
}

// Podaci doslovno iz page-tura-detalj.md (sekcija 5) + page-rafting.md (subtitle/opis).
// Napomena: included[] za višednevne izveden iz fakata + FAQ #2 (dokument ga eksplicitno daje samo za jednodnevni).
const TURE: Record<string, TuraData> = {
  jednodnevni: {
    badge: "1 dan · bez noćenja",
    title: "Jednodnevni rafting",
    subtitle:
      "Idealan za one u prolazu — spust uz ručak (domaća kuhinja) i stajanja za kupanje u srcu kanjona. Sve uključeno.",
    price: "od 50€",
    priceNote: "60€ sa ručkom · vikend 60€/70€",
    unit: 50,
    durationFact: "5–6 sati",
    stayFact: "bez noćenja",
    mealsFact: "1 (ručak)",
    intro:
      "Najtraženiji jednodnevni doživljaj na Tari. Nakon opreme i kratke obuke vozimo vas do startne tačke, a iskusni skiper vas vodi niz 18 km i 18 bukova kroz srce kanjona. Stajemo za kupanje na smaragdnoj vodi, a spust krunišemo toplim ručkom domaće kuhinje.",
    program: [
      {
        broj: 1,
        label: "JUTRO",
        naslov: "Doček i oprema",
        tekst:
          "Dočekujemo vas u kampu i podešavamo opremu: neopren, čizme, prsluk, kacigu i veslo. Prije polaska svi prolaze kratku sigurnosnu obuku sa skiperom.",
      },
      {
        broj: 2,
        label: "POLAZAK",
        naslov: "Prevoz do startne tačke",
        tekst:
          "Organizovanim prevozom vas vozimo uzvodno do startne tačke spusta. Sama vožnja kroz kanjon je uvod u ono što slijedi na vodi.",
      },
      {
        broj: 3,
        label: "SPUST",
        naslov: "18 km i 18 bukova",
        tekst:
          "Slijedi 18 km spusta preko 18 bukova kroz srce najdubljeg kanjona Evrope. Između brzaka stajemo na mirnim mjestima za kupanje u smaragdnoj vodi.",
      },
      {
        broj: 4,
        label: "RUČAK",
        naslov: "Domaći obrok i povratak",
        tekst:
          "Po izlasku iz vode čeka vas topli ručak domaće kuhinje. Nakon obroka i predaha slijedi povratak do kampa.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani skiper",
      "Topli ručak",
      "Prevoz do startne tačke",
      "Osiguranje i takse",
    ],
    metaTitle: "Jednodnevni rafting na Tari — od 50€ | Rafting kamp Konak",
    metaDescription:
      "Jednodnevni rafting Tarom iz kampa Konak: 18 km i 18 bukova, oprema, licencirani skiper, topli ručak i prevoz. Radni dan od 50€ (60€ sa ručkom), vikend 60€/70€.",
  },
  dvodnevni: {
    badge: "2 dana · 1 noćenje",
    title: "Dvodnevni aranžman",
    subtitle:
      "Doček i večera prvog dana, zabava u kampu i noćenje u lux bungalovu, pa rafting drugog dana.",
    price: "od 100€",
    priceNote: "radni dan · vikend 120€ / osobi",
    unit: 100,
    durationFact: "2 dana",
    stayFact: "1 noćenje · lux bungalov",
    mealsFact: "3 obroka",
    intro:
      "Za one koji žele i avanturu i odmor. Dočekujemo vas u kampu uz piće dobrodošlice, smeštaj u lux bungalovu sa sopstvenim kupatilom i veče uz domaću kuhinju. Drugog dana slijedi pravi rafting spust niz najljepše bukove Tare.",
    program: [
      {
        broj: 1,
        label: "DOLAZAK",
        naslov: "Doček i smeštaj",
        tekst:
          "Dočekujemo vas uz piće dobrodošlice i smeštaj u lux bungalov sa sopstvenim kupatilom. Ostatak popodneva je za opuštanje uz rijeku.",
      },
      {
        broj: 1,
        label: "VEČE",
        naslov: "Večera i druženje",
        tekst:
          "Uveče vas služimo večerom iz domaće kuhinje. Družimo se uz rijeku i pripremamo za sutrašnji spust.",
      },
      {
        broj: 2,
        label: "RAFTING",
        naslov: "Spust niz Taru",
        tekst:
          "Drugog dana slijedi pravi rafting spust niz najljepše bukove Tare. Skiper vas vodi kroz brzake, uz stajanja za kupanje i odmor.",
      },
      {
        broj: 2,
        label: "POVRATAK",
        naslov: "Povratak i odjava",
        tekst:
          "Po završetku spusta vraćamo se u kamp na obrok i predah. Nakon odjave nastavljate put sa punim utiscima.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani skiper",
      "Noćenje u lux bungalovu",
      "Pun pansion (3 obroka)",
      "Prevoz do startne tačke",
      "Osiguranje i takse",
    ],
    metaTitle: "Dvodnevni rafting aranžman na Tari — od 100€ | Rafting kamp Konak",
    metaDescription:
      "Dvodnevni rafting aranžman: doček uz piće dobrodošlice, noćenje u lux bungalovu, pun pansion i spust niz Taru. Radni dan od 100€, vikend 120€.",
  },
  trodnevni: {
    badge: "Najtraženije",
    title: "Trodnevni aranžman",
    subtitle:
      "Najpopularniji aranžman: Brštanovica – Šćepan Polje – Hum. Rafting, relax i dvije večeri zabave uz domaću kuhinju.",
    price: "od 140€",
    priceNote: "radni dan · vikend 160€ / osobi",
    unit: 140,
    durationFact: "3 dana",
    stayFact: "2 noćenja · lux bungalov",
    mealsFact: "5 obroka",
    intro:
      "Aranžman koji gosti najčešće biraju i zbog kojeg se vraćaju. Spaja pravi cjelodnevni rafting sa opuštanjem u kampu, domaćom kuhinjom i dvije večeri druženja na obali. Idealno za grupe, prijatelje i team building.",
    program: [
      {
        broj: 1,
        label: "DOLAZAK",
        naslov: "Doček i prva večer",
        tekst:
          "Prvog dana vas smeštamo u lux bungalov uz piće dobrodošlice. Veče provodimo uz domaću kuhinju i druženje na obali.",
      },
      {
        broj: 2,
        label: "RAFTING",
        naslov: "Cjelodnevni spust",
        tekst:
          "Drugi dan je cjelodnevni rafting na dionici Brštanovica – Šćepan Polje – Hum. Između brzaka stajemo za kupanje, a ručak je uz rijeku.",
      },
      {
        broj: 3,
        label: "ODLAZAK",
        naslov: "Opušteno jutro",
        tekst:
          "Posljednje jutro je opušteno, uz doručak i kafu na obali. Nakon odjave ispraćamo vas sa uspomenama sa Tare.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani skiper",
      "2 noćenja u lux bungalovu",
      "5 obroka (domaća kuhinja)",
      "Prevoz do startne tačke",
      "Osiguranje i takse",
    ],
    metaTitle: "Trodnevni rafting aranžman na Tari — od 140€ | Rafting kamp Konak",
    metaDescription:
      "Najtraženiji trodnevni rafting aranžman: cjelodnevni spust, 2 noćenja u lux bungalovu, 5 obroka i dvije večeri druženja. Radni dan od 140€, vikend 160€.",
  },
  "cijela-tara": {
    badge: "4 dana · cijeli tok",
    title: "Rafting cijelim tokom Tare",
    subtitle:
      "Đurđevića Tara – Brštanovica – Šćepan Polje – Hum. Najveća avantura koju Tara nudi: 8 obroka, 3 noćenja.",
    price: "od 300€",
    priceNote: "radni dan · vikend 340€ / osobi",
    unit: 300,
    durationFact: "4 dana",
    stayFact: "3 noćenja (1 u kanjonu)",
    mealsFact: "8 obroka · pun pansion",
    intro:
      "Ekspedicija za prave avanturiste. Prelazimo cijeli plovni tok Tare — od čuvenog Đurđevića mosta do ušća u Drinu kod Huma — kroz najdublji dio kanjona od 1300 metara. Spavamo uz rijeku i jednu noć u srcu kanjona, daleko od svega, pod zvijezdama.",
    program: [
      {
        broj: 1,
        naslov: "Đurđevića Tara → Radovan Luka",
        tekst:
          "Ekspedicija počinje kod čuvenog Đurđevića mosta i vodi do Radovan Luke. Prvi dan vas uvodi u ritam rijeke i najviše djelove kanjona.",
      },
      {
        broj: 2,
        naslov: "Radovan Luka → Brštanovica",
        tekst:
          "Nastavljamo kroz najdublji dio kanjona od 1300 metara. Prolazimo netaknutu prirodu daleko od puteva i naselja.",
      },
      {
        broj: 3,
        naslov: "Brštanovica → Šćepan Polje",
        tekst:
          "Treći dan donosi neke od najuzbudljivijih bukova na toku. Jednu noć spavamo uz rijeku, u srcu kanjona pod zvijezdama.",
      },
      {
        broj: 4,
        naslov: "Šćepan Polje → Hum",
        tekst:
          "Posljednja etapa vodi do ušća Tare u Drinu kod Huma. Spust krunišemo povratkom u kamp i zajedničkim obrokom.",
      },
    ],
    included: [
      "Kompletna oprema",
      "Licencirani skiper",
      "3 noćenja (1 u kanjonu)",
      "Pun pansion (8 obroka)",
      "Prevoz do startne tačke",
      "Osiguranje i takse",
    ],
    metaTitle: "Rafting cijelim tokom Tare — 4 dana, od 300€ | Rafting kamp Konak",
    metaDescription:
      "Četvorodnevna rafting ekspedicija cijelim tokom Tare: Đurđevića Tara – Hum, 76 km, 3 noćenja (1 u kanjonu), 8 obroka i pun pansion. Od 300€.",
  },
};

// FAQ — 5 pitanja, doslovno, isti za sve ture (sekcija 4.4)
const FAQ = [
  {
    pitanje: "Da li je tura bezbjedna i za neiskusne?",
    odgovor:
      "Jeste. U svakom čamcu je licencirani skiper, oprema je nova, a prije spusta svi prolaze obuku. Tara je idealna i za one koji prvi put veslaju.",
  },
  {
    pitanje: "Šta je uključeno u cijenu?",
    odgovor:
      "Kompletna oprema, licencirani vodič, prevoz do startne tačke, obrok(i), osiguranje i sve takse. Kod višednevnih tura i noćenje i pun pansion.",
  },
  {
    pitanje: "Kako se primjenjuje vikend cijena?",
    odgovor:
      "Vikend cijena važi za subotu i nedjelju (a kod višednevnih aranžmana i za petak). Cijena se automatski prilagodi datumu koji izaberete u rezervaciji.",
  },
  {
    pitanje: "Mogu li dodati Sutjesku ili druge aktivnosti?",
    odgovor:
      "Da — uz turu možete dodati NP Sutjeska, kanjoning Hrčavka ili jahanje konja. Sve ide na upit, samo ih označite u rezervaciji.",
  },
  {
    pitanje: "Imamo nekoga sa posebnom ishranom — je li to problem?",
    odgovor:
      "Nije. Upišite to u polje za posebnu ishranu pri rezervaciji (vegetarijanski, bez glutena i sl.) i prilagodićemo obroke.",
  },
];

const HERO_IMG = "/images/hero-slike-konak";
const RAFTING_IMG = "/images/rafting";

const TURA_IMAGES: Record<
  string,
  { hero: { src: string; alt: string }; gallery: { src: string; alt: string }[] }
> = {
  jednodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`,
      alt: "Jednodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija1.jpg`,
        alt: "Jednodnevni rafting — spust kroz kanjon Tare",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija2.jpg`,
        alt: "Jednodnevni rafting — čamac na Tari",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija3.jpg`,
        alt: "Jednodnevni rafting — kupanje u smaragdnoj vodi",
      },
    ],
  },
  dvodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
      alt: "Dvodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija4.jpg`,
        alt: "Dvodnevni rafting — kamp i noćenje uz Taru",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija5.jpg`,
        alt: "Dvodnevni rafting — spust niz bukove",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija6.jpg`,
        alt: "Dvodnevni rafting — druženje u kampu",
      },
    ],
  },
  trodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
      alt: "Trodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija7.jpg`,
        alt: "Trodnevni rafting — dionica Brštanovica",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija8.jpg`,
        alt: "Trodnevni rafting — grupa na Tari",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija9.jpg`,
        alt: "Trodnevni rafting — večer u kampu Konak",
      },
    ],
  },
  "cijela-tara": {
    hero: {
      src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
      alt: "Rafting cijelim tokom Tare",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija12.jpg`,
        alt: "Cijela Tara — gornji tok i kanjon",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija14.jpg`,
        alt: "Cijela Tara — ekspedicija niz rijeku",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija16.jpg`,
        alt: "Cijela Tara — dolazak u Hum",
      },
    ],
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
      "rafting Tara",
      "rafting na Tari",
      t.title.toLowerCase(),
      "rafting cijena",
      "rafting kamp Konak",
    ],
    alternates: { canonical: `${SITE}/rafting/${tura}` },
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
  const t = TURE[tura];
  if (!t) notFound();
  setRequestLocale(locale);

  const images = TURA_IMAGES[tura];

  const waText = encodeURIComponent(
    `Zdravo! Zanima me ${t.title} (${t.price}). Molim vas slobodne termine i detalje.`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit: ${t.title}`,
  )}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t.title,
    description: t.subtitle,
    brand: { "@type": "Organization", name: "Rafting kamp Konak" },
    offers: {
      "@type": "Offer",
      price: t.unit,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/rafting/${tura}`,
    },
  };

  return (
    <>
      {/* 4.1 — HERO */}
      <Hero
        variant="b"
        eyebrow={t.badge}
        naslov={t.title}
        lead={t.subtitle}
        nazadLink={{ href: "/rafting", label: "Sve rafting ture" }}
        slika={images.hero}
      />

      {/* 4.2 — BODY (sadržaj + booking) */}
      <section className="kon-section">
        <div className="kon-container kon-td-grid">
          {/* Lijevo */}
          <div>
            {/* 3 fakta */}
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

            {/* Intro */}
            <p
              className="mt-8 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.7 }}
            >
              {t.intro}
            </p>

            {/* Program */}
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

          {/* Desno — statična booking kartica */}
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

              <div className="mt-6 flex flex-col gap-2.5">
                <CtaButton href={waHref} variant="primary" className="w-full">
                  Pošalji upit na WhatsApp
                </CtaButton>
                <CtaButton href={mailHref} variant="ghost" className="w-full">
                  Ili pošalji e-mailom
                </CtaButton>
              </div>

              <p className="mt-4 font-sans text-xs leading-relaxed text-on-dark-muted">
                Okvirna cijena za radne dane. Dodatne aktivnosti i tačan termin
                potvrđujemo na upit.
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

      {/* 4.3 — GALERIJA */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Sa rijeke"
            naslov="Trenuci sa Tare"
            link={{ href: "/galerija", label: "Cijela galerija" }}
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

      {/* 4.4 — FAQ */}
      <section className="kon-section">
        <div className="kon-container" style={{ maxWidth: "var(--container-narrow)" }}>
          <SectionHeader
            eyebrow="Česta pitanja"
            naslov="Sve što vas zanima."
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
    </>
  );
}
