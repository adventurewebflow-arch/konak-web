import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Česta pitanja — rafting, sigurnost, djeca, dokumenti | Kamp Konak",
  description:
    "Odgovori na česta pitanja o raftingu na Tari: bezbjednost, iskustvo, trajanje, minimalan broj učesnika, djeca, dokumenti i sezona. Sve što treba da znate prije dolaska u kamp Konak.",
  keywords: [
    "rafting Tara pitanja",
    "da li je rafting bezbjedan",
    "rafting sa djecom",
    "rafting dokumenti",
    "koliko traje rafting",
    "rafting sezona Tara",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/cesta-pitanja" },
  openGraph: {
    title: "Česta pitanja — Rafting kamp Konak",
    description:
      "Kratko i iskreno — najčešća pitanja gostiju prije dolaska na Taru.",
    type: "website",
  },
};

const FAQ: FaqItem[] = [
  {
    pitanje: "Da li je rafting bezbjedan?",
    odgovor:
      "Da. Ture vode certifikovani skiperi, dobijate kompletnu i ispravnu opremu, a prije svakog polaska radimo sigurnosni brifing — objasnimo komande, kako se vesla i šta raditi u svakoj situaciji.",
  },
  {
    pitanje: "Treba li mi iskustvo?",
    odgovor:
      "Ne. Dovoljna je osnovna fizička spremnost i želja za avanturom. Sve što treba da znate naučićete na licu mjesta, a skiper je sve vrijeme u čamcu sa vama.",
  },
  {
    pitanje: "Koliko traje rafting?",
    odgovor:
      "Zavisi od vodostaja i doba sezone — od oko 1,5 sat u maju, kada je voda najbrža, do oko 3,5 sata u avgustu. To je trajanje samog spusta, bez obuke, prevoza i obroka.",
  },
  {
    pitanje: "Koliki je minimalan broj učesnika?",
    odgovor:
      "Za jednodnevni rafting nema minimuma — vodimo i pojedince i parove. Za višednevne aranžmane i za kanjoning minimum je 4 osobe.",
  },
  {
    pitanje: "Mogu li djeca na rafting?",
    odgovor:
      "Da, rafting je porodična avantura. Djeca do 6 godina ne plaćaju, a od 6 do 12 godina plaćaju pola cijene. Za najmlađe biramo mirnije dionice i prilagođavamo tempo.",
  },
  {
    pitanje: "Treba li dokument za rafting?",
    odgovor:
      "Da. Rijeka na pojedinim dionicama prolazi kroz dvije države, pa je obavezno ponijeti ličnu kartu ili pasoš.",
  },
  {
    pitanje: "Kada je sezona za rafting?",
    odgovor:
      "Sezona traje od maja do oktobra. Najviši vodostaj je u proljeće (jači adrenalin), dok je ljeti voda mirnija i toplija — idealno za porodice i početnike.",
  },
];

export default async function CestaPitanjaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        variant="b"
        visina="44vh"
        eyebrow="Česta pitanja"
        naslov="Sve što vas zanima"
        lead="Kratko i iskreno — najčešća pitanja gostiju prije dolaska na Taru. Ako nešto ne nađete, javite nam se."
      />

      <section className="kon-section">
        <div className="kon-container" style={{ maxWidth: "880px" }}>
          <FaqAccordion items={FAQ} />
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container" style={{ maxWidth: "880px" }}>
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
              Ostalo vam pitanje?
            </h2>
            <p
              className="mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              Pišite nam ili pozovite — odgovaramo brzo i rado pomažemo oko svega.
            </p>
            <div className="mt-8">
              <CtaButton href="/kontakt" arrow>
                Kontaktiraj nas
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
