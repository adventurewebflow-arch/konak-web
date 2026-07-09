import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";

export const metadata: Metadata = {
  title: "Kanjoning na Tari i okolini — Nevidio i Hrčavka | Rafting kamp Konak",
  description:
    "Kanjoning iz kampa Konak: Nevidio (kanjon Komarnice, Durmitor) i Hrčavka (NP Sutjeska, Tjentište). Skokovi, tobogani i spustovi uz iskusne vodiče — za početnike i iskusne avanturiste.",
  keywords: [
    "kanjoning Tara",
    "kanjoning Nevidio",
    "kanjoning Hrčavka",
    "kanjoning Crna Gora",
    "kanjoning Sutjeska",
    "kanjoning BiH",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/kanjoning" },
  openGraph: {
    title: "Kanjoning na Tari i okolini — Nevidio i Hrčavka",
    description:
      "Skokovi, tobogani i prolazi kroz dva najljepša kanjona u okolini — uz iskusne vodiče.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const TURE = [
  {
    href: "/kanjoning/nevidio",
    kicker: "NEVIDIO · CRNA GORA · zahtjevno · jun–okt",
    naslov: "Kanjoning Nevidio",
    opis:
      "Najzahtjevniji kanjon Crne Gore — rijeka Komarnica ispod Durmitora. Skokovi, spustovi i plivanje kroz uske prolaze, za prave avanturiste.",
    cijena: "130€",
    cijenaLabel: "od",
    obrnuto: false,
  },
  {
    href: "/kanjoning/hrcavka",
    kicker: "HRČAVKA · NP SUTJESKA · pristupačno · jun–okt",
    naslov: "Kanjoning Hrčavka",
    opis:
      "Pitomiji kanjon u Nacionalnom parku Sutjeska, kod Tjentišta — idealan za prvi susret sa kanjoningom. Skokovi u bazene i prirodni tobogani.",
    cijena: "120€",
    cijenaLabel: "od",
    obrnuto: true,
  },
];

export default async function KanjoningPage({
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
      <Hero
        variant="b"
        visina="56vh"
        eyebrow="Kanjoning"
        naslov="Kanjoning"
        lead="Tamo gdje rafting stane, kanjoning počinje. Skokovi, tobogani i prolazi kroz dva najljepša kanjona u okolini — uz iskusne vodiče."
      />

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
              obrnuto={t.obrnuto}
            />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
