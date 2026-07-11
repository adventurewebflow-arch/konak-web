import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ReservationForm } from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Rezervacija — pošalji upit | Rafting kamp Konak",
  description:
    "Pošaljite upit za rafting, kanjoning ili teambuilding na Tari. Javljamo se u najkraćem roku sa tačnom ponudom — za grupe imamo dobar popust.",
  keywords: [
    "rezervacija rafting Tara",
    "upit rafting kamp Konak",
    "rafting rezervacija",
    "rafting kamp Konak rezervacija",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/rezervacija" },
  openGraph: {
    title: "Rezervacija — Rafting kamp Konak",
    description:
      "Pošaljite upit za turu. Cijene su okvirne — javljamo se sa tačnom ponudom.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Rezervacija — Rafting kamp Konak",
  url: `${SITE}/rezervacija`,
  potentialAction: {
    "@type": "ReserveAction",
    target: `${SITE}/rezervacija`,
    result: { "@type": "Reservation", name: "Rafting tura na Tari" },
  },
};

export default async function RezervacijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        variant="b"
        visina="48vh"
        eyebrow="Rezervacija"
        naslov={
          <>
            Pošalji upit,{" "}
            <span className="text-teal-light">javljamo se brzo.</span>
          </>
        }
        lead="Izaberi turu, datum i broj osoba — ostalo dogovaramo nakon upita. Za grupe imamo dobar popust."
      />

      <section className="kon-section">
        <div className="kon-container">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
