import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";
import { ReviewCard } from "@/components/ReviewCard";
import { BlogCard } from "@/components/BlogCard";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Rafting Tarom — Rafting kamp Konak | Hum, Foča",
  description:
    "Rafting na Tari iz kampa Konak — vođene ture od 1 do 4 dana niz najdublji kanjon Evrope. Lux bungalovi, auto kamp i domaća kuhinja. Hum, Foča, BiH. Sezona maj–oktobar.",
  keywords: [
    "rafting Tara",
    "rafting na Tari",
    "rafting kamp",
    "rafting Foča",
    "rafting BiH",
    "NP Sutjeska",
    "kanjon Tare",
    "rafting kamp Konak",
  ],
  openGraph: {
    title: "Rafting Tarom — Rafting kamp Konak",
    description:
      "Vođene ture od 1 do 4 dana niz najdublji kanjon Evrope. Lux bungalovi i auto kamp na ušću Tare i Pive.",
    type: "website",
  },
};

// Ikone za hero trust traku (mali set, lokalno za ovu stranicu)
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

// Labela + overlay preko placeholder slota (aktivnosti)
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

const IMG = "/images/hero-slike-konak";

// Rafting ture — vrijednosti iz page-pocetna.md (sekcija 4.4)
const RAFTING_TURE = [
  {
    href: "/rafting/jednodnevni",
    kicker: "1 DAN",
    naslov: "Jednodnevni rafting",
    fakti: [{ tekst: "1 dan" }, { tekst: "Ručak" }, { tekst: "Oprema" }],
    cijena: "50€",
    cijenaLabel: "od",
    slika: {
      src: `${IMG}/raftingtarom-jednodnevni.jpg`,
      alt: "Jednodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/dvodnevni",
    kicker: "2 DANA",
    naslov: "Dvodnevni aranžman",
    fakti: [{ tekst: "2 dana" }, { tekst: "1 noćenje" }, { tekst: "Pun pansion" }],
    cijena: "100€",
    cijenaLabel: "od",
    slika: {
      src: `${IMG}/raftingtarom-dvodnevni.jpg`,
      alt: "Dvodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/trodnevni",
    kicker: "3 DANA",
    naslov: "Trodnevni aranžman",
    tag: "Najtraženije",
    fakti: [{ tekst: "3 dana" }, { tekst: "2 noćenja" }, { tekst: "5 obroka" }],
    cijena: "140€",
    cijenaLabel: "od",
    slika: {
      src: `${IMG}/raftingtarom-trodnevni.jpg`,
      alt: "Trodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/cijela-tara",
    kicker: "4 DANA",
    naslov: "Cijelim tokom Tare",
    fakti: [{ tekst: "4 dana" }, { tekst: "3 noćenja" }, { tekst: "76 km" }],
    cijena: "300€",
    cijenaLabel: "od",
    slika: {
      src: `${IMG}/raftingtarom-cetverodnevni.jpg`,
      alt: "Rafting cijelim tokom Tare",
    },
  },
];

// Trust kartica — 4 stavke (sekcija 4.3)
const TRUST_STAVKE = [
  { naslov: "Udobnost na prvom mjestu", opis: "kamp orijentisan na vaš komfor" },
  { naslov: "Profesionalan pristup", opis: "iskusni, licencirani skiperi" },
  { naslov: "Sva oprema nova", opis: "po najvišim svjetskim standardima" },
  { naslov: "Privatno kupatilo", opis: "svaki lux bungalov sa sopstvenim" },
];

// Zašto Konak — 4 stat kartice (sekcija 4.6)
const ZASTO_STATS = [
  { broj: "20+ god.", opis: "iskustva skipera na Tari" },
  { broj: "1 kamp", opis: "uređen do detalja, bez gužve" },
  { broj: "Nova", opis: "oprema po najvišim standardima" },
  { broj: "6 god.", opis: "rada bez loše recenzije" },
];

// Kamp — čipovi (sekcija 4.7)
const KAMP_CIPOVI = ["Lux bungalovi", "Auto kamp · 20€", "Restoran", "Psi dozvoljeni"];

// Recenzije — prave Google recenzije (Task 23)
const GOOGLE_RATING = 5;
const GOOGLE_REVIEW_COUNT = 194;

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

// Google Maps profil kampa (recenzije)
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

// FAQ — 13 pitanja (sekcija 4.9). ⚠️ PROVJERITI konkretne uslove (uzrast, plaćanje).
const FAQ_PITANJA = [
  {
    pitanje: "Da li je rafting na Tari bezbjedan?",
    odgovor:
      "Jeste. Vode vas licencirani skiperi sa dugogodišnjim iskustvom, uz obavezan sigurnosni brifing prije spusta i kompletnu zaštitnu opremu (prsluk, kaciga, neopren). Tara ima dionice za sve nivoe, pa rutu prilagođavamo grupi.",
  },
  {
    pitanje: "Moram li znati da plivam?",
    odgovor:
      "Ne morate biti plivač. Svi na vodi nose sigurnosni prsluk, a skiper je stalno uz vas i daje uputstva. Najvažnije je da pratite instrukcije — ostalo je na nama.",
  },
  {
    pitanje: "Da li djeca mogu na rafting?",
    odgovor:
      "Mogu, uz pratnju roditelja. Za mlađu djecu biramo mirnije dionice toka. Donju granicu uzrasta dogovaramo prilikom rezervacije, u zavisnosti od vodostaja i termina.",
  },
  {
    pitanje: "Šta da ponesem?",
    odgovor:
      "Kupaći kostim, peškir i rezervnu odjeću, obuću koja može da se pokvasi (sandale sa kaišem ili starije patike), kremu za sunce i dobru volju. Neopren, prsluk i kacigu dobijate od nas.",
  },
  {
    pitanje: "Šta je uključeno u cijenu?",
    odgovor:
      "Spust uz licenciranog skipera i kompletna oprema uvijek su uključeni. Višednevni aranžmani uključuju i smještaj i obroke (pun pansion). Tačan sadržaj naveden je na stranici svake ture.",
  },
  {
    pitanje: "Kada je sezona raftinga?",
    odgovor:
      "Sezona traje od maja do oktobra. Najviši vodostaj je u proljeće (jači adrenalin), dok je ljeti voda mirnija i toplija — idealno za porodice i početnike.",
  },
  {
    pitanje: "Koliko traje jednodnevni rafting?",
    odgovor:
      "Sam spust traje nekoliko sati, uz pauzu za odmor i ručak. Sa pripremom, prevozom do starta i povratkom u kamp, jednodnevni rafting je cjelodnevni izlet.",
  },
  {
    pitanje: "Ima li razlike između radnog dana i vikenda?",
    odgovor:
      "Vikendom je obično više gostiju. Ako želite mirniji termin i manje gužve na vodi, preporučujemo radne dane. Polaske usklađujemo sa grupama i vodostajem.",
  },
  {
    pitanje: "Kakav je smještaj?",
    odgovor:
      "Nudimo lux bungalove sa privatnim kupatilom i prostran auto kamp na samoj obali. U sklopu kampa su restoran sa domaćom kuhinjom i zajednički prostori za druženje.",
  },
  {
    pitanje: "Da li su ljubimci dozvoljeni?",
    odgovor:
      "Jesu — psi su dobrodošli u kampu. Molimo da nam to napomenete prilikom rezervacije da vam dodijelimo odgovarajući smještaj.",
  },
  {
    pitanje: "Kako da rezervišem?",
    odgovor:
      "Najbrže preko stranice za rezervaciju, a možete nas kontaktirati i telefonom, putem WhatsApp/Viber poruke ili mejlom. Javljamo vam se sa slobodnim terminima i potvrdom.",
  },
  {
    pitanje: "Kako se plaća?",
    odgovor:
      "Za potvrdu rezervacije obično je potreban manji avans, a ostatak se izmiruje po dolasku u kamp. Detalje i način plaćanja potvrđujemo prilikom rezervacije.",
  },
  {
    pitanje: "Mogu li da spojim više aktivnosti?",
    odgovor:
      "Naravno. Rafting možete kombinovati sa kanjoningom i planinskim izletima (NP Sutjeska, Durmitor, Zelengora) u jedan višednevni boravak. Predložićemo vam plan prema broju dana.",
  },
];

const BLOG_IMG = "/images/blog-konak";

// Blog — 3 kartice (sekcija 4.10). Opisi su radni tekst do finalnih članaka.
const BLOG_KARTICE = [
  {
    href: "/blog",
    kategorija: "Vodič",
    naslov: "Kada je najbolje vrijeme za rafting na Tari?",
    opis: "Sezona, vodostaj i savjeti kako izabrati pravi termin za spust.",
    slika: {
      src: `${BLOG_IMG}/blog-najbolje-vrijeme-rafting-konak.jpg`,
      alt: "Rafting na Tari — najbolje vrijeme za spust",
    },
  },
  {
    href: "/blog/sta-ponijeti-na-rafting",
    kategorija: "Priprema",
    naslov: "Šta ponijeti na višednevni rafting",
    opis: "Praktična lista opreme i odjeće za dane na rijeci i u kampu.",
    slika: {
      src: `${BLOG_IMG}/blog-sta-ponijeti-konak.jpg`,
      alt: "Šta ponijeti na rafting na Tari",
    },
  },
  {
    href: "/blog/np-sutjeska-vodic",
    kategorija: "Priroda",
    naslov: "NP Sutjeska: prašuma Perućica i Maglić",
    opis: "Vodič kroz najstariju prašumu i najviši vrh BiH nadomak kampa.",
    slika: {
      src: `${BLOG_IMG}/blog-np-sutjeska-konak.jpg`,
      alt: "Nacionalni park Sutjeska — Perućica i Maglić",
    },
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
      {/* 4.2 — HERO (velika varijanta A) */}
      <Hero
        variant="a"
        eyebrow="Najdublji kanjon Evrope · 1.300 m"
        slika={{
          src: `${IMG}/hero-pocetna.jpg`,
          alt: "Rafting na Tari — kanjon i čamac",
        }}
        trust={[
          { icon: <IconStar />, label: "5.0 · Google recenzije" },
          { icon: <IconShield />, label: "Licencirani skiperi" },
          { icon: <IconPin />, label: "Hum, Foča — ušće Tare i Pive" },
        ]}
        naslov={
          <>
            Rafting
            <br />
            <span className="text-teal-light">Tarom.</span>
          </>
        }
        lead="Vođene rafting ture na Tari, smještaj u lux bungalovima i auto kamp na samoj obali. Kod nas nema gužve i žurbe na rijeci — domaćini smo koji paze na svaki detalj, da se osjećate prijatno od dolaska do odlaska."
        cta={[
          { label: "Pogledaj rafting ture", href: "/rafting", arrow: true },
          { label: "Izračunaj cijenu", href: "/rezervacija", variant: "ghost" },
        ]}
      />

      {/* 4.3 — INTRO + STATS (split 1.15fr .85fr) */}
      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1.15fr .85fr" }}
        >
          {/* Lijevo: tekst */}
          <div>
            <SectionHeader
              eyebrow="Dobro došli u Konak"
              naslov={
                <>
                  Kod nas ste gost,
                  <br />
                  a ne broj sobe.
                </>
              }
            />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              Kamp Konak je porodično domaćinstvo na samoj obali, u Humu kod Foče.
              Sve je okrenuto vašoj udobnosti i sigurnosti — doček uz domaću rakiju,
              topli obrok poslije spusta i osjećaj da ste kod svojih.
            </p>
          </div>

          {/* Desno: trust kartica */}
          <div className="rounded-card-lg border border-line bg-surface-warm p-7 shadow-soft sm:p-8">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-extrabold leading-none text-pine">
                6 godina
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              rada — bez ijedne loše recenzije
            </p>

            <div className="my-6 h-px bg-line" />

            <ul className="flex flex-col gap-5">
              {TRUST_STAVKE.map((s) => (
                <li key={s.naslov} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-mint-surface text-teal">
                    <IconCheck />
                  </span>
                  <span>
                    <span className="block font-sans text-[15px] font-bold text-ink">
                      {s.naslov}
                    </span>
                    <span className="block font-sans text-sm text-text-secondary">
                      {s.opis}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4.4 — RAFTING GRID (4 kartice) */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Naš glavni adut"
            naslov={
              <>
                Izaberi svoju
                <br />
                rafting turu.
              </>
            }
            link={{ href: "/rafting", label: "Sve o raftingu" }}
          />

          <div className="kon-grid4 mt-10">
            {RAFTING_TURE.map((t) => (
              <TourCard
                key={t.href}
                href={t.href}
                kicker={t.kicker}
                naslov={t.naslov}
                tag={t.tag}
                fakti={t.fakti}
                cijena={t.cijena}
                cijenaLabel={t.cijenaLabel}
                slika={t.slika}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 — AKTIVNOSTI (sand sekcija, split .85fr 1.15fr) */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: ".85fr 1.15fr" }}
        >
          {/* Lijevo: tekst */}
          <div>
            <SectionHeader
              eyebrow="Više od rijeke"
              naslov={<>NP Sutjeska, kanjoning i planinski izleti.</>}
            />
            <p
              className="mt-6 max-w-lg font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              Prašuma Perućica, Trnovačko jezero, kanjon Nevidio, Durmitor i
              Zelengora — spojite više avantura u jedan nezaboravan boravak.
            </p>
            <div className="mt-8">
              <CtaButton href="/aktivnosti" variant="secondary" arrow>
                Sve aktivnosti
              </CtaButton>
            </div>
          </div>

          {/* Desno: 3 slike */}
          <div className="grid min-h-[360px] grid-cols-2 grid-rows-2 gap-3 sm:min-h-[440px]">
            <ImageSlot
              src={`${IMG}/np-sutjeska-konak.webp`}
              alt="Nacionalni park Sutjeska — prašuma i planine"
              className="row-span-2 h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text="NP Sutjeska" />
            </ImageSlot>
            <ImageSlot
              src={`${IMG}/kanjoning-pocetna.jpg`}
              alt="Kanjoning Nevidio"
              className="h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text="Kanjoning" />
            </ImageSlot>
            <ImageSlot
              src={`${IMG}/izleti-konak.png`}
              alt="Planinski izleti oko kampa Konak"
              className="h-full rounded-card"
              sizes="(max-width: 960px) 50vw, 340px"
            >
              <SlotLabel text="Izleti" />
            </ImageSlot>
          </div>
        </div>
      </section>

      {/* 4.6 — ZAŠTO KONAK (tamna sekcija, split + 4 stat kartice) */}
      <section className="kon-section" style={{ background: "var(--gradient-hero)" }}>
        <div className="kon-container kon-split">
          {/* Lijevo: tekst */}
          <div>
            <SectionHeader
              tone="dark"
              eyebrow="Zašto baš Konak"
              naslov={
                <>
                  Kamp koji su napravili
                  <br />
                  ljudi sa rijeke.
                </>
              }
            />
            <p
              className="mt-6 font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              Naši skiperi su{" "}
              <strong className="font-semibold text-white">
                preko 20 godina na Tari
              </strong>
              . Godinama su vodili goste za druge kampove, upoznali svaku prednost
              i svaku manu, i onda otvorili svoj — Konak. Sve što su naučili na vodi
              i u kampovima spojili su na jedno mjesto.
            </p>
            <p
              className="mt-4 font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              Kod nas nema trke, prebukiranih termina ni „proizvodne trake". Jedan
              uređen kamp, mali tim i puna pažnja na{" "}
              <strong className="font-semibold text-white">
                doživljaj na vodi i u kampu
              </strong>
              .
            </p>
          </div>

          {/* Desno: 4 stat kartice */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ZASTO_STATS.map((s) => (
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

      {/* 4.7 — KAMP (split slika + tekst 1.15fr .85fr) */}
      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1.15fr .85fr" }}
        >
          {/* Lijevo: slika kampa sa badge-om */}
          <ImageSlot
            src={`${IMG}/smjestaj-konak-pocetna.jpg`}
            alt="Smještaj kampa Konak — bungalovi na obali"
            className="aspect-[4/3] rounded-card-lg"
            sizes="(max-width: 960px) 100vw, 700px"
          >
            <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3.5 py-1.5 font-sans text-xs font-bold text-pine backdrop-blur-sm">
              Na obali, Hum kod Foča
            </span>
          </ImageSlot>

          {/* Desno: tekst */}
          <div>
            <SectionHeader
              eyebrow="Kamp Konak"
              naslov={
                <>
                  Domaćinstvo na
                  <br />
                  obali Drine.
                </>
              }
            />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              55 jedinica, lux bungalovi sa privatnim toaletom i prostran auto kamp.
              Domaća kuhinja, piće dobrodošlice i tišina rijeke.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {KAMP_CIPOVI.map((c) => (
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
                O kampu i smeštaju
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* 4.8 — RECENZIJE (sand sekcija, 3 kartice + Google 5.0 badge) */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                Utisci gostiju
              </span>
              <h2
                className="mt-3 font-display font-extrabold text-pine"
                style={{
                  fontSize: "clamp(30px, 4.5vw, 58px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                }}
              >
                Ovako je to kod nas.
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
                · {GOOGLE_REVIEW_COUNT} Google recenzija
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
              Pogledaj sve recenzije na Google-u
            </CtaButton>
          </div>
        </div>
      </section>

      {/* 4.9 — FAQ (13 pitanja, akordeon) */}
      <section className="kon-section">
        <div
          className="kon-container"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <SectionHeader
            eyebrow="Česta pitanja"
            naslov="Sve što vas zanima."
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={FAQ_PITANJA} />
          </div>
          <p className="mt-8 text-center font-sans text-[15px] text-text-secondary">
            Nemate odgovor na svoje pitanje?{" "}
            <Link
              href="/kontakt"
              className="font-bold text-terracotta transition-colors hover:text-terracotta-hover"
            >
              Pišite nam →
            </Link>
          </p>
        </div>
      </section>

      {/* 4.10 — BLOG (tamna sekcija, 3 kartice) */}
      <section className="kon-section" style={{ background: "var(--gradient-hero)" }}>
        <div className="kon-container">
          <SectionHeader
            tone="dark"
            eyebrow="Vodič kroz Taru"
            naslov="Blog i savjeti."
            link={{ href: "/blog", label: "Svi članci" }}
          />
          <div className="kon-blog mt-10">
            {BLOG_KARTICE.map((b) => (
              <BlogCard
                key={b.href}
                href={b.href}
                kategorija={b.kategorija}
                naslov={b.naslov}
                opis={b.opis}
                slika={b.slika}
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
