import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { MenuCard } from "@/components/MenuCard";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Hrana i jelovnik — domaća kuhinja ispod sača | Rafting kamp Konak",
  description:
    "Domaća kuhinja kampa Konak: jela ispod sača, roštilj sa lokalnih farmi, organsko povrće i kolači po bakinim receptima. Doručak, ručak, večera i rakija dobrodošlice.",
  keywords: [
    "hrana rafting kamp",
    "jela ispod sača Tara",
    "domaća kuhinja Foča",
    "restoran Šćepan Polje",
    "orgska hrana",
    "rakija dobrodošlice",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/hrana" },
  openGraph: {
    title: "Hrana i jelovnik — domaća kuhinja ispod sača",
    description:
      "Kuhinja koja se pamti — domaće namirnice sa farmi Spasojevići i okoline, jela ispod sača i roštilj uz vatru.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/hrana";

const JELOVNIK = [
  {
    eyebrow: "Doručak",
    naslov: "Balkanski doručak",
    opis:
      "Dan počinje obilno — domaće pite i topli uštipci, suhomesnati proizvodi i vrhunski sirevi sa planine, omleti i kobasice. Taman snaga prije spusta niz Taru.",
    slika: {
      src: `${IMG}/dorucak_konak.jpg`,
      alt: "Domaći doručak — pite i sirevi",
    },
  },
  {
    eyebrow: "Ručak",
    naslov: "Ispod sača",
    opis:
      "Domaća kremasta čorba za početak, a onda glavni adut — sočna teletina od domaćeg teleta ispod sača, sa domaćim hljebom koji se peče na isti način. Strpljivo, pod žarom, kako se jedino i može valjano.",
    slika: {
      src: `${IMG}/corba_rucak.jpg`,
      alt: "Teletina ispod sača i domaća čorba",
    },
  },
  {
    eyebrow: "Večera",
    naslov: "Uz vatru i čašu vina",
    opis:
      "Roštilj od mesa sa lokalnih farmi, uz sveže salate od povrća iz okolnih bašta. Sve se najljepše jede uz vatru, kraj kamina, sa čašom vina i pričom koja se otegne do kasno.",
    slika: {
      src: `${IMG}/dorucak_konak1.jpg`,
      alt: "Večera u kampu Konak — domaća jela uz vatru",
    },
  },
  {
    eyebrow: "Desert",
    naslov: "Po bakinim receptima",
    opis:
      "Za kraj — domaći kolači rađeni po receptima iz bakine kuhinje. Organski, bez vještačkih dodataka, onako slatki kako treba i taman da zaokruže dan.",
    slika: {
      src: `${IMG}/dezert.jpg`,
      alt: "Domaći deserti po bakinim receptima",
    },
  },
];

export default async function HranaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Rafting kamp Konak — restoran",
    servesCuisine: "Domaća, balkanska",
    url: `${SITE}/hrana`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hum, Foča",
      addressCountry: "BA",
    },
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: JELOVNIK.map((j) => ({
        "@type": "MenuSection",
        name: j.naslov,
        description: j.opis,
      })),
    },
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow="Hrana u kampu"
        naslov={
          <>
            Kuhinja koja
            <br />
            se pamti
          </>
        }
        lead="Mnogi nam se vrate i zbog rijeke, i zbog onoga što ih čeka kad se vrate s vode. Kuvamo srcem, od domaćih namirnica sa okolnih farmi."
        slika={{
          src: `${IMG}/rucak_konak.jpg`,
          alt: "Domaći ručak u rafting kampu Konak",
        }}
      />

      {/* Uvod */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container space-y-4 font-sans text-body"
          style={{
            maxWidth: "880px",
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.65,
          }}
        >
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Hrana je kod nas dio doživljaja, a ne usputna obaveza.
          </p>
          <p>
            U kuhinji kampa Konak sve počinje od namirnice. Meso dolazi sa porodične
            farme <strong className="font-semibold text-ink">Spasojevići</strong> sa
            planine <strong className="font-semibold text-ink">Zavait (1600 m)</strong>,
            povrće iz okolnih bašti, a sirevi i mliječni proizvodi sa planinskih pašnjaka.
            Trudimo se da na sto stavimo ono što je zdravo, organsko i odgojeno bez žurbe
            — onako kako se nekad jelo. Za goste koji ne jedu meso pripremamo vegetarijanska
            i veganska jela, samo nam javite na vrijeme.
          </p>
          <p>
            A prije svega — svakog gosta dočekamo rakijom dobrodošlice. To je kod nas red.
          </p>
        </div>
      </section>

      {/* Kuvar Brane — istaknuti blok */}
      <section className="kon-section">
        <div className="kon-container">
          <div
            className="kon-split kon-split-stack overflow-hidden rounded-card-lg border border-mint-border bg-mint-surface"
            style={{ ["--split-cols" as string]: "0.95fr 1.05fr" }}
          >
            <div className="kon-split-media p-0 sm:p-0">
              <ImageSlot
                className="aspect-[4/5] w-full sm:min-h-[320px] sm:rounded-none"
                gradient="var(--gradient-slot-2)"
                sizes="(max-width: 960px) 100vw, 480px"
              />
            </div>
            <div className="kon-split-body px-6 py-8 sm:px-10 sm:py-10">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
                Naša kuhinja
              </span>
              <h2
                className="mt-3 font-display font-extrabold text-pine"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                Kuvar Brane
              </h2>
              <p
                className="mt-5 font-sans text-body"
                style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
              >
                Brane vodi kuhinju kampa već od prvog dana — sač, roštilj i domaći hljeb
                peče se po receptima koje je naučio u porodici Spasojević. Zna tačno koje
                meso sa Zavaita ide ispod sača, koliko treba strpljenja za čorbu i kako da
                svaki obrok bude ono što gosti pamte kad se vrate kući.
              </p>
              <p
                className="mt-4 font-sans text-sm font-semibold text-text-secondary"
              >
                Domaća kuhinja · farme Spasojevići · Zavait 1600 m
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jelovnik 2×2 */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <div className="kon-menu">
            {JELOVNIK.map((j) => (
              <MenuCard key={j.naslov} {...j} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kon-section">
        <div className="kon-container">
          <div
            className="flex flex-col items-center rounded-card-lg px-8 py-12 text-center sm:px-12 sm:py-14"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h2
              className="font-display font-extrabold text-white"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Gladni poslije rijeke?
            </h2>
            <p
              className="mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              Obroci su uključeni u višednevne aranžmane. Za grupe i posebne želje
              (vegetarijansko, vegansko) javite nam unaprijed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/rezervacija" arrow>
                Rezerviši boravak
              </CtaButton>
              <CtaButton href="/kontakt" variant="ghost">
                Pitaj za grupe
              </CtaButton>
            </div>
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
