import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { BookingCalculator } from "@/components/BookingCalculator";

export const metadata: Metadata = {
  title: "Rezervacija i kalkulator cijene — Rafting kamp Konak | Tara",
  description:
    "Izračunaj cijenu rafting ture na Tari: izaberi turu, datum, broj osoba i dodatke — cijena se računa odmah. Pošalji upit na WhatsApp ili e-mail.",
  keywords: [
    "rafting Tara cijena",
    "rezervacija rafting",
    "kalkulator rafting",
    "rafting kamp Konak rezervacija",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/rezervacija" },
  openGraph: {
    title: "Rezervacija i kalkulator cijene — Rafting kamp Konak",
    description:
      "Sastavi paket i vidi cijenu odmah. Upit šalješ na WhatsApp ili e-mail u dva klika.",
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
        visina="52vh"
        eyebrow="Rezervacija"
        naslov={
          <>
            Sastavi paket,{" "}
            <span className="text-teal-light">vidi cijenu odmah.</span>
          </>
        }
        lead="Izaberi turu, datum, broj osoba i dodatke — cijenu računamo u realnom vremenu. Upit šalješ na WhatsApp ili e-mail u dva klika."
      />

      <section className="kon-section">
        <div className="kon-container">
          <BookingCalculator />
        </div>
      </section>
    </>
  );
}
