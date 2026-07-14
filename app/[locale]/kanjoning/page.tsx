import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";

const SITE = "https://www.raftingkampkonak.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tk = await getTranslations({ locale, namespace: "Kanjoning" });

  return {
    title: { absolute: tk("meta.title") },
    description: tk("meta.description"),
    keywords: tk("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/kanjoning` },
    openGraph: {
      title: tk("meta.ogTitle"),
      description: tk("meta.ogDescription"),
      type: "website",
      images: [...OG_IMAGES],
    },
  };
}

export default async function KanjoningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tk = await getTranslations("Kanjoning");
  const tc = await getTranslations("Common");

  const TURE = [
    {
      href: "/kanjoning/nevidio",
      kicker: tk("cards.nevidio.kicker"),
      naslov: tk("cards.nevidio.title"),
      opis: tk("cards.nevidio.description"),
      cijena: "130€",
      cijenaLabel: tc("from"),
      obrnuto: false,
      slika: {
        src: "/images/hero-slike-konak/kanjoning-pocetna.jpg",
        alt: tk("cards.nevidio.imageAlt"),
      },
    },
    {
      href: "/kanjoning/hrcavka",
      kicker: tk("cards.hrcavka.kicker"),
      naslov: tk("cards.hrcavka.title"),
      opis: tk("cards.hrcavka.description"),
      cijena: "120€",
      cijenaLabel: tc("from"),
      obrnuto: true,
      slika: {
        src: "/images/galerija/galerija15.jpg",
        alt: tk("cards.hrcavka.imageAlt"),
      },
    },
  ];

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
        eyebrow={tk("hero.eyebrow")}
        naslov={tk("hero.title")}
        lead={tk("hero.lead")}
        slika={{
          src: "/images/hero-slike-konak/kanjoning-pocetna.jpg",
          alt: tk("hero.imageAlt"),
        }}
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
              slika={t.slika}
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
