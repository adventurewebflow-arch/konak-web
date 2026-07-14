import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OG_IMAGES } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactForm } from "@/components/ContactForm";

const SITE = "https://www.raftingkampkonak.com";
const PHONE_DISPLAY = "+387 65 848 110";
const PHONE_WA = "https://wa.me/38765848110";
const EMAIL = "konakraftingkamp@gmail.com";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Konak%20kamp%20Hum%20Fo%C4%8Da&output=embed";
const MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/raftingkampkonak/" },
  { label: "TikTok", href: "https://tiktok.com/@tararafting2" },
  { label: "Facebook", href: "https://facebook.com/RaftingKonak/" },
];

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 1-.8 1.8-1.8 1.7C11 22 2 13 3.3 5.8 3.4 4.8 4.2 4 5.2 4h1.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c4-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 3 7 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ContactCard({
  href,
  label,
  value,
  ikona,
}: {
  href: string;
  label: string;
  value: string;
  ikona: ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-4 rounded-card border border-line bg-surface p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-mint-surface text-teal">
        {ikona}
      </span>
      <div>
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <p className="mt-1 font-sans text-base font-semibold text-ink">{value}</p>
      </div>
    </a>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kontakt" });
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    keywords: t("meta.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: `${SITE}/kontakt` },
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: locale === "en" ? "en_US" : "sr_BA",
      images: [...OG_IMAGES],
    },
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Kontakt");

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rafting kamp Konak",
    url: `${SITE}/kontakt`,
    telephone: "+38765848110",
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hum",
      addressLocality: "Foča",
      postalCode: "73300",
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.3528783,
      longitude: 18.8229302,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+38765848110",
      email: EMAIL,
      contactType: "customer service",
      availableLanguage: ["sr", "en"],
    },
    hasMap: MAPS_URL,
  };

  return (
    <>
      <Hero
        variant="b"
        visina="44vh"
        eyebrow={t("hero.eyebrow")}
        naslov={t("hero.naslov")}
        lead={t("hero.lead")}
      />

      <section className="kon-section">
        <div className="kon-container kon-k">
          <div className="flex flex-col gap-4">
            <ContactCard
              href={PHONE_WA}
              label={t("cards.phoneLabel")}
              value={PHONE_DISPLAY}
              ikona={<IconPhone />}
            />
            <ContactCard
              href={`mailto:${EMAIL}`}
              label={t("cards.emailLabel")}
              value={EMAIL}
              ikona={<IconMail />}
            />
            <ContactCard
              href={MAPS_URL}
              label={t("cards.locationLabel")}
              value={t("cards.locationValue")}
              ikona={<IconPin />}
            />

            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center rounded-card border border-line bg-surface px-4 py-3 font-sans text-sm font-bold text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <p className="rounded-card border border-line-chip bg-surface-warm px-4 py-3 text-center font-sans text-sm text-text-secondary">
              {t("season")}
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow={t("location.eyebrow")}
            naslov={t("location.naslov")}
          />
          <iframe
            title={t("location.iframeTitle")}
            src={MAPS_EMBED}
            className="mt-8 w-full rounded-card-lg border border-line shadow-soft"
            style={{ height: "clamp(320px, 46vh, 460px)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
    </>
  );
}
