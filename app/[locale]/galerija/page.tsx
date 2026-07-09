import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GalleryGrid, type GalleryPhoto } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerija — rafting na Tari, kamp, hrana i priroda | Rafting kamp Konak",
  description:
    "Fotografije rafting kampa Konak: spust niz Taru, lux bungalovi, domaća kuhinja, kanjon i avanture u okolini. Filtriraj po kategorijama — rafting, kamp, hrana, priroda, aktivnosti.",
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
      "Tara, kakvu morate vidjeti — rafting, kamp, hrana i priroda u jednoj galeriji.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const GRADIENTS = [
  "linear-gradient(160deg, #2e8b74, #0f3d32)",
  "linear-gradient(160deg, #3a9580, #13443a)",
  "linear-gradient(160deg, #1c6a58, #0a2a23)",
];

const FOTOS: GalleryPhoto[] = (
  [
    { id: "1", labela: "Rafting", cat: "rafting", aspect: "3/4" },
    { id: "2", labela: "Spust niz buk", cat: "rafting", aspect: "4/3" },
    { id: "3", labela: "Lux bungalov", cat: "kamp", aspect: "1/1" },
    { id: "4", labela: "Domaća kuhinja", cat: "hrana", aspect: "4/3" },
    { id: "5", labela: "Kanjon Tare", cat: "priroda", aspect: "3/4" },
    { id: "6", labela: "Ekipa na vodi", cat: "rafting", aspect: "1/1" },
    { id: "7", labela: "Kamp uz rijeku", cat: "kamp", aspect: "4/3" },
    { id: "8", labela: "NP Sutjeska", cat: "aktivnosti", aspect: "3/4" },
    { id: "9", labela: "Roštilj i specijaliteti", cat: "hrana", aspect: "1/1" },
    { id: "10", labela: "Smaragdni vir", cat: "priroda", aspect: "4/3" },
    { id: "11", labela: "Jahanje konja", cat: "aktivnosti", aspect: "3/4" },
    { id: "12", labela: "Terasa restorana", cat: "kamp", aspect: "4/3" },
    { id: "13", labela: "Skok u Taru", cat: "rafting", aspect: "3/4" },
    { id: "14", labela: "Vidikovac", cat: "priroda", aspect: "1/1" },
    { id: "15", labela: "Kanjoning", cat: "aktivnosti", aspect: "4/3" },
  ] satisfies Omit<GalleryPhoto, "gradient">[]
).map((p, i) => ({ ...p, gradient: GRADIENTS[i % 3] }));

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
      "Fotografije rafting kampa Konak: rafting na Tari, kamp, hrana, priroda i aktivnosti.",
    url: `${SITE}/galerija`,
    associatedMedia: FOTOS.map((p) => ({
      "@type": "ImageObject",
      name: p.labela,
      caption: p.labela,
      ...(p.src ? { contentUrl: p.src } : {}),
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
            Spust niz rijeku, kamp i domaća kuhinja, kanjon i avanture u okolini
            — izaberi kategoriju.
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
