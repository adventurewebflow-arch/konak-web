import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { ReservationForm } from "@/components/ReservationForm";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Rezervacija" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/rezervacija` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
    },
  };
}

export default async function RezervacijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Rezervacija");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        variant="b"
        visina="48vh"
        eyebrow={t("hero.eyebrow")}
        naslov={
          <>
            {t("hero.naslov")}{" "}
            <span className="text-teal-light">{t("hero.naslovAccent")}</span>
          </>
        }
        lead={t("hero.lead")}
      />

      <section className="kon-section">
        <div className="kon-container">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
