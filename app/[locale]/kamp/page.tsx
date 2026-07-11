import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { StayCard } from "@/components/StayCard";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Kamp Konak — lux bungalovi, auto kamp i restoran | Hum, Foča",
  description:
    "Rafting kamp Konak na obali u Humu kod Foče: 55 jedinica, lux bungalovi sa sopstvenim kupatilom, auto kamp 20€/noć (struja, toalet, psi dozvoljeni) i restoran domaće kuhinje.",
  keywords: [
    "rafting kamp Konak",
    "lux bungalovi Tara",
    "auto kamp Foča",
    "smeštaj rafting Tara",
    "kamp na Drini",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/kamp" },
  openGraph: {
    title: "Kamp Konak — domaćinstvo na obali",
    description:
      "Porodično domaćinstvo na ušću Tare i Pive u Drinu — lux bungalovi, auto kamp i domaća kuhinja.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const ATMOSFERA = [
  { label: "Kamp uz rijeku", gradient: "var(--gradient-slot-1)" },
  { label: "Veče u kampu", gradient: "var(--gradient-slot-2)" },
  { label: "Priroda oko kampa", gradient: "var(--gradient-slot-3)" },
];

const POGODNOSTI: { naslov: string; opis: string; ikona: ReactNode }[] = [
  {
    naslov: "Na samoj obali",
    opis: "Korak do rijeke, okruženi netaknutom prirodom",
    ikona: <IconWaves />,
  },
  {
    naslov: "Privatno kupatilo",
    opis: "Svaka jedinica sa sopstvenim toaletom",
    ikona: <IconBath />,
  },
  {
    naslov: "Parking sa nadzorom",
    opis: "Besplatan i obezbijeđen parking za goste",
    ikona: <IconParking />,
  },
  {
    naslov: "Ljubimci dobrodošli",
    opis: "Psi su dozvoljeni u auto kampu",
    ikona: <IconPaw />,
  },
];

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

function IconParking() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8v8M10 8h3a2 2 0 0 1 0 4h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconPaw() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="7" r="1.6" fill="currentColor" />
      <circle cx="16" cy="9" r="1.6" fill="currentColor" />
      <path
        d="M7 13c1.2 2.5 3.8 4 5 4s3.8-1.5 5-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function KampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction", "Campground"],
    name: "Rafting kamp Konak",
    description:
      "Porodično domaćinstvo na obali Tare i Pive u Humu kod Foče — lux bungalovi, auto kamp i restoran.",
    url: `${SITE}/kamp`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.3528783,
      longitude: 18.8229302,
    },
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow="Kamp Konak"
        naslov="Domaćinstvo na obali"
        lead="Tamo gdje se Tara i Piva spajaju u Drinu, u Humu kod Foče. Vaša baza za avanturu — topla, mirna i na samoj rijeci."
        slika={{
          src: "/images/kamp/dobra_slika_konaka.webp",
          alt: "Rafting kamp Konak na obali Tare",
        }}
      />

      {/* 4.3 — O KAMPU split */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow="O kampu"
              naslov="Kod nas ste gost, a ne broj sobe."
            />
            <div
              className="mt-6 max-w-xl space-y-4 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              <p>
                Kamp Konak je porodično domaćinstvo koje već šest godina ugošćava
                avanturiste sa svih strana — bez ijedne loše recenzije. Smješten je
                na samoj obali, na ušću Tare i Pive u Drinu, okružen borovom šumom i
                strmim liticama kanjona.
              </p>
              <p>
                Sve je okrenuto vašoj udobnosti: lux bungalovi sa privatnim
                kupatilom, nova rafting oprema po najvišim standardima i
                profesionalni skiperi. Bez gužve, bez žurbe — samo rijeka, priroda i
                mir.
              </p>
              <p>
                Dan na rijeci završava se uz roštilj, piće dobrodošlice i tišinu
                kanjona — onako kako to samo pravi domaćini umiju.
              </p>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              className="aspect-[4/5] w-full rounded-card-lg shadow-soft"
              gradient="var(--gradient-slot-2)"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* 4.4 — ATMOSFERA galerija */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader eyebrow="Atmosfera" naslov="Život u kampu" />
          <div className="kon-atmos mt-10">
            {ATMOSFERA.map((item, i) => (
              <ImageSlot
                key={item.label}
                className={`rounded-card ${i === 0 ? "aspect-[16/10] min-h-[220px]" : "aspect-[4/3]"}`}
                gradient={item.gradient}
                sizes="(max-width: 920px) 50vw, 400px"
              >
                <span className="absolute bottom-4 left-4 rounded-pill bg-pine/85 px-3 py-1 font-sans text-xs font-bold text-white backdrop-blur-sm">
                  {item.label}
                </span>
              </ImageSlot>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 — SMEŠTAJ teaser */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader eyebrow="Smeštaj" naslov="Gdje spavate poslije rijeke" />
          <div className="kon-stay mt-10">
            <StayCard
              naslov="Lux bungalovi"
              badge="u aranžmanu"
              opis={
                <>
                  Udoban smeštaj sa{" "}
                  <strong className="font-semibold text-ink">sopstvenim kupatilom</strong>{" "}
                  u svakoj jedinici. Topao, čist i tih prostor za odmor poslije rijeke.
                </>
              }
              chips={["Sopstveno kupatilo", "Posteljina i peškiri", "Terasa uz rijeku"]}
              href="/smjestaj"
              gradient="var(--gradient-slot-1)"
            />
            <StayCard
              naslov="Auto kamp"
              cijena="20€/noć"
              opis="Prostrane parcele za kampere i šatore na samoj obali. Sve što treba na jednom mjestu, uz pristup restoranu."
              chips={["Struja", "Toalet i tuš", "Psi dozvoljeni", "Parking"]}
              href="/smjestaj"
              gradient="var(--gradient-slot-3)"
            />
          </div>
        </div>
      </section>

      {/* 4.7 — POGODNOSTI */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader eyebrow="Udobnost" naslov="Pogodnosti kampa" />
          <div className="kon-amen mt-10">
            {POGODNOSTI.map((p) => (
              <div
                key={p.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {p.ikona}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {p.opis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.9 — CTA */}
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
            Dođite kao gost, vratite se kao prijatelj.
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            Rezervišite smeštaj i rafting turu na jednom mjestu — javljamo se sa
            potvrdom i tačnim terminom.
          </p>
          <div className="mt-8">
            <CtaButton href="/rezervacija" arrow>
              Rezerviši smeštaj i turu
            </CtaButton>
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
