import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

interface StayCardProps {
  naslov: string;
  badge?: string;
  cijena?: string;
  opis: ReactNode;
  chips: string[];
  href: string;
  slika?: { src: string; alt: string };
  gradient?: string;
  linkLabel?: string;
}

const LIFT =
  "transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-card-hover";
const ZOOM = "transition-transform duration-500 group-hover:scale-105";

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StayCard({
  naslov,
  badge,
  cijena,
  opis,
  chips,
  href,
  slika,
  gradient = "var(--gradient-slot-2)",
  linkLabel = "Detaljnije →",
}: StayCardProps) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card-lg border border-line bg-surface ${LIFT}`}
    >
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[5/4] w-full"
        imageClassName={ZOOM}
        gradient={gradient}
        sizes="(max-width: 920px) 100vw, 560px"
      >
        {badge && (
          <span className="absolute left-4 top-4 rounded-pill bg-pine px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-white">
            {badge}
          </span>
        )}
        {cijena && (
          <span className="absolute bottom-4 right-4 rounded-pill bg-white/95 px-3 py-1.5 font-display text-lg font-bold text-pine backdrop-blur-sm">
            {cijena}
          </span>
        )}
      </ImageSlot>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{naslov}</h3>
        <div className="font-sans text-sm leading-relaxed text-text-secondary">{opis}</div>
        <ul className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-pill border border-line-chip bg-surface-warm px-3 py-1 font-sans text-xs font-semibold text-text-secondary"
            >
              {chip}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1 font-sans text-sm font-bold text-terracotta">
          {linkLabel}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
