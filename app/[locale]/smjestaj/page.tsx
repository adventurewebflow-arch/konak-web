import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Smještaj — lux bungalovi i auto kamp na Tari | Rafting kamp Konak",
  description:
    "13 lux bungalova sa sopstvenim kupatilom i auto kamp na sastavu Tare i Pive. Mir rijeke, topla voda i domaća kuhinja — smještaj uz rafting aranžmane. Hum, Foča.",
  keywords: [
    "bungalovi Tara",
    "smještaj Šćepan Polje",
    "lux bungalovi Foča",
    "rafting smještaj",
    "auto kamp Tara",
    "kamp Konak smještaj",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/smjestaj" },
  openGraph: {
    title: "Smještaj — bungalovi i auto kamp | Rafting kamp Konak",
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
    naslov: "WiFi i struja",
    opis: "Veza i struja kad trebaju — bez gužve u kampu",
    ikona: <IconWifi />,
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

function IconWifi() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5a9 9 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
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
  };

  const bodyCls =
    "font-sans text-body text-text-secondary";
  const bodyStyle = {
    fontSize: "clamp(16px, 1.4vw, 19px)",
    lineHeight: 1.65,
  } as const;

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow="Smještaj · bungalovi i auto kamp"
        naslov={
          <>
            San na obali{" "}
            <span className="text-teal-light">tri rijeke.</span>
          </>
        }
        lead="Naši lux bungalovi i auto kamp smješteni su tamo gdje se Tara i Piva spajaju u Drinu. Mir vode, planinski vazduh i topla domaća kuhinja na korak od kreveta."
        slika={{
          src: `${IMG}/smjestaj_hero.webp.webp`,
          alt: "Lux bungalovi kampa Konak na obali Tare",
        }}
      />

      {/* Uvod — uski blok */}
      <section className="kon-section">
        <div
          className="kon-container space-y-5"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <p
            className="font-display text-xl font-semibold text-ink sm:text-2xl"
            style={{ lineHeight: 1.35 }}
          >
            Kod nas se ne dolazi da se sjedi u sobi.
          </p>
          <p className={bodyCls} style={bodyStyle}>
            Dan na Tari vas isprazni onako kako vas grad nikad ne isprazni — vesla,
            voda, sunce, adrenalin. Kad se uveče vratite, ne treba vam luksuz. Treba
            vam topla voda, čist krevet i tišina. To je tačno ono što smo napravili.
          </p>
          <p className={bodyCls} style={bodyStyle}>
            Kamp leži na samoj obali, na sastavu Tare i Pive, tamo gdje nastaje
            Drina. Nema saobraćaja, nema gradske buke — samo rijeka koja radi svoje
            cijelu noć. Gosti nam često kažu da su tu spavali najbolje u životu, i
            mi se tome više ni ne čudimo.
          </p>
        </div>
      </section>

      {/* Bungalovi */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1.05fr 0.95fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader
              eyebrow="Lux bungalovi"
              naslov="Trinaest bungalova, svaki sa svojim kupatilom"
            />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                Kamp ima{" "}
                <strong className="font-semibold text-ink">
                  13 bungalova sa ukupno 55 ležajeva, i svaki bungalov ima sopstveno
                  kupatilo i toplu vodu
                </strong>
                . To zvuči kao sitnica dok ne provedete dan u kanjonu — a onda
                shvatite da je to sve što vam treba.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Bungalovi su od drveta, i to se osjeti. Miriše na drvo, hladi ljeti,
                drži toplotu kad zahladi. Za produženu sezonu imamo grijalice, pa je
                i septembarska noć prijatna.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Namjerno su jednostavni. Čist, udoban krevet, vaše kupatilo, i to je
                to. Bez televizora, bez frke, bez razloga da ostanete unutra. Kod
                nas se dan provodi na vodi, veče uz vatru i večeru, a bungalov je tu
                za ono jedino što poslije toga stvarno treba — miran san uz zvuk
                rijeke.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Ako vas dvoje rezerviše bungalov, on ostaje samo za vas. Ne gura se
                ekipa u sobu da se popuni.
              </p>
              <p className="font-sans text-sm font-semibold text-muted">
                Bungalovi idu uz rafting aranžmane — ne kao samostalno noćenje.
              </p>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              src={`${IMG}/smjestaj_kamp_konak.webp`}
              alt="Lux bungalov kampa Konak na obali"
              className="aspect-[4/5] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Veče u kampu */}
      <section className="kon-section">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "0.95fr 1.05fr" }}
        >
          <div className="kon-split-media">
            <ImageSlot
              src={`${IMG}/kamp_konak1.webp`}
              alt="Veče u kampu Konak — atmosfera uz rijeku"
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
          <div className="kon-split-body">
            <SectionHeader
              eyebrow="Veče u kampu"
              naslov="Ono što se ne planira, a najviše se pamti"
            />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                Najbolje na Tari se ne dešava na rijeci. Dešava se uveče, kad se svi
                vrate, istuširaju, i sjednu za sto. Vatra, večera iz Branove kuhinje,
                čaša vina, i priča koja krene o bukovima a završi se negdje sasvim
                drugdje.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Ljudi koji su se ujutru upoznali u čamcu, uveče se ponašaju kao da se
                znaju godinama. To nije nešto što mi organizujemo — to rijeka uradi
                za nas.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Psi su dobrodošli. Parking je besplatan i pod video nadzorom. Rijeka
                je na dva koraka i ne pita ništa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Auto kamp */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1.05fr 0.95fr" }}
        >
          <div className="kon-split-body">
            <SectionHeader eyebrow="Auto kamp" naslov="Dođi svojim kamperom" />
            <div className="mt-6 max-w-xl space-y-4">
              <p className={bodyCls} style={bodyStyle}>
                Za one koji putuju svojim kamperom ili šatorom, naš auto kamp prima
                do 15 vozila — dovoljno prostora da svako ima svoj mir, a ne da vam
                komšija bude u prozoru. Uz kamp idu sanitarni čvor, struja i WiFi, a
                domaća kuhinja i rijeka su na par koraka.
              </p>
              <p className={bodyCls} style={bodyStyle}>
                Cijena je{" "}
                <strong className="font-semibold text-ink">20 € po noći</strong>.
                Jednostavno, pošteno, i tačno onako kako kampovanje na Tari treba da
                izgleda.
              </p>
              <div className="pt-2">
                <CtaButton href="/rezervacija" variant="secondary" arrow>
                  Rezerviši parcelu
                </CtaButton>
              </div>
            </div>
          </div>
          <div className="kon-split-media">
            <ImageSlot
              src={`${AUTO}/autokapm-konak.jpg`}
              alt="Auto kamp Konak — parcele za kampere uz rijeku"
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* Galerija */}
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
            Rezerviši svoj kutak
          </h2>
          <p className={`mt-5 max-w-xl ${bodyCls}`} style={bodyStyle}>
            Smještaj ide uz naše rafting aranžmane. Javite se sa datumom i brojem
            osoba — sklopićemo ostalo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/ponuda" arrow>
              Pogledaj ponudu
            </CtaButton>
            <CtaButton href="/rezervacija" variant="secondary">
              Pošalji upit
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
