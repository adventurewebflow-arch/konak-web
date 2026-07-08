import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

export interface TourFakt {
  ikona?: ReactNode;
  tekst: string;
}

type TourVarijanta = "grid" | "red" | "tamna";

interface TourCardProps {
  slika?: { src: string; alt: string };
  /** Grid/tamna: velika oznaka preko slike (npr. „3 DANA"). Red: mali kicker. */
  kicker?: string;
  naslov: string;
  opis?: string;
  fakti?: TourFakt[];
  cijena: string;
  cijenaLabel?: string;
  href: string;
  /** Npr. „NAJTRAŽENIJE" → istaknuta (amber) varijanta. */
  tag?: string;
  varijanta?: TourVarijanta;
  /** Red varijanta: slika desno umjesto lijevo. */
  obrnuto?: boolean;
}

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaktBullet() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LIFT =
  "transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-card-hover";
const ZOOM = "transition-transform duration-500 group-hover:scale-105";

function Fakti({ fakti, iconCls, textCls }: { fakti?: TourFakt[]; iconCls: string; textCls: string }) {
  if (!fakti?.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
      {fakti.map((f, i) => (
        <li key={i} className={`inline-flex items-center gap-1.5 font-sans text-[13px] ${textCls}`}>
          <span className={iconCls}>{f.ikona ?? <FaktBullet />}</span>
          {f.tekst}
        </li>
      ))}
    </ul>
  );
}

function Cijena({
  cijena,
  cijenaLabel,
  labelCls,
  priceCls,
  detaljnijeLabel,
}: {
  cijena: string;
  cijenaLabel?: string;
  labelCls: string;
  priceCls: string;
  detaljnijeLabel: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-baseline gap-1">
        {cijenaLabel && <span className={`font-sans text-xs ${labelCls}`}>{cijenaLabel}</span>}
        <span className={`font-display text-2xl font-bold ${priceCls}`}>{cijena}</span>
      </span>
      <span className="inline-flex items-center gap-1 font-sans text-sm font-bold text-terracotta">
        {detaljnijeLabel}
        <Arrow />
      </span>
    </div>
  );
}

export function TourCard({
  slika,
  kicker,
  naslov,
  opis,
  fakti,
  cijena,
  cijenaLabel = "od",
  href,
  tag,
  varijanta = "grid",
  obrnuto = false,
}: TourCardProps) {
  const highlighted = Boolean(tag);

  // ---- RED varijanta (horizontalna) ----
  if (varijanta === "red") {
    return (
      <Link
        href={href}
        className={`group flex flex-col overflow-hidden rounded-card border border-line bg-surface ${LIFT} ${
          obrnuto ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <ImageSlot
          src={slika?.src}
          alt={slika?.alt}
          className="aspect-[16/10] md:aspect-auto md:min-h-[240px] md:basis-[46%]"
          imageClassName={ZOOM}
          gradient="var(--gradient-slot-2)"
          sizes="(max-width: 768px) 100vw, 520px"
        />
        <div className="flex flex-col justify-center gap-3 p-6 md:basis-[54%]">
          {kicker && (
            <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal">
              {kicker}
            </span>
          )}
          <h3 className="font-display text-2xl font-semibold text-ink">{naslov}</h3>
          {opis && <p className="font-sans text-sm leading-relaxed text-text-secondary">{opis}</p>}
          <Fakti fakti={fakti} iconCls="text-teal" textCls="text-text-secondary" />
          <div className="mt-1">
            <Cijena
              cijena={cijena}
              cijenaLabel={cijenaLabel}
              labelCls="text-faint"
              priceCls="text-pine"
              detaljnijeLabel="Pogledaj program"
            />
          </div>
        </div>
      </Link>
    );
  }

  // ---- GRID / TAMNA (vertikalna) ----
  const isTamna = varijanta === "tamna";
  const container = isTamna
    ? "bg-ink border border-white/12"
    : highlighted
      ? "bg-surface border-2 border-amber shadow-featured"
      : "bg-surface border border-line";

  const bodyBg = highlighted ? "bg-surface-warm" : "";
  const faktIcon = isTamna ? "text-teal-light" : highlighted ? "text-terracotta" : "text-teal";
  const faktText = isTamna ? "text-on-dark-muted" : "text-text-secondary";
  const sepCls = isTamna ? "bg-white/12" : "bg-line";
  const priceCls = isTamna ? "text-teal-light" : "text-pine";
  const labelCls = isTamna ? "text-on-dark-muted" : "text-faint";

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-card ${container} ${LIFT}`}
    >
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[5/4]"
        imageClassName={ZOOM}
        gradient="var(--gradient-slot-1)"
      >
        <div className="absolute inset-0" style={{ background: "var(--overlay-card)" }} aria-hidden="true" />
        {tag && (
          <span className="absolute left-3 top-3 rounded-pill bg-amber px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-ink shadow-featured">
            {tag}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5">
          {kicker && (
            <span className="block font-display text-[40px] font-extrabold leading-none text-white">
              {kicker}
            </span>
          )}
          <span className="mt-1 block font-display text-xl font-semibold text-white">{naslov}</span>
        </div>
      </ImageSlot>

      <div className={`p-5 ${bodyBg}`}>
        {opis && <p className={`mb-3 font-sans text-sm ${faktText}`}>{opis}</p>}
        <Fakti fakti={fakti} iconCls={faktIcon} textCls={faktText} />
        <div className={`my-4 h-px ${sepCls}`} />
        <Cijena
          cijena={cijena}
          cijenaLabel={cijenaLabel}
          labelCls={labelCls}
          priceCls={priceCls}
          detaljnijeLabel="Detaljnije"
        />
      </div>
    </Link>
  );
}
