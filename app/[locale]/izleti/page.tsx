import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard } from "@/components/BlogCard";
import { CtaButton } from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Izleti i kombinacije — rafting + Sutjeska, Durmitor, kanjoning | Konak",
  description:
    "Izleti i kombinacije iz kampa Konak: rafting uz NP Sutjeska, kanjoning ili Durmitor. Spojite više avantura u jedan boravak. Planinski izleti (Perućica, Zelengora, Trnovačko) na upit.",
  keywords: [
    "izleti Tara",
    "rafting kombinacije",
    "rafting i Sutjeska",
    "rafting Durmitor",
    "izleti Foča",
    "kombinovani aranžmani rafting",
  ],
  alternates: { canonical: "https://www.raftingkampkonak.com/izleti" },
  openGraph: {
    title: "Izleti i kombinacije — rafting + Sutjeska, Durmitor, kanjoning",
    description:
      "Najljepši boravci spajaju vodu i planinu — rafting kao okosnica, a uz njega što god poželite.",
    type: "website",
  },
};

const SITE = "https://www.raftingkampkonak.com";

const KOMBINACIJE = [
  {
    kategorija: "Najtraženije · na upit",
    naslov: "Rafting + NP Sutjeska",
    opis:
      "Dan na vodi i dan u prašumi Perućici i kod Trnovačkog jezera — voda i planina u balansu. Cijena na upit.",
    href: "/kontakt",
    linkLabel: "Pošalji upit →",
    gradient: "var(--gradient-slot-1)",
  },
  {
    kategorija: "Za avanturiste · od 120€",
    naslov: "Rafting + kanjoning",
    opis:
      "Dupla doza adrenalina — spust niz Taru i probijanje kroz Nevidio ili Hrčavku. Za one koji ne staju.",
    href: "/kanjoning",
    linkLabel: "Pogledaj kanjoning →",
    gradient: "var(--gradient-slot-2)",
  },
  {
    kategorija: "Opušteno · na upit",
    naslov: "Rafting + Durmitor",
    opis:
      "Adrenalin na rijeci, pa miran dan na Durmitoru i kod Crnog jezera. Cijena na upit.",
    href: "/kontakt",
    linkLabel: "Pošalji upit →",
    gradient: "var(--gradient-slot-3)",
  },
];

const PLANINSKI = [
  { naslov: "Prašuma Perućica", meta: "NP Sutjeska · na upit" },
  { naslov: "Trnovačko jezero", meta: "Hiking · na upit" },
  { naslov: "Zelengora", meta: "Gorska jezera · na upit" },
  { naslov: "Pivsko jezero", meta: "Izlet · na upit" },
];

export default async function IzletiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: KOMBINACIJE.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${k.href}`,
      name: k.naslov,
    })),
  };

  return (
    <>
      <Hero
        variant="b"
        visina="52vh"
        eyebrow="Izleti i kombinacije"
        naslov={
          <>
            Spojite više{" "}
            <span className="text-teal-light">avantura.</span>
          </>
        }
        lead="Najljepši boravci su oni koji spoje vodu i planinu. Evo kombinacija koje gosti najviše vole — rafting kao okosnica, a uz njega što god poželite."
        slika={{
          src: "/images/hero-slike-konak/izleti-konak.png",
          alt: "Planinski izleti oko Tare i NP Sutjeska",
        }}
      />

      {/* 4.3 — Omiljene kombinacije */}
      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader eyebrow="Kombinovani aranžmani" naslov="Omiljene kombinacije" />
          <div className="kon-combos mt-10">
            {KOMBINACIJE.map((k) => (
              <BlogCard
                key={k.naslov}
                kategorija={k.kategorija}
                naslov={k.naslov}
                opis={k.opis}
                href={k.href}
                linkLabel={k.linkLabel}
                gradient={k.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4.4 — Planinski izleti (sekundarno) */}
      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Planinski izleti"
            naslov={
              <>
                Planinski izleti{" "}
                <span className="font-sans text-[0.55em] font-semibold text-muted">
                  — na upit, uz rafting boravak
                </span>
              </>
            }
          />
          <div className="kon-mtn mt-8">
            {PLANINSKI.map((p) => (
              <Link
                key={p.naslov}
                href="/kontakt"
                className="rounded-card border border-line bg-surface px-5 py-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <h3 className="font-display text-base font-semibold text-ink">
                  {p.naslov}
                </h3>
                <p className="mt-1 font-sans text-sm text-muted">{p.meta}</p>
                <span className="mt-2 inline-block font-sans text-xs font-bold text-terracotta">
                  Pošalji upit →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 font-sans text-sm text-text-secondary">
            Više o svakom izletu pročitajte u{" "}
            <Link
              href="/blog/aktivnosti-na-tari"
              className="font-semibold text-terracotta transition-colors hover:text-terracotta-hover"
            >
              vodiču kroz aktivnosti
            </Link>{" "}
            ili nas pitajte direktno.
          </p>
        </div>
      </section>

      {/* 4.5 — Tamna CTA kartica */}
      <section className="kon-section">
        <div className="kon-container">
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
              Sklopimo vaš program
            </h2>
            <p
              className="mt-4 max-w-lg font-sans text-on-dark"
              style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
            >
              Recite nam koliko dana ostajete i šta vas zanima — napravimo
              kombinaciju po vašoj mjeri.
            </p>
            <div className="mt-8">
              <CtaButton href="/kontakt" arrow>
                Pošalji upit
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
