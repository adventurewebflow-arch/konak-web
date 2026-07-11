import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

export type ActivityNivo = "lagano" | "srednje" | "zahtjevno" | "pocetnici";

interface ActivityCardProps {
  kategorija: string;
  naslov: string;
  trajanje: string;
  nivo: ActivityNivo;
  opis: string;
  cijena: string;
  href: string;
  ctaLabel?: string;
  slika?: { src: string; alt: string };
  gradient?: string;
}

const LIFT =
  "transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-card-hover";
const ZOOM = "transition-transform duration-500 group-hover:scale-105";

const NIVO_LABEL: Record<ActivityNivo, string> = {
  lagano: "Lagano",
  srednje: "Srednje",
  zahtjevno: "Zahtjevno",
  pocetnici: "Za početnike",
};

const NIVO_CHIP: Record<ActivityNivo, string> = {
  lagano: "border-mint-border bg-mint-surface text-teal",
  pocetnici: "border-mint-border bg-mint-surface text-teal",
  srednje: "border-line-chip bg-surface-warm text-amber",
  zahtjevno: "border-line bg-surface-warm text-terracotta",
};

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

export function ActivityCard({
  kategorija,
  naslov,
  trajanje,
  nivo,
  opis,
  cijena,
  href,
  ctaLabel = "Pitaj →",
  slika,
  gradient = "var(--gradient-slot-1)",
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface ${LIFT}`}
    >
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[16/10] w-full"
        imageClassName={ZOOM}
        gradient={gradient}
        sizes="(max-width: 560px) 100vw, (max-width: 940px) 50vw, 33vw"
      >
        <span className="absolute left-4 top-4 rounded-pill border border-white/25 bg-pine/85 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          {kategorija}
        </span>
      </ImageSlot>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{naslov}</h3>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-pill border border-line bg-surface px-2.5 py-1 font-sans text-[11px] font-semibold text-text-secondary">
            {trajanje}
          </span>
          <span
            className={`rounded-pill border px-2.5 py-1 font-sans text-[11px] font-semibold ${NIVO_CHIP[nivo]}`}
          >
            {NIVO_LABEL[nivo]}
          </span>
        </div>

        <p className="flex-1 font-sans text-sm leading-relaxed text-text-secondary">
          {opis}
        </p>

        <div className="mt-1 flex items-center justify-between border-t border-line pt-4">
          <span className="font-display text-xl font-bold text-ink">{cijena}</span>
          <span className="inline-flex items-center gap-1 font-sans text-sm font-bold text-terracotta">
            {ctaLabel}
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
