"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
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
  /** Red varijanta: tamna (pine) pozadina umjesto svijetle. */
  tamna?: boolean;
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
  cijenaLabel,
  href,
  tag,
  varijanta = "grid",
  obrnuto = false,
  tamna = false,
}: TourCardProps) {
  const t = useTranslations("Common");
  const fromLabel = cijenaLabel ?? t("from");
  const highlighted = Boolean(tag);

  // ---- RED varijanta (horizontalna) ----
  if (varijanta === "red") {
    const redBorder = tamna
      ? "border border-white/12"
      : highlighted
        ? "border-2 border-amber shadow-featured"
        : "border border-line";
    const redBg = tamna ? "bg-pine" : "bg-surface";
    const redBodyBg = !tamna && highlighted ? "bg-surface-warm" : "";
    const redKicker = tamna ? "text-teal-light" : highlighted ? "text-terracotta" : "text-teal";
    const redTitle = tamna ? "text-white" : "text-ink";
    const redText = tamna ? "text-on-dark-muted" : "text-text-secondary";
    const redPrice = tamna ? "text-teal-light" : "text-pine";
    const redLabel = tamna ? "text-on-dark-muted" : "text-faint";

    return (
      <Link
        href={href}
        className={`group flex flex-col overflow-hidden rounded-card ${redBg} ${redBorder} ${LIFT} ${
          obrnuto ? "min-[880px]:flex-row-reverse" : "min-[880px]:flex-row"
        }`}
      >
        <ImageSlot
          src={slika?.src}
          alt={slika?.alt}
          className="aspect-[16/10] min-[880px]:aspect-auto min-[880px]:min-h-[240px] min-[880px]:basis-[46%]"
          imageClassName={ZOOM}
          gradient={tamna ? "var(--gradient-slot-3)" : "var(--gradient-slot-2)"}
          sizes="(max-width: 880px) 100vw, 520px"
        >
          {tag && (
            <span className="absolute left-3 top-3 rounded-pill bg-amber px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-ink shadow-featured">
              {tag}
            </span>
          )}
        </ImageSlot>
        <div
          className={`flex flex-col justify-center gap-3 p-6 min-[880px]:basis-[54%] ${redBodyBg}`}
        >
          {kicker && (
            <span className={`font-sans text-xs font-bold uppercase tracking-[0.16em] ${redKicker}`}>
              {kicker}
            </span>
          )}
          <h3 className={`font-display text-2xl font-semibold ${redTitle}`}>{naslov}</h3>
          {opis && <p className={`font-sans text-sm leading-relaxed ${redText}`}>{opis}</p>}
          <Fakti fakti={fakti} iconCls={redKicker} textCls={redText} />
          <div className="mt-1">
            <Cijena
              cijena={cijena}
              cijenaLabel={fromLabel}
              labelCls={redLabel}
              priceCls={redPrice}
              detaljnijeLabel={t("viewProgram")}
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
          cijenaLabel={fromLabel}
          labelCls={labelCls}
          priceCls={priceCls}
          detaljnijeLabel={t("seeDetails")}
        />
      </div>
    </Link>
  );
}
