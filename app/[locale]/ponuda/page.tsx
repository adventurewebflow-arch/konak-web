import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { PonudaCatalog } from "@/components/PonudaCatalog";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Ponuda i cijene 2026 — rafting, kanjoning i izleti | Rafting kamp Konak",
  description:
    "Svi aranžmani rafting kampa Konak na jednom mjestu: rafting ture od 1 do 4 dana, kanjoning Nevidio i Hrčavka i izleti — sa cijenama za 2026. Uporedi i rezerviši. Djeca do 6 god. besplatno.",
  keywords: [
    "rafting Tara cijene",
    "rafting aranžmani 2026",
    "rafting Tara ponuda",
    "kanjoning cijena",
    "cijene rafting kamp Konak",
    "rafting paket Tara",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/ponuda" },
  openGraph: {
    title: "Ponuda i cijene 2026 — rafting, kanjoning i izleti",
    description:
      "Uporedite rafting ture, kanjoning i izlete sa cijenama za sezonu 2026.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const OFFERS = [
  { name: "Jednodnevni rafting", price: 50, url: "/rafting/jednodnevni" },
  { name: "Dvodnevni aranžman", price: 100, url: "/rafting/dvodnevni" },
  { name: "Trodnevni aranžman", price: 140, url: "/rafting/trodnevni" },
  { name: "Rafting cijelom Tarom", price: 300, url: "/rafting/cijela-tara" },
  { name: "Kanjoning Nevidio", price: 130, url: "/kanjoning/nevidio" },
  { name: "Kanjoning Hrčavka", price: 120, url: "/kanjoning/hrcavka" },
];

const NAPOMENE = [
  "Djeca do 6 god. besplatno",
  "Djeca 6–12 god. pola cijene",
  "Sve cijene su po osobi i okvirne (\"od\")",
];

export default async function PonudaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Ponuda 2026 — Rafting kamp Konak",
    url: `${SITE}/ponuda`,
    itemListElement: OFFERS.map((o, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: o.name,
      price: o.price,
      priceCurrency: "EUR",
      url: `${SITE}${o.url}`,
      seller: {
        "@type": "LocalBusiness",
        name: "Rafting kamp Konak",
      },
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="44vh"
        eyebrow="Ponuda 2026"
        naslov={
          <>
            Svi aranžmani
            <br />
            na jednom mjestu
          </>
        }
        lead="Uporedite rafting ture, kanjoning i izlete sa cijenama za sezonu 2026, pa izaberite svoj doživljaj."
      />

      <section className="kon-section">
        <div className="kon-container">
          <PonudaCatalog />
        </div>
      </section>

      {/* Napomena */}
      <section className="kon-section bg-sand py-8">
        <div className="kon-container">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-text-secondary">
            {NAPOMENE.map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-teal" aria-hidden="true" />
                {n}
              </li>
            ))}
            <li className="italic text-muted">
              Vikend cijene i tačan iznos — u kalkulatoru na /rezervacija
            </li>
          </ul>
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
            Izračunaj tačnu cijenu
          </h2>
          <p
            className="mt-5 max-w-xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            U kalkulatoru izaberi turu, datum i broj osoba — cijenu računamo odmah
            i šaljemo upit u dva klika.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
