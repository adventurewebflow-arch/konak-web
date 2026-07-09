import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard } from "@/components/BlogCard";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Aktivnosti — NP Sutjeska, kanjoning, Durmitor, jahanje | Kamp Konak",
  description:
    "Aktivnosti iz rafting kampa Konak: cjelodnevni izlet u NP Sutjeska (Perućica, Trnovačko jezero), kanjoning Nevidio i Hrčavka, Durmitor, Zelengora, Pivsko jezero i jahanje konja.",
  keywords: [
    "NP Sutjeska izlet",
    "kanjoning Nevidio",
    "kanjoning Hrčavka",
    "Durmitor izlet",
    "Zelengora",
    "Pivsko jezero",
    "jahanje konja Tara",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/aktivnosti" },
  openGraph: {
    title: "Aktivnosti oko kampa Konak — više od rijeke",
    description:
      "Nacionalni parkovi, kanjoning, planinski izleti i jahanje — spojite više avantura u jedan boravak.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

// Hub kartice — vode na kategorijske stranice ili rezervaciju.
const AKTIVNOSTI = [
  {
    kategorija: "Glavna ponuda",
    naslov: "Rafting na Tari",
    opis:
      "Jednodnevni i višednevni aranžmani niz najdublji kanjon Evrope — od brzog spusta do četvorodnevne ekspedicije cijelim tokom Tare.",
    href: "/rafting",
    linkLabel: "Sve rafting ture →",
    gradient: "var(--gradient-slot-1)",
  },
  {
    kategorija: "Kanjoning",
    naslov: "Nevidio i Hrčavka",
    opis:
      "Skokovi, tobogani i prolazi kroz dva najljepša kanjona u okolini — za početnike (Hrčavka) i iskusne avanturiste (Nevidio).",
    href: "/kanjoning",
    linkLabel: "Pogledaj kanjoning →",
    gradient: "var(--gradient-slot-2)",
  },
  {
    kategorija: "Kombinacije",
    naslov: "Izleti i kombinacije",
    opis:
      "Spojite rafting sa NP Sutjeskom, kanjoningom ili Durmitorom — najtraženiji paketi za višednevni boravak u kampu.",
    href: "/izleti",
    linkLabel: "Omiljene kombinacije →",
    gradient: "var(--gradient-slot-3)",
  },
  {
    kategorija: "NP Sutjeska",
    naslov: "Perućica i Trnovačko jezero",
    opis:
      "Cjelodnevni izlet u najstariji nacionalni park — prašuma Perućica i hiking do srcolikog jezera ispod Maglića. Od 85€ / osobi.",
    href: "/rezervacija",
    linkLabel: "Dodaj u rezervaciju →",
    gradient: "var(--gradient-slot-2)",
  },
  {
    kategorija: "Nacionalni park",
    naslov: "Durmitor i Crno jezero",
    opis:
      "Planinski izlet do čuvenog Crnog jezera i vidikovaca Durmitora — netaknuta priroda na kratkoj vožnji iz kampa.",
    href: "/rezervacija",
    linkLabel: "Pitaj za termin →",
    gradient: "var(--gradient-slot-1)",
  },
  {
    kategorija: "Avantura",
    naslov: "Jahanje konja",
    opis:
      "Staza do vidikovca sa pogledom na kanjon Tare — pogodno i za potpune početnike, uz pratnju iskusnog vodiča.",
    href: "/rezervacija",
    linkLabel: "Pitaj za termin →",
    gradient: "var(--gradient-slot-3)",
  },
];

export default async function AktivnostiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: AKTIVNOSTI.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${a.href}`,
      name: a.naslov,
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="54vh"
        eyebrow="Više od rijeke"
        naslov="Aktivnosti oko kampa"
        lead="Nacionalni parkovi, kanjoning, planinski izleti i jahanje — spojite više avantura u jedan boravak. Sve organizujemo iz kampa."
      />

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Pregled ponude"
            naslov="Sve aktivnosti na jednom mjestu."
          />
          <div className="kon-acts mt-10">
            {AKTIVNOSTI.map((a) => (
              <BlogCard
                key={a.naslov}
                kategorija={a.kategorija}
                naslov={a.naslov}
                opis={a.opis}
                href={a.href}
                linkLabel={a.linkLabel}
                gradient={a.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
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
            Spojite rafting i aktivnosti.
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            U kalkulatoru možete dodati NP Sutjeska i druge aktivnosti uz svoju
            rafting turu — javite nam šta vas zanima.
          </p>
          <div className="mt-8">
            <CtaButton href="/rezervacija" arrow>
              Otvori kalkulator
            </CtaButton>
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
