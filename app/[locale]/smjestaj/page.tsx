import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { StayCard } from "@/components/StayCard";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Smještaj — lux bungalovi na Tari | Rafting kamp Konak, Hum (Foča)",
  description:
    "Lux bungalovi rafting kampa Konak na sastavu Tare i Pive, kod Šćepan Polja. Sopstvena kupatila i topla voda, mir rijeke i domaća kuhinja na korak. Idealna baza za rafting i izlete.",
  keywords: [
    "bungalovi Tara",
    "smještaj Šćepan Polje",
    "lux bungalovi Foča",
    "rafting smještaj",
    "prenoćište Tara Piva",
    "kamp Konak smještaj",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/smjestaj" },
  openGraph: {
    title: "Smještaj — lux bungalovi | Rafting kamp Konak",
    description:
      "13 lux bungalova i auto kamp na obali Tare — sopstvena kupatila, topla voda i domaća kuhinja.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/smjestaj-konak";
const AUTO = "/images/autokamp";

const GALERIJA = [
  {
    src: `${IMG}/kamp_konak.webp`,
    alt: "Lux bungalovi kampa Konak uz rijeku",
  },
  {
    src: `${IMG}/kamp_konak1.webp`,
    alt: "Smještaj kampa Konak — bungalovi na obali",
  },
  {
    src: `${IMG}/konak_ispred.webp`,
    alt: "Ulaz i dvorište rafting kampa Konak",
  },
  {
    src: `${IMG}/smjestaj_konak.webp`,
    alt: "Unutrašnjost lux bungalova kampa Konak",
  },
  {
    src: `${IMG}/smjestaj_konak2.webp`,
    alt: "Lux bungalov kampa Konak — soba",
  },
  {
    src: `${IMG}/smjestaj_konak3.webp`,
    alt: "Lux bungalov kampa Konak — odmor uz Taru",
  },
  {
    src: `${IMG}/toalet_kamp_konak.webp`,
    alt: "Kupatilo u bungalovu kampa Konak",
  },
  {
    src: `${AUTO}/auto-konak.jpg`,
    alt: "Auto kamp Konak — kamperi pod krošnjama",
  },
];

const UKLJUCENO: { naslov: string; opis: string; ikona: ReactNode }[] = [
  {
    naslov: "Sopstveno kupatilo",
    opis: "Privatno kupatilo i topla voda u svakom bungalovu",
    ikona: <IconBath />,
  },
  {
    naslov: "Na obali rijeke",
    opis: "Mir vode i pogled na sastav Tare i Pive",
    ikona: <IconWaves />,
  },
  {
    naslov: "Domaća kuhinja",
    opis: "Restoran i obroci na korak od bungalova",
    ikona: <IconMeal />,
  },
];

function IconBath() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 12V7a2 2 0 0 1 2-2h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconWaves() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2"
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

export default async function SmjestajPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lodgingLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Rafting kamp Konak — lux bungalovi",
    description:
      "13 lux bungalova sa sopstvenim kupatilom i auto kamp na obali Tare u Humu kod Foče.",
    url: `${SITE}/smjestaj`,
    telephone: "+38765848110",
    numberOfRooms: 13,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Sopstveno kupatilo", value: true },
      { "@type": "LocationFeatureSpecification", name: "Topla voda", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    ],
    priceRange: "€€",
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow="Smještaj · lux bungalovi"
        naslov={
          <>
            San na obali{" "}
            <span className="text-teal-light">tri rijeke.</span>
          </>
        }
        lead="Naši lux bungalovi smješteni su tamo gdje se Tara i Piva spajaju u Drinu. Mir vode, planinski vazduh i topla domaća kuhinja na korak od kreveta."
        slika={{
          src: `${IMG}/smjestaj_hero.webp.webp`,
          alt: "Lux bungalovi kampa Konak na obali Tare",
        }}
      />

      {/* Opis split */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader eyebrow="O smještaju" naslov="Udobnost bez buke grada" />
            <div
              className="mt-6 max-w-xl space-y-4 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              <p>
                Lux bungalovi kampa Konak imaju{" "}
                <strong className="font-semibold text-ink">
                  sopstvena kupatila i toplu vodu
                </strong>{" "}
                — komfor koji poslije dana na rijeci znači sve. Drvo, mekani kreveti i
                zvuk vode umjesto saobraćaja. Namjerno jednostavni — fokus na mir i
                prirodu, ne na luksuz radi luksuza.
              </p>
              <p>
                Dovoljno blizu restoranu i rijeci da sve imate na dohvat ruke, a opet
                izdvojeno taman koliko treba za pravi mir. Idealna baza za rafting,
                kanjoning i izlete u okolini.
              </p>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              src={`${IMG}/smjestaj_kamp_konak.webp`}
              alt="Lux bungalov kampa Konak"
              className="aspect-[4/5] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Dva tipa smještaja */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Kapacitet"
            naslov="Dva tipa smještaja"
          />
          <div className="kon-stay mt-10">
            <StayCard
              naslov="Lux bungalovi"
              badge="13 jedinica · 55 ležajeva"
              opis={
                <>
                  Svaki bungalov ima{" "}
                  <strong className="font-semibold text-ink">sopstveno kupatilo</strong>{" "}
                  i toplu vodu. Namjerno jednostavni — čist, topao i tih prostor za
                  odmor poslije rijeke, sa terasom uz vodu.
                </>
              }
              chips={[
                "13 bungalova",
                "55 ležajeva",
                "Sopstveno kupatilo",
                "Terasa uz rijeku",
              ]}
              href="/rezervacija"
              linkLabel="Rezerviši →"
              slika={{
                src: `${IMG}/smjestaj_kamp_konak.webp`,
                alt: "Lux bungalovi kampa Konak",
              }}
            />
            <StayCard
              naslov="Auto kamp"
              cijena="20€/noć"
              badge="15 vozila"
              opis="Parcele za kampere i šatore na samoj obali — sanitarni čvor, struja i WiFi. Idealno za one koji putuju sa svojom opremom."
              chips={["Sanitarni čvor", "Struja", "WiFi", "Psi dozvoljeni"]}
              href="/rezervacija"
              linkLabel="Rezerviši parcelu →"
              slika={{
                src: `${AUTO}/autokapm-konak.jpg`,
                alt: "Auto kamp na obali Tare — parcele za kampere",
              }}
            />
          </div>
        </div>
      </section>

      {/* Galerija bungalova */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader eyebrow="Galerija" naslov="Pogledaj bungalove" />
          <div className="kon-bgal mt-10">
            {GALERIJA.map((g) => (
              <ImageSlot
                key={g.src}
                src={g.src}
                alt={g.alt}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Šta dobijate */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader eyebrow="Uz smještaj" naslov="Šta dobijate" />
          <div className="kon-bgal mt-10">
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
            Rezerviši svoj bungalov
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            Spojite smještaj sa rafting aranžmanom ili nas pitajte za slobodne termine
            i cijene.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/rezervacija" arrow>
              Rezerviši
            </CtaButton>
            <CtaButton href="/kontakt" variant="secondary">
              Pitaj za termine
            </CtaButton>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingLd) }}
      />
    </>
  );
}
