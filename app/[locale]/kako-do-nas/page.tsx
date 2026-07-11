import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Kako do nas — Hum, Foča (sastav Tare i Pive) | Rafting kamp Konak",
  description:
    "Kako doći do rafting kampa Konak u Humu (Foča), tamo gdje se Tara i Piva spajaju u Drinu. Putokaz iz Sarajeva, Podgorice, Dubrovnika i Beograda, GPS, Google mapa i besplatan parking.",
  keywords: [
    "kako do rafting kamp Konak",
    "Hum Foča lokacija",
    "rafting Tara put",
    "Šćepan Polje pristup",
    "sastav Tare i Pive",
    "parking rafting",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/kako-do-nas" },
  openGraph: {
    title: "Kako do nas — Hum, Foča",
    description:
      "Kamp Konak na sastavu Tare i Pive — oko 20 km od Foče, besplatan parking i prostor za autobus.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";
const LAT = 43.3528783;
const LNG = 18.8229302;
const MAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;
const MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

const INFO = [
  { label: "Adresa", value: "Hum, Foča 73300, BiH" },
  {
    label: "GPS koordinate",
    value: `${LAT}, ${LNG}`,
  },
  {
    label: "Udaljenost",
    value: "~20 km od Foče · ~2 km od sastava rijeka",
  },
  {
    label: "Parking",
    value: "Besplatan, sa video nadzorom · prostor za autobus",
  },
];

const RUTE = [
  {
    naslov: "Iz Sarajeva",
    opis: "Preko Trnova i Foče do Huma.",
    meta: "90 km",
  },
  {
    naslov: "Iz Podgorice",
    opis: "Preko Nikšića i Plužina, dolinom Pive do Šćepan Polja i Huma.",
    meta: "140 km",
  },
  {
    naslov: "Iz Dubrovnika",
    opis: "Preko Trebinja i Nikšića, pa dolinom Pive.",
    meta: "180 km",
  },
  {
    naslov: "Iz Beograda",
    opis: "Preko Užica i Foče do Huma.",
    meta: "350 km",
  },
];

const SAVJETI = [
  {
    naslov: "Ponesite gotovinu",
    tekst:
      "Plaćanje u kampu je isključivo u gotovini — kartice ne primamo. Foča je posljednje mjesto na putu gdje ima banaka i bankomata, pa podignite novac tamo. Poslije Foče, do kampa nema gdje.",
  },
  {
    naslov: "Natočite gorivo u Foči",
    tekst:
      "Foča je posljednje veće mjesto prije kanjona. Tu su pumpe, prodavnice i apoteka. Kroz kanjon do kampa nema ničega — samo rijeka i stijene.",
  },
  {
    naslov: "Put kroz kanjon je vijugav",
    tekst:
      "Posljednjih dvadesetak kilometara vozite uz rijeku, kroz kanjon. Put je uzak i krivudav, i nije za žurbu — ali je i sam po sebi lijep. Računajte malo više vremena nego što vam navigacija kaže.",
  },
  {
    naslov: "Signal slabi u kanjonu",
    tekst:
      "U kanjonu mobilni signal zna da nestane. Ako se izgubite ili kasnite, javite nam prije nego uđete u kanjon. Preuzmite mapu offline za svaki slučaj.",
  },
  {
    naslov: "Dolazak nije vezan za sat",
    tekst:
      "Nemamo fiksni sat prijave. Dođite kad vam odgovara — dočekaćemo vas.",
  },
  {
    naslov: "Parking",
    tekst:
      "Besplatan, pod video nadzorom, ima mjesta i za autobus.",
  },
  {
    naslov: "Dokumenti",
    tekst:
      "Ponesite ličnu kartu ili pasoš — rijeka na dijelu toka prolazi kroz dvije države, a i granični prelaz Šćepan Polje je odmah tu.",
  },
];

export default async function KakoDoNasPage({
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
    url: `${SITE}/kako-do-nas`,
    telephone: "+38765848110",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hum",
      addressLocality: "Foča",
      postalCode: "73300",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LAT,
      longitude: LNG,
    },
    hasMap: MAPS_URL,
  };

  return (
    <>
      <Hero
        variant="b"
        visina="50vh"
        eyebrow="Kako do nas"
        naslov="Tamo gdje nastaje Drina"
        lead="Kamp Konak nalazi se u Humu kod Foče — na samom sastavu Tare i Pive, gdje se dvije rijeke spajaju u Drinu. Oko 20 km od Foče i svega 2 km od mjesta gdje se rijeke sastaju."
      />

      {/* Lokacija split */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader eyebrow="Lokacija" naslov="Hum, Foča (73300)" />
            <p
              className="mt-6 max-w-xl font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
            >
              Smješteni smo na granici Bosne i Hercegovine i Crne Gore, u mjestu Hum
              nadomak Šćepan Polja. To je polazna tačka za rafting niz Taru i idealna
              baza za izlete u NP Sutjeska, na Durmitor i Pivsko jezero.
            </p>
            <dl className="mt-8 space-y-4">
              {INFO.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-sans text-base font-semibold text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="kon-split-media">
            <iframe
              title="Google mapa — Rafting kamp Konak, Hum Foča"
              src={MAPS_EMBED}
              className="w-full rounded-card-lg border border-line shadow-soft"
              style={{ height: "clamp(320px, 46vh, 440px)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Rute */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader eyebrow="Putokazi" naslov="Kako doći do kampa" />
          <div className="kon-routes mt-8">
            {RUTE.map((r) => (
              <article
                key={r.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {r.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {r.opis}
                </p>
                <p className="mt-3 font-sans text-sm font-semibold text-muted">
                  {r.meta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Korisni savjeti */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Prije nego krenete"
            naslov="Nekoliko stvari koje je dobro znati"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAVJETI.map((s) => (
              <article
                key={s.naslov}
                className="rounded-card border border-line bg-surface p-6"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {s.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {s.tekst}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaButton href={MAPS_URL} arrow>
              Otvori navigaciju u Google Maps
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
