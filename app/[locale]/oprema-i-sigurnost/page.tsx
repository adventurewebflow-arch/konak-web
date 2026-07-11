import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ImageSlot } from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "Oprema i sigurnost — certifikovani skiperi i kompletna oprema | Konak",
  description:
    "Kako brinemo o vašoj sigurnosti na Tari: certifikovani skiperi i vodiči, nova oprema po savremenim standardima, sigurnosni brifing i procjena vremenskih uslova prije svake ture.",
  keywords: [
    "rafting sigurnost",
    "rafting oprema",
    "certifikovani skiperi",
    "sigurnosni brifing rafting",
    "je li rafting bezbjedan",
    "kacige prsluci rafting",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/oprema-i-sigurnost" },
  openGraph: {
    title: "Oprema i sigurnost — Rafting kamp Konak",
    description:
      "Certifikovani skiperi, nova oprema i jasna pravila na svakoj turi.",
    type: "article",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const OPREMA: { naslov: string; opis: string; ikona: ReactNode }[] = [
  {
    naslov: "Neoprensko odijelo",
    opis: "Drži toplotu i u hladnoj vodi",
    ikona: <IconSuit />,
  },
  {
    naslov: "Neoprenske čizme",
    opis: "Štite stopala na stijenama",
    ikona: <IconBoot />,
  },
  {
    naslov: "Sigurnosni prsluk",
    opis: "Plovnost i sigurnost u vodi",
    ikona: <IconVest />,
  },
  {
    naslov: "Kaciga",
    opis: "Obavezna na svakom spustu",
    ikona: <IconHelmet />,
  },
  {
    naslov: "Veslo",
    opis: "Lagano i izdržljivo",
    ikona: <IconPaddle />,
  },
];

function IconSuit() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h8l2 4v12l-4-2-2 2-2-2-4 2V8l2-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBoot() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 10V6a2 2 0 0 1 2-2h2v16H6a2 2 0 0 1-2-2v-6h0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 4h6l2 6v8h-8V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconVest() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4 8 8v12l4-2 4 2V8l-4-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHelmet() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 14V10a6 6 0 1 1 12 0v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconPaddle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 5h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function OpremaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Oprema i sigurnost — Rafting kamp Konak",
    about: "Sigurnost i oprema za rafting na Tari",
    author: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
    url: `${SITE}/oprema-i-sigurnost`,
    publisher: {
      "@type": "Organization",
      name: "Rafting kamp Konak",
    },
  };

  const bodyStyle = {
    fontSize: "clamp(16px, 1.4vw, 19px)",
    lineHeight: 1.65,
  } as const;

  return (
    <>
      <Hero
        variant="b"
        visina="52vh"
        eyebrow="Oprema i sigurnost"
        naslov={
          <>
            Vaša sigurnost,
            <br />
            naš posao
          </>
        }
        lead="Rijeka se poštuje, ne potcjenjuje. Zato kod nas ništa nije prepušteno slučaju — od opreme do procjene vremena."
      />

      {/* Uvod */}
      <section className="kon-section">
        <div
          className="kon-container space-y-4 font-sans text-body"
          style={{
            maxWidth: "880px",
            ...bodyStyle,
          }}
        >
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Avantura i sigurnost nisu suprotnosti — kod nas idu zajedno.
          </p>
          <p className="text-text-secondary">
            Sa preko 20 godina na Tari, naši skiperi su rijeku upoznali u svakom
            raspoloženju — i kad je mirna kao jezero, i kad nosi. Tu vrstu iskustva
            ne može da zamijeni nijedan papir. Ali uz to dolaze i certifikati,
            provjerena oprema i jasna pravila kojih se držimo na svakoj turi, bez
            izuzetka.
          </p>
        </div>
      </section>

      {/* Vodiči split */}
      <section className="kon-section bg-sand">
        <div
          className="kon-container kon-split kon-split-stack"
          style={{ ["--split-cols" as string]: "1fr 1fr" }}
        >
          <div className="kon-split-media">
            <ImageSlot
              src="/images/rafting/rafting-galerija8.jpg"
              alt="Certifikovani skiper i grupa u opremi na Tari"
              className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
              sizes="(max-width: 960px) 100vw, 520px"
            />
          </div>
          <div className="kon-split-body">
            <SectionHeader
              eyebrow="Vodiči"
              naslov="Certifikovani skiperi u svakom čamcu"
            />
            <p
              className="mt-6 max-w-xl font-sans text-body text-text-secondary"
              style={bodyStyle}
            >
              Svaku turu vodi certifikovani skiper koji rijeku poznaje napamet —
              svaki buk, svaku struju i svako sigurno mjesto za pauzu. On bira
              liniju, daje komande i prilagođava tempo grupi. Vi samo slušate i
              uživate.
            </p>
          </div>
        </div>
      </section>

      {/* Ulaganje u opremu */}
      <section className="kon-section">
        <div className="kon-container">
          <div
            className="mx-auto max-w-3xl overflow-hidden rounded-card-lg border border-mint-border bg-mint-surface px-6 py-8 sm:px-10 sm:py-10"
          >
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
              Naša oprema
            </span>
            <h2
              className="mt-3 font-display font-extrabold text-pine"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              Nova oprema, po savremenim standardima
            </h2>
            <div className="mt-5 space-y-4 font-sans text-body text-text-secondary" style={bodyStyle}>
              <p>
                Oprema je jedino mjesto gdje ne štedimo. Naša oprema je nova i
                usklađena sa savremenim standardima — čamci, prsluci, kacige,
                neopren, vesla. Ništa od toga nije naslijeđeno, iznajmljeno ni „dobro
                još malo".
              </p>
              <p>
                U opremu ulažemo kontinuirano, svake sezone. To je značajan trošak i
                mnogi kampovi tu prave uštedu — mi ne pravimo. Prosto: čovjek koji
                vam sjedi u čamcu je nečiji otac, nečije dijete, i to je jedina
                računica koja nas zanima.
              </p>
              <p>
                Oprema se redovno održava i kontroliše. Prije svake sezone i tokom
                nje pregledamo sve — svaki prsluk, svaku kacigu, svaki čamac. Ono
                što pokaže i najmanji znak istrošenosti ne ide više na vodu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oprema — 5 kartica */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader eyebrow="Oprema" naslov="Kompletna oprema, na vas spremna" />
          <div className="kon-eq mt-10">
            {OPREMA.map((o) => (
              <div
                key={o.naslov}
                className="rounded-card border border-line bg-surface p-5 text-center"
              >
                <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-mint-surface text-teal">
                  {o.ikona}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">
                  {o.naslov}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {o.opis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brifing + vrijeme */}
      <section className="kon-section">
        <div
          className="kon-container kon-split"
          style={{ ["--split-cols" as string]: "1fr 1fr", gap: "18px" }}
        >
          <article className="rounded-card-lg border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold text-pine">
              Sigurnosni brifing
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-secondary">
              Prije svake ture skiper objasni komande veslanja, kako se ponašati u
              brzaku i šta raditi ako neko upadne u vodu. Kratko, jasno i bez
              preskakanja — tek kad su svi spremni, krećemo. Ni jedna tura nije
              krenula bez brifinga, i nikad neće.
            </p>
          </article>
          <article className="rounded-card-lg border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-bold text-pine">
              Procjena vremena
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-secondary">
              Rijeka i vrijeme se mijenjaju, a sigurnost gostiju nam je uvijek na
              prvom mjestu. Zadržavamo pravo da, ako uslovi nisu povoljni, pomjerimo
              ili prilagodimo turu. Radije ćemo vas razočarati jednim danom nego
              rizikovati — i to nam još niko nije zamjerio.
            </p>
          </article>
        </div>

        <div className="kon-container mt-5">
          <article className="rounded-card-lg border border-mint-border bg-mint-surface p-6 sm:p-7">
            <h2 className="font-display text-lg font-bold text-pine sm:text-xl">
              Iskustvo nije potrebno
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-text-secondary">
              Osnovna fizička spremnost i želja za avanturom su dovoljni — sve
              ostalo naučićete na licu mjesta, a skiper je sve vrijeme sa vama u
              čamcu.
            </p>
          </article>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
