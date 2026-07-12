"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OfferCard, ON_REQUEST_PRICE } from "./OfferCard";

type Filter = "sve" | "rafting" | "kanjoning" | "izleti";

interface OfferItem {
  id: string;
  kategorija: Filter;
  kicker: string;
  naslov: string;
  opis: string;
  cijena: string;
  cijenaLabel?: string;
  href: string;
  tag?: string;
  slika: { src: string; alt: string };
}

interface OfferGroup {
  id: Filter;
  naslov: string;
  note: string;
  cols: "4" | "2" | "3";
  stavke: OfferItem[];
}

const FILTERI: { id: Filter; labelKey: "all" | "rafting" | "canyoning" | "excursions" }[] = [
  { id: "sve", labelKey: "all" },
  { id: "rafting", labelKey: "rafting" },
  { id: "kanjoning", labelKey: "canyoning" },
  { id: "izleti", labelKey: "excursions" },
];

const HERO = "/images/hero-slike-konak";
const BLOG = "/images/blog-konak";
const GAL = "/images/galerija";

const COLS_CLS: Record<OfferGroup["cols"], string> = {
  "4": "kon-cards-4",
  "2": "kon-cards-2",
  "3": "kon-cards-3",
};

export function PonudaCatalog() {
  const t = useTranslations("Common");
  const tf = useTranslations("Footer");
  const tp = useTranslations("Ponuda");
  const [filter, setFilter] = useState<Filter>("sve");

  const filterLabel = (key: (typeof FILTERI)[number]["labelKey"]) => {
    if (key === "all") return t("all");
    if (key === "rafting") return tp("offers.raftingNaslov");
    if (key === "canyoning") return tp("offers.kanjoningNaslov");
    return tf("excursions");
  };

  const GRUPE: OfferGroup[] = [
    {
      id: "rafting",
      naslov: tp("offers.raftingNaslov"),
      note: tp("catalog.raftingNote"),
      cols: "4",
      stavke: [
        {
          id: "r1",
          kategorija: "rafting",
          kicker: tp("offers.r1.kicker"),
          naslov: tp("offers.r1.naslov"),
          opis: tp("offers.r1.opis"),
          cijena: "50€",
          href: "/rafting/jednodnevni",
          slika: {
            src: `${HERO}/raftingtarom-jednodnevni.jpg`,
            alt: tp("offers.r1.alt"),
          },
        },
        {
          id: "r2",
          kategorija: "rafting",
          kicker: tp("offers.r2.kicker"),
          naslov: tp("offers.r2.naslov"),
          opis: tp("offers.r2.opis"),
          cijena: "100€",
          href: "/rafting/dvodnevni",
          slika: {
            src: `${HERO}/raftingtarom-dvodnevni.jpg`,
            alt: tp("offers.r2.alt"),
          },
        },
        {
          id: "r3",
          kategorija: "rafting",
          kicker: tp("offers.r3.kicker"),
          naslov: tp("offers.r3.naslov"),
          opis: tp("offers.r3.opis"),
          cijena: "140€",
          href: "/rafting/trodnevni",
          tag: "__featured__",
          slika: {
            src: `${HERO}/raftingtarom-trodnevni.jpg`,
            alt: tp("offers.r3.alt"),
          },
        },
        {
          id: "r4",
          kategorija: "rafting",
          kicker: tp("offers.r4.kicker"),
          naslov: tp("offers.r4.naslov"),
          opis: tp("offers.r4.opis"),
          cijena: "300€",
          href: "/rafting/cijela-tara",
          slika: {
            src: `${HERO}/raftingtarom-cetverodnevni.jpg`,
            alt: tp("offers.r4.alt"),
          },
        },
      ],
    },
    {
      id: "kanjoning",
      naslov: tp("offers.kanjoningNaslov"),
      note: tp("catalog.kanjoningNote"),
      cols: "2",
      stavke: [
        {
          id: "k1",
          kategorija: "kanjoning",
          kicker: tp("offers.k1.kicker"),
          naslov: tp("offers.k1.naslov"),
          opis: tp("offers.k1.opis"),
          cijena: "130€",
          href: "/kanjoning/nevidio",
          slika: {
            src: `${HERO}/kanjoning-pocetna.jpg`,
            alt: tp("offers.k1.alt"),
          },
        },
        {
          id: "k2",
          kategorija: "kanjoning",
          kicker: tp("offers.k2.kicker"),
          naslov: tp("offers.k2.naslov"),
          opis: tp("offers.k2.opis"),
          cijena: "120€",
          href: "/kanjoning/hrcavka",
          slika: {
            src: `${GAL}/galerija15.jpg`,
            alt: tp("offers.k2.alt"),
          },
        },
      ],
    },
    {
      id: "izleti",
      naslov: tp("catalog.izletiNaslov"),
      note: tp("catalog.izletiNote"),
      cols: "3",
      stavke: [
        {
          id: "i1",
          kategorija: "izleti",
          kicker: tp("offers.i1.kicker"),
          naslov: tp("offers.i1.naslov"),
          opis: tp("offers.i1.opis"),
          cijena: ON_REQUEST_PRICE,
          cijenaLabel: "",
          href: "/izleti",
          slika: {
            src: `${HERO}/kanjoning-pocetna.jpg`,
            alt: tp("offers.i1.alt"),
          },
        },
        {
          id: "i2",
          kategorija: "izleti",
          kicker: tp("offers.i2.kicker"),
          naslov: tp("offers.i2.naslov"),
          opis: tp("offers.i2.opis"),
          cijena: ON_REQUEST_PRICE,
          cijenaLabel: "",
          href: "/izleti",
          slika: {
            src: `${BLOG}/blog-np-sutjeska-konak.jpg`,
            alt: tp("offers.i2.alt"),
          },
        },
        {
          id: "i3",
          kategorija: "izleti",
          kicker: tp("offers.i3.kicker"),
          naslov: tp("offers.i3.naslov"),
          opis: tp("offers.i3.opis"),
          cijena: ON_REQUEST_PRICE,
          cijenaLabel: "",
          href: "/izleti",
          slika: {
            src: `${HERO}/izleti-konak.png`,
            alt: tp("offers.i3.alt"),
          },
        },
      ],
    },
  ];

  const vidljive = GRUPE.filter(
    (g) => filter === "sve" || g.id === filter,
  );

  return (
    <>
      <p
        className="font-sans text-body"
        style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
      >
        {tp("catalog.intro")}
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2.5"
        role="tablist"
        aria-label={tp("catalog.filterAria")}
      >
        {FILTERI.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`kon-chip ${active ? "act" : ""}`}
            >
              {filterLabel(f.labelKey)}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-12">
        {vidljive.map((grupa) => (
          <div key={grupa.id}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-3">
              <h2 className="font-display text-2xl font-bold text-ink">
                {grupa.naslov}
              </h2>
              <span className="font-sans text-sm text-muted">{grupa.note}</span>
            </div>
            <div className={`kon-cards mt-6 ${COLS_CLS[grupa.cols]}`}>
              {grupa.stavke.map((s) => (
                <OfferCard
                  key={s.id}
                  {...s}
                  tag={s.tag === "__featured__" ? t("featured") : s.tag}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
