import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GalleryGrid, type GalleryPhoto } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerija — rafting na Tari, kamp i hrana | Rafting kamp Konak",
  description:
    "Fotografije rafting kampa Konak: spust niz Taru, lux bungalovi i domaća kuhinja. Filtriraj po kategorijama — rafting, kamp, hrana.",
  keywords: [
    "rafting Tara fotografije",
    "galerija kamp Konak",
    "kanjon Tare slike",
    "bungalovi Tara",
    "rafting BiH galerija",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/galerija" },
  openGraph: {
    title: "Galerija — Rafting kamp Konak",
    description:
      "Tara, kakvu morate vidjeti — rafting, kamp i domaća kuhinja u jednoj galeriji.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/galerija";

const ASPECTS: GalleryPhoto["aspect"][] = ["3/4", "4/3", "1/1", "4/3", "3/4"];

function aspectAt(i: number): GalleryPhoto["aspect"] {
  return ASPECTS[i % ASPECTS.length];
}

const FOTOS: GalleryPhoto[] = [
  // Rafting (13)
  {
    id: "r-2",
    labela: "Rafting",
    cat: "rafting",
    aspect: aspectAt(0),
    src: `${IMG}/galerija2.jpg`,
    alt: "Rafting na Tari — čamac u kanjonu",
  },
  {
    id: "r-3",
    labela: "Spust niz Taru",
    cat: "rafting",
    aspect: aspectAt(1),
    src: `${IMG}/galerija3.jpg`,
    alt: "Spust niz Taru kroz bukove",
  },
  {
    id: "r-4",
    labela: "Ekipa na vodi",
    cat: "rafting",
    aspect: aspectAt(2),
    src: `${IMG}/galerija4.jpg`,
    alt: "Ekipa na rafting spustu niz Taru",
  },
  {
    id: "r-5",
    labela: "Kanjon Tare",
    cat: "rafting",
    aspect: aspectAt(3),
    src: `${IMG}/galerija5.jpg`,
    alt: "Rafting kroz kanjon Tare",
  },
  {
    id: "r-7",
    labela: "Brzaci",
    cat: "rafting",
    aspect: aspectAt(4),
    src: `${IMG}/galerija7.jpg`,
    alt: "Rafting kroz brzake na Tari",
  },
  {
    id: "r-11",
    labela: "Čamac u kanjonu",
    cat: "rafting",
    aspect: aspectAt(5),
    src: `${IMG}/galerija11.jpg`,
    alt: "Rafting čamac u kanjonu Tare",
  },
  {
    id: "r-12",
    labela: "Grupa na spustu",
    cat: "rafting",
    aspect: aspectAt(6),
    src: `${IMG}/galerija12.jpg`,
    alt: "Grupa na rafting spustu niz Taru",
  },
  {
    id: "r-13",
    labela: "Smaragdna voda",
    cat: "rafting",
    aspect: aspectAt(7),
    src: `${IMG}/galerija13.jpg`,
    alt: "Smaragdna voda Tare tokom raftinga",
  },
  {
    id: "r-15",
    labela: "Veslanje",
    cat: "rafting",
    aspect: aspectAt(8),
    src: `${IMG}/galerija15.jpg`,
    alt: "Veslanje na rafting turi na Tari",
  },
  {
    id: "r-16",
    labela: "Dolazak u Hum",
    cat: "rafting",
    aspect: aspectAt(9),
    src: `${IMG}/galerija16.jpg`,
    alt: "Rafting — dolazak u Hum",
  },
  {
    id: "r-36",
    labela: "Avantura na vodi",
    cat: "rafting",
    aspect: aspectAt(10),
    src: `${IMG}/galerija36.jpg`,
    alt: "Avantura raftinga na Tari",
  },
  {
    id: "r-38",
    labela: "Skiperi i gosti",
    cat: "rafting",
    aspect: aspectAt(11),
    src: `${IMG}/galerija38.jpg`,
    alt: "Skiperi i gosti na rafting turi",
  },
  {
    id: "r-40",
    labela: "Trenutak sa Tare",
    cat: "rafting",
    aspect: aspectAt(12),
    src: `${IMG}/galerija40.jpg`,
    alt: "Trenutak sa raftinga na Tari",
  },

  // Kamp (8)
  {
    id: "k-1",
    labela: "Kamp uz rijeku",
    cat: "kamp",
    aspect: aspectAt(0),
    src: `${IMG}/kamp_konak.webp`,
    alt: "Rafting kamp Konak uz rijeku",
  },
  {
    id: "k-2",
    labela: "Bungalovi",
    cat: "kamp",
    aspect: aspectAt(1),
    src: `${IMG}/kamp_konak1.webp`,
    alt: "Lux bungalovi kampa Konak",
  },
  {
    id: "k-3",
    labela: "Ispred kampa",
    cat: "kamp",
    aspect: aspectAt(2),
    src: `${IMG}/konak_ispred.webp`,
    alt: "Ulaz i dvorište rafting kampa Konak",
  },
  {
    id: "k-4",
    labela: "Smještaj",
    cat: "kamp",
    aspect: aspectAt(3),
    src: `${IMG}/smjestaj_kamp_konak.webp`,
    alt: "Smještaj u lux bungalovu kampa Konak",
  },
  {
    id: "k-5",
    labela: "Soba bungalova",
    cat: "kamp",
    aspect: aspectAt(4),
    src: `${IMG}/smjestaj_konak2.webp`,
    alt: "Soba lux bungalova kampa Konak",
  },
  {
    id: "k-6",
    labela: "Odmor u kampu",
    cat: "kamp",
    aspect: aspectAt(5),
    src: `${IMG}/smjestaj_konak3.webp`,
    alt: "Odmor u bungalovu kampa Konak",
  },
  {
    id: "k-7",
    labela: "Kamp na obali",
    cat: "kamp",
    aspect: aspectAt(6),
    src: `${IMG}/smjestaj-konak-pocetna.jpg`,
    alt: "Kamp Konak na obali Tare",
  },
  {
    id: "k-8",
    labela: "Kupatilo",
    cat: "kamp",
    aspect: aspectAt(7),
    src: `${IMG}/toalet_kamp_konak.webp`,
    alt: "Privatno kupatilo u bungalovu kampa Konak",
  },

  // Hrana (6)
  {
    id: "h-1",
    labela: "Čorba i ručak",
    cat: "hrana",
    aspect: aspectAt(0),
    src: `${IMG}/corba_rucak.jpg`,
    alt: "Domaća čorba i ručak u kampu Konak",
  },
  {
    id: "h-2",
    labela: "Desert",
    cat: "hrana",
    aspect: aspectAt(1),
    src: `${IMG}/dezert.jpg`,
    alt: "Domaći deserti u kampu Konak",
  },
  {
    id: "h-3",
    labela: "Doručak",
    cat: "hrana",
    aspect: aspectAt(2),
    src: `${IMG}/dorucaak50.jpg`,
    alt: "Domaći doručak u kampu Konak",
  },
  {
    id: "h-4",
    labela: "Pite i sirevi",
    cat: "hrana",
    aspect: aspectAt(3),
    src: `${IMG}/dorucak_konak.jpg`,
    alt: "Domaći doručak — pite i sirevi",
  },
  {
    id: "h-5",
    labela: "Jela uz vatru",
    cat: "hrana",
    aspect: aspectAt(4),
    src: `${IMG}/dorucak_konak1.jpg`,
    alt: "Domaća jela uz vatru u kampu Konak",
  },
  {
    id: "h-6",
    labela: "Ručak ispod sača",
    cat: "hrana",
    aspect: aspectAt(5),
    src: `${IMG}/rucak_konak.jpg`,
    alt: "Domaći ručak ispod sača u kampu Konak",
  },
];

export default async function GalerijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galerija — Rafting kamp Konak",
    description:
      "Fotografije rafting kampa Konak: rafting na Tari, kamp i domaća kuhinja.",
    url: `${SITE}/galerija`,
    associatedMedia: FOTOS.map((p) => ({
      "@type": "ImageObject",
      name: p.labela,
      caption: p.labela,
      contentUrl: `${SITE}${p.src}`,
    })),
  };

  return (
    <>
      <section
        className="kon-section bg-sand"
        style={{ paddingBlock: "clamp(44px, 8vh, 84px)" }}
      >
        <div className="kon-container">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
            Galerija
          </span>
          <h1
            className="mt-3 font-display font-extrabold text-pine"
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Tara, kakvu morate vidjeti.
          </h1>
          <p
            className="mt-5 max-w-2xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            Spust niz rijeku, kamp i domaća kuhinja — izaberi kategoriju.
          </p>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <GalleryGrid photos={FOTOS} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
