"use client";

import { useState } from "react";
import { OfferCard } from "./OfferCard";

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

const FILTERI: { id: Filter; label: string }[] = [
  { id: "sve", label: "Sve" },
  { id: "rafting", label: "Rafting" },
  { id: "kanjoning", label: "Kanjoning" },
  { id: "izleti", label: "Izleti" },
];

const HERO = "/images/hero-slike-konak";
const BLOG = "/images/blog-konak";
const GAL = "/images/galerija";

const GRUPE: OfferGroup[] = [
  {
    id: "rafting",
    naslov: "Rafting",
    note: "od 1 do 4 dana",
    cols: "4",
    stavke: [
      {
        id: "r1",
        kategorija: "rafting",
        kicker: "1 DAN · 0 NOĆENJA",
        naslov: "Jednodnevni rafting",
        opis:
          "18 km i 18 bukova. 50 € bez ručka ili 65 € sa domaćim ručkom.",
        cijena: "50€",
        href: "/rafting/jednodnevni",
        slika: {
          src: `${HERO}/raftingtarom-jednodnevni.jpg`,
          alt: "Jednodnevni rafting na Tari — spust kroz kanjon",
        },
      },
      {
        id: "r2",
        kategorija: "rafting",
        kicker: "2 DANA · 1 NOĆENJE",
        naslov: "Dvodnevni aranžman",
        opis:
          "Jedno veče u kampu i jedan dan na rijeci — od 100 €.",
        cijena: "100€",
        href: "/rafting/dvodnevni",
        slika: {
          src: `${HERO}/raftingtarom-dvodnevni.jpg`,
          alt: "Dvodnevni rafting aranžman na Tari",
        },
      },
      {
        id: "r3",
        kategorija: "rafting",
        kicker: "3 DANA · 2 NOĆENJA",
        naslov: "Trodnevni aranžman",
        opis:
          "Najtraženiji aranžman: rafting, dvije večeri i dan za Sutjesku ili mir.",
        cijena: "140€",
        href: "/rafting/trodnevni",
        tag: "NAJTRAŽENIJE",
        slika: {
          src: `${HERO}/raftingtarom-trodnevni.jpg`,
          alt: "Trodnevni rafting aranžman na Tari",
        },
      },
      {
        id: "r4",
        kategorija: "rafting",
        kicker: "4 DANA · CIJELI TOK",
        naslov: "Rafting cijelom Tarom",
        opis:
          "76 km — pećine, vodopadi i noć u najdubljoj tački kanjona.",
        cijena: "300€",
        href: "/rafting/cijela-tara",
        slika: {
          src: `${HERO}/raftingtarom-cetverodnevni.jpg`,
          alt: "Rafting cijelim tokom Tare — 76 kilometara",
        },
      },
    ],
  },
  {
    id: "kanjoning",
    naslov: "Kanjoning",
    note: "uz iskusne vodiče",
    cols: "2",
    stavke: [
      {
        id: "k1",
        kategorija: "kanjoning",
        kicker: "NEVIDIO · ZAHTJEVNO",
        naslov: "Kanjoning Nevidio",
        opis:
          "Najzahtjevniji kanjon Crne Gore — Komarnica ispod Durmitora. Sezona jun–okt.",
        cijena: "130€",
        href: "/kanjoning/nevidio",
        slika: {
          src: `${HERO}/kanjoning-pocetna.jpg`,
          alt: "Kanjoning Nevidio — spust niz vodopad u kanjonu",
        },
      },
      {
        id: "k2",
        kategorija: "kanjoning",
        kicker: "HRČAVKA · ZA POČETNIKE",
        naslov: "Kanjoning Hrčavka",
        opis:
          "Pitomiji kanjon u NP Sutjeska, kod Tjentišta. Idealan za prvi kanjoning.",
        cijena: "120€",
        href: "/kanjoning/hrcavka",
        slika: {
          src: `${GAL}/galerija15.jpg`,
          alt: "Kanjoning Hrčavka — učesnici ispred vodopada u kanjonu",
        },
      },
    ],
  },
  {
    id: "izleti",
    naslov: "Izleti i kombinacije",
    note: "rafting + dodatak",
    cols: "3",
    stavke: [
      {
        id: "i1",
        kategorija: "izleti",
        kicker: "KOMBINACIJA",
        naslov: "Rafting + kanjoning",
        opis:
          "Dan na Tari i dan u kanjonu — za one koji žele duplu dozu adrenalina.",
        cijena: "na upit",
        cijenaLabel: "",
        href: "/izleti",
        slika: {
          src: `${HERO}/kanjoning-pocetna.jpg`,
          alt: "Kombinacija raftinga i kanjoninga",
        },
      },
      {
        id: "i2",
        kategorija: "izleti",
        kicker: "KOMBINACIJA",
        naslov: "Rafting + NP Sutjeska",
        opis:
          "Voda jedan dan, prašuma Perućica i Trnovačko jezero drugi.",
        cijena: "na upit",
        cijenaLabel: "",
        href: "/izleti",
        slika: {
          src: `${BLOG}/blog-np-sutjeska-konak.jpg`,
          alt: "Rafting i izlet u Nacionalni park Sutjeska",
        },
      },
      {
        id: "i3",
        kategorija: "izleti",
        kicker: "PLANINSKI IZLETI",
        naslov: "Durmitor · Zelengora · Piva",
        opis:
          "Cjelodnevni izleti u prirodu u okolini kampa, kao predah od vode.",
        cijena: "na upit",
        cijenaLabel: "",
        href: "/izleti",
        slika: {
          src: `${HERO}/izleti-konak.png`,
          alt: "Planinski izleti — Durmitor, Zelengora i Piva",
        },
      },
    ],
  },
];

const COLS_CLS: Record<OfferGroup["cols"], string> = {
  "4": "kon-cards-4",
  "2": "kon-cards-2",
  "3": "kon-cards-3",
};

export function PonudaCatalog() {
  const [filter, setFilter] = useState<Filter>("sve");

  const vidljive = GRUPE.filter(
    (g) => filter === "sve" || g.id === filter,
  );

  return (
    <>
      <p
        className="font-sans text-body"
        style={{ fontSize: "clamp(16px, 1.35vw, 18px)", lineHeight: 1.65 }}
      >
        Cijene su{" "}
        <strong className="font-semibold text-ink">po osobi</strong> i okvirne su
        („od"); tačan iznos zavisi od termina (radni dan / vikend), veličine grupe
        i izabranih dodataka. Konačnu ponudu šaljemo nakon upita.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter ponude">
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
              {f.label}
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
                <OfferCard key={s.id} {...s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
