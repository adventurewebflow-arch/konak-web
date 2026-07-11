import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureSplit } from "@/components/FeatureSplit";
import { ActivityCard } from "@/components/ActivityCard";
import { GroupInquiryForm } from "@/components/GroupInquiryForm";

export const metadata: Metadata = {
  title: "Teambuilding i grupe — rafting, kanjoning, smještaj | Rafting kamp Konak",
  description:
    "Teambuilding i grupni aranžmani u kampu Konak: rafting na Tari, kanjoning, planinski izleti, smještaj do 55 ležajeva, domaća kuhinja i livada za timske aktivnosti.",
  keywords: [
    "teambuilding rafting",
    "grupe Tara",
    "corporate retreat BiH",
    "tim building Foča",
    "grupni aranžman rafting",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/teambuilding" },
  openGraph: {
    title: "Teambuilding i grupe — Rafting kamp Konak",
    description:
      "Tim koji dijeli avanturu na rijeci jača na obali — smještaj, hrana i aktivnosti na jednom mjestu.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const AKTIVNOSTI = [
  {
    kategorija: "Tim na vodi",
    naslov: "Rafting za timove",
    trajanje: "1–4 dana",
    nivo: "pocetnici" as const,
    opis:
      "Spust niz Taru u istom čamcu — koordinacija, povjerenje i adrenalin koji tim spaja bolje nego bilo koja sala.",
    cijena: "na upit",
    href: "/rafting",
    gradient: "var(--gradient-slot-1)",
  },
  {
    kategorija: "Adrenalin",
    naslov: "Kanjoning",
    trajanje: "1 dan",
    nivo: "srednje" as const,
    opis:
      "Nevidio ili Hrčavka — izlazak iz zone komfora zajedno, uz iskusne vodiče i opremu po najvišim standardima.",
    cijena: "na upit",
    href: "/kanjoning",
    gradient: "var(--gradient-slot-2)",
  },
  {
    kategorija: "Priroda",
    naslov: "NP Sutjeska i planina",
    trajanje: "cijeli dan",
    nivo: "lagano" as const,
    opis:
      "Prašuma Perućica, Trnovačko jezero ili Maglić — dan u prirodi kao predah od vode i prilika za timsku povezanost.",
    cijena: "na upit",
    href: "/izleti",
    gradient: "var(--gradient-slot-3)",
  },
];

const PONUDA: { naslov: string; opis: string; ikona: ReactNode }[] = [
  {
    naslov: "Smještaj za grupe",
    opis:
      "13 bungalova i 55 ležajeva — privatna kupatila, mir uz rijeku i kapacitet za firme, škole i sportske timove od 4 do 55 osoba.",
    ikona: <IconBed />,
  },
  {
    naslov: "Hrana za cijeli tim",
    opis:
      "Pun pansion domaće kuhinje — jela ispod sača, roštilj i prilagođeni meniji. Vegetarijansko i vegansko na upit.",
    ikona: <IconMeal />,
  },
  {
    naslov: "Livada i prostor",
    opis:
      "Prostrana livada uz kamp — idealna za timske igre, prezentacije na otvorenom, roštilj i večernje druženje uz vatru.",
    ikona: <IconMeadow />,
  },
];

function IconBed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M4 12v4h16v-4M4 12h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMeal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 4v8M10 4v8M6 8h4M14 4v16M18 8v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMeadow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21V9M8 21V13M16 21V13M4 21h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9c-2-3-5-4-7-3 2 1 4 3 7 3s5-2 7-3c-2-1-5 0-7 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function TeambuildingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Teambuilding i grupni aranžmani — Rafting kamp Konak",
    description:
      "Teambuilding programi sa raftingom, kanjoningom i planinskim izletima. Smještaj, domaća hrana i livada za grupe od 4 do 55 osoba.",
    url: `${SITE}/teambuilding`,
    provider: {
      "@type": "LocalBusiness",
      name: "Rafting kamp Konak",
      telephone: "+38765848110",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hum, Foča",
        addressCountry: "BA",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Bosnia and Herzegovina",
    },
    serviceType: "Teambuilding",
  };

  return (
    <>
      <Hero
        variant="b"
        visina="58vh"
        eyebrow="Teambuilding i grupe"
        naslov={
          <>
            Tim koji dijeli
            <br />
            avanturu, jača
          </>
        }
        lead="Firme, škole i sportske ekipe — sve na jednom mjestu uz Taru. Rafting, kanjoning, smještaj i domaća kuhinja bez logističke muke."
      />

      {/* Zašto Konak */}
      <section className="kon-section">
        <div className="kon-container">
          <FeatureSplit
            eyebrow="Zašto Konak"
            naslov="Sve što timu treba — na obali rijeke."
            opis="Nema transfera po gradu, nema gužve u restoranu u pet sati poslije podne. Kamp Konak je zatvoreni ekosistem: smještaj, hrana, oprema i vodiči na istom mjestu. Tim provodi dan na vodi ili u kanjonu, veče uz roštilj i rakiju dobrodošlice, a livada čeka za timske igre ili prezentacije."
            chips={[
              "Do 55 ležajeva",
              "Profesionalni vodiči",
              "Pun pansion",
              "Livada za grupe",
              "Parking za autobus",
            ]}
            imageBadge="Grupe 4+"
            imageGradient="var(--gradient-slot-1)"
          />
        </div>
      </section>

      {/* 3 aktivnosti */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Aktivnosti"
            naslov="Program po mjeri vašeg tima"
          />
          <div className="kon-acts mt-10">
            {AKTIVNOSTI.map((a) => (
              <ActivityCard key={a.naslov} {...a} ctaLabel="Detaljnije →" />
            ))}
          </div>
        </div>
      </section>

      {/* Smještaj / hrana / livada */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Za grupe"
            naslov="Smještaj, hrana i livada"
          />
          <div className="kon-grp-offer mt-10">
            {PONUDA.map((p) => (
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

      {/* Forma za upit grupe */}
      <section className="kon-section bg-sand" id="upit">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Upit"
            naslov="Forma za upit grupe"
          />
          <p
            className="mt-4 max-w-2xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
          >
            Popunite formu — šaljemo upit direktno u kamp. Možete i preko WhatsApp-a.
            Minimum 4 osobe; odgovaramo sa ponudom i tačnim terminom.
          </p>
          <div className="mt-8 max-w-2xl">
            <GroupInquiryForm />
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
