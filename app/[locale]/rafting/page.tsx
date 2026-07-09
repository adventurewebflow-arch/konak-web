import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";
import { GallerySlider } from "@/components/GallerySlider";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Rafting na Tari — ture od 1 do 4 dana | Rafting kamp Konak",
  description:
    "Rafting Tarom iz kampa Konak: jednodnevni (od 50€), dvodnevni (od 100€), trodnevni (od 140€) i četvorodnevni rafting cijelim tokom Tare (od 300€). 18 bukova, najdublji kanjon Evrope, sve uključeno.",
  keywords: [
    "rafting Tara",
    "rafting na Tari",
    "rafting cijena",
    "jednodnevni rafting",
    "višednevni rafting",
    "rafting Foča",
    "rafting kamp Konak",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/rafting" },
  openGraph: {
    title: "Rafting na Tari — ture od 1 do 4 dana",
    description:
      "Vođene rafting ture niz najdublji kanjon Evrope. Oprema, vodič, obroci i prevoz — sve uključeno.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";
const HERO_IMG = "/images/hero-slike-konak";
const RAFTING_IMG = "/images/rafting";

// 4.3 — Lista tura (red-kartice), doslovno iz page-rafting.md
const TURE = [
  {
    href: "/rafting/jednodnevni",
    kicker: "1 DAN · bez noćenja",
    naslov: "Jednodnevni rafting",
    opis:
      "Idealan za one u prolazu — spust uz ručak (domaća kuhinja) i stajanja za kupanje u srcu kanjona. Sve uključeno.",
    cijena: "50€",
    cijenaLabel: "od",
    obrnuto: false,
    slika: {
      src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`,
      alt: "Jednodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/dvodnevni",
    kicker: "2 DANA · 1 noćenje · pun pansion",
    naslov: "Dvodnevni aranžman",
    opis:
      "Doček i večera prvog dana, zabava u kampu i noćenje u lux bungalovu, pa rafting drugog dana.",
    cijena: "100€",
    cijenaLabel: "od",
    obrnuto: true,
    slika: {
      src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
      alt: "Dvodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/trodnevni",
    kicker: "3 DANA · 2 noćenja · 5 obroka",
    naslov: "Trodnevni aranžman",
    opis:
      "Najpopularniji aranžman: Brštanovica – Šćepan Polje – Hum. Rafting, relax i dvije večeri zabave uz domaću kuhinju.",
    cijena: "140€",
    cijenaLabel: "od",
    tag: "Najtraženije",
    obrnuto: false,
    slika: {
      src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
      alt: "Trodnevni rafting na Tari",
    },
  },
  {
    href: "/rafting/cijela-tara",
    kicker: "4 DANA · 76 km · cijeli tok",
    naslov: "Rafting cijelim tokom Tare",
    opis:
      "Đurđevića Tara – Brštanovica – Šćepan Polje – Hum. Najveća avantura koju Tara nudi: 8 obroka, 3 noćenja.",
    cijena: "300€",
    cijenaLabel: "od",
    tamna: true,
    obrnuto: true,
    slika: {
      src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
      alt: "Rafting cijelim tokom Tare",
    },
  },
];

// 4.4 — U cijenu ulazi
const UKLJUCENO: { naslov: string; opis: string; ikona: ReactNode }[] = [
  {
    naslov: "Kompletna oprema",
    opis: "Neopren, čizme, jakna, prsluk, kaciga i veslo",
    ikona: <IconGear />,
  },
  {
    naslov: "Licencirani vodič",
    opis: "Sertifikovan skiper u svakom čamcu",
    ikona: <IconGuide />,
  },
  {
    naslov: "Obroci i prevoz",
    opis: "Domaća kuhinja i prevoz do startne tačke",
    ikona: <IconMeal />,
  },
  {
    naslov: "Takse i osiguranje",
    opis: "Boravišna i rafting taksa, osiguranje od nezgode",
    ikona: <IconShield />,
  },
];

const UKLJUCENO_TRAKA = [
  "Djeca do 6 god. besplatno",
  "Djeca 6–12 god. 50%",
  "Piće dobrodošlice (domaća rakija)",
  "Besplatan parking sa nadzorom",
];

// 4.7 — FAQ (5 pitanja), doslovno
const FAQ = [
  {
    pitanje: "Koja tura je najbolja za prvi put?",
    odgovor:
      "Jednodnevni rafting je idealan za prvi susret sa Tarom — dovoljno uzbuđenja, a bez obaveze noćenja. Ako želite cijeli doživljaj, najtraženiji je trodnevni aranžman.",
  },
  {
    pitanje: "Da li treba znati plivati?",
    odgovor:
      "Nije neophodno. Svi nose prsluk i kacigu, a skiper vodi čamac. Dovoljno je da se ne plašite vode i slušate uputstva vodiča.",
  },
  {
    pitanje: "Šta je uključeno u cijenu?",
    odgovor:
      "Oprema, licencirani vodič, prevoz do startne tačke, obrok(i), osiguranje i takse. Kod višednevnih tura i noćenje i pun pansion.",
  },
  {
    pitanje: "Kako se računa vikend cijena?",
    odgovor:
      "Subota i nedjelja su vikend za sve ture; petak je vikend samo za višednevne aranžmane. Cijena se automatski prilagodi datumu u rezervaciji.",
  },
  {
    pitanje: "Mogu li djeca na rafting?",
    odgovor:
      "Da. Djeca do 6 godina ne plaćaju, a od 6 do 12 imaju 50% popusta. Za najmlađe biramo mirnije dionice.",
  },
];

const GALERIJA_TEASER = [
  {
    href: "/galerija",
    src: `${RAFTING_IMG}/rafting-galerija1.jpg`,
    alt: "Rafting na Tari — čamac u kanjonu",
  },
  {
    href: "/galerija",
    src: `${RAFTING_IMG}/rafting-galerija7.jpg`,
    alt: "Rafting na Tari — grupa na spustu",
  },
  {
    href: "/galerija",
    src: `${RAFTING_IMG}/rafting-galerija12.jpg`,
    alt: "Rafting na Tari — bukovi i kanjon",
  },
  {
    href: "/galerija",
    src: `${RAFTING_IMG}/rafting-galerija16.jpg`,
    alt: "Rafting na Tari — dolazak u Hum",
  },
];

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

export default async function RaftingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
      {/* 4.2 — HERO (podstranica) */}
      <Hero
        variant="b"
        visina="60vh"
        eyebrow="Rafting turom"
        naslov="Rafting na Tari"
        lead="18 bukova na najuzbudljivijem dijelu rijeke — od jutarnjeg spusta do četvorodnevne ekspedicije cijelim tokom Tare."
        slika={{
          src: `${RAFTING_IMG}/rafting-hero.jpg`,
          alt: "Rafting na Tari — čamac u kanjonu",
        }}
      />

      {/* 4.3 — LISTA TURA (red-kartice) */}
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

      {/* 4.4 — U CIJENU ULAZI (sand) */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="U cijenu ulazi"
            naslov="Sve je uključeno — bez skrivenih troškova."
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

      {/* 4.5 — CTA (centrirano) */}
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
            Sastavi termin i vidi cijenu.
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            Izaberi turu, datum i broj osoba u kalkulatoru — cijenu računamo odmah i
            šaljemo upit na WhatsApp ili mejl.
          </p>
          <div className="mt-8">
            <CtaButton href="/rezervacija" arrow>
              Otvori kalkulator
            </CtaButton>
          </div>
        </div>
      </section>

      {/* 4.6 — GALERIJA teaser */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Sa rijeke"
            naslov="Trenuci sa Tare"
            link={{ href: "/galerija", label: "Cijela galerija" }}
          />

          <div className="mt-10">
            <GallerySlider
              label="Galerija sa Tare"
              items={GALERIJA_TEASER}
            />
          </div>
        </div>
      </section>

      {/* 4.7 — FAQ (5 pitanja) */}
      <section className="kon-section">
        <div
          className="kon-container"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <SectionHeader
            eyebrow="Česta pitanja o raftingu"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
