import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { GalleryGrid, type GalleryPhoto } from "@/components/GalleryGrid";

const SITE = "https://www.raftingkampkonak.com";
const IMG = "/images/galerija";

const ASPECTS: GalleryPhoto["aspect"][] = ["3/4", "4/3", "1/1", "4/3", "3/4"];

function aspectAt(i: number): GalleryPhoto["aspect"] {
  return ASPECTS[i % ASPECTS.length];
}

type PhotoDef = {
  id: string;
  cat: GalleryPhoto["cat"];
  aspectIndex: number;
  src: string;
};

const PHOTO_DEFS: PhotoDef[] = [
  { id: "r-2", cat: "rafting", aspectIndex: 0, src: `${IMG}/galerija2.jpg` },
  { id: "r-3", cat: "rafting", aspectIndex: 1, src: `${IMG}/galerija3.jpg` },
  { id: "r-4", cat: "rafting", aspectIndex: 2, src: `${IMG}/galerija4.jpg` },
  { id: "r-5", cat: "rafting", aspectIndex: 3, src: `${IMG}/galerija5.jpg` },
  { id: "r-7", cat: "rafting", aspectIndex: 4, src: `${IMG}/galerija7.jpg` },
  { id: "r-11", cat: "rafting", aspectIndex: 5, src: `${IMG}/galerija11.jpg` },
  { id: "r-12", cat: "rafting", aspectIndex: 6, src: `${IMG}/galerija12.jpg` },
  { id: "r-13", cat: "rafting", aspectIndex: 7, src: `${IMG}/galerija13.jpg` },
  { id: "r-15", cat: "rafting", aspectIndex: 8, src: `${IMG}/galerija15.jpg` },
  { id: "r-16", cat: "rafting", aspectIndex: 9, src: `${IMG}/galerija16.jpg` },
  { id: "r-36", cat: "rafting", aspectIndex: 10, src: `${IMG}/galerija36.jpg` },
  { id: "r-38", cat: "rafting", aspectIndex: 11, src: `${IMG}/galerija38.jpg` },
  { id: "r-40", cat: "rafting", aspectIndex: 12, src: `${IMG}/galerija40.jpg` },
  { id: "k-1", cat: "kamp", aspectIndex: 0, src: `${IMG}/kamp_konak.webp` },
  { id: "k-2", cat: "kamp", aspectIndex: 1, src: `${IMG}/kamp_konak1.webp` },
  { id: "k-3", cat: "kamp", aspectIndex: 2, src: `${IMG}/konak_ispred.webp` },
  { id: "k-4", cat: "kamp", aspectIndex: 3, src: `${IMG}/smjestaj_kamp_konak.webp` },
  { id: "k-5", cat: "kamp", aspectIndex: 4, src: `${IMG}/smjestaj_konak2.webp` },
  { id: "k-6", cat: "kamp", aspectIndex: 5, src: `${IMG}/smjestaj_konak3.webp` },
  { id: "k-7", cat: "kamp", aspectIndex: 6, src: `${IMG}/smjestaj-konak-pocetna.jpg` },
  { id: "k-8", cat: "kamp", aspectIndex: 7, src: `${IMG}/toalet_kamp_konak.webp` },
  { id: "k-9", cat: "kamp", aspectIndex: 8, src: "/images/autokamp/autokapm-konak.jpg" },
  { id: "k-10", cat: "kamp", aspectIndex: 9, src: "/images/autokamp/auto-konak.jpg" },
  { id: "h-1", cat: "hrana", aspectIndex: 0, src: `${IMG}/corba_rucak.jpg` },
  { id: "h-2", cat: "hrana", aspectIndex: 1, src: `${IMG}/dezert.jpg` },
  { id: "h-3", cat: "hrana", aspectIndex: 2, src: `${IMG}/dorucaak50.jpg` },
  { id: "h-4", cat: "hrana", aspectIndex: 3, src: `${IMG}/dorucak_konak.jpg` },
  { id: "h-5", cat: "hrana", aspectIndex: 4, src: `${IMG}/dorucak_konak1.jpg` },
  { id: "h-6", cat: "hrana", aspectIndex: 5, src: `${IMG}/rucak_konak.jpg` },
  { id: "h-7", cat: "hrana", aspectIndex: 6, src: "/images/hrana/dorucak2.jpg" },
  { id: "h-8", cat: "hrana", aspectIndex: 7, src: "/images/hrana/dorucak3.jpg" },
  { id: "h-9", cat: "hrana", aspectIndex: 8, src: "/images/hrana/sac-konak.jpg" },
  { id: "h-10", cat: "hrana", aspectIndex: 9, src: "/images/hrana/dorucak-dezert-konak.jpg" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Galerija" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/galerija` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function GalerijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Galerija");

  const labels = t.raw("photos.labels") as Record<string, string>;

  const FOTOS: GalleryPhoto[] = PHOTO_DEFS.map((p) => {
    const labela = labels[p.id] ?? p.id;
    return {
      id: p.id,
      labela,
      cat: p.cat,
      aspect: aspectAt(p.aspectIndex),
      src: p.src,
      alt: labela,
    };
  });

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: t("meta.ogTitle"),
    description: t("meta.description"),
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
            {t("hero.eyebrow")}
          </span>
          <h1
            className="mt-3 font-display font-extrabold text-pine"
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {t("hero.naslov")}
          </h1>
          <p
            className="mt-5 max-w-2xl font-sans text-body"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
          >
            {t("hero.lead")}
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
