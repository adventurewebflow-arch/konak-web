import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

interface OfferCardProps {
  kicker: string;
  naslov: string;
  opis: string;
  cijena: string;
  cijenaLabel?: string;
  href: string;
  tag?: string;
  slika?: { src: string; alt: string };
  gradient?: string;
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

export function OfferCard({
  kicker,
  naslov,
  opis,
  cijena,
  cijenaLabel = "od",
  href,
  tag,
  slika,
  gradient = "var(--gradient-slot-1)",
}: OfferCardProps) {
  const highlighted = Boolean(tag);

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-card ${LIFT} ${
        highlighted
          ? "border-2 border-amber bg-surface shadow-featured"
          : "border border-line bg-surface"
      }`}
    >
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[5/4] w-full"
        imageClassName={ZOOM}
        gradient={gradient}
        sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 25vw"
      >
        {tag && (
          <span className="absolute left-3 top-3 rounded-pill bg-amber px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-ink shadow-featured">
            {tag}
          </span>
        )}
      </ImageSlot>

      <div className={`flex flex-1 flex-col p-5 ${highlighted ? "bg-surface-warm" : ""}`}>
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-teal">
          {kicker}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink">{naslov}</h3>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-text-secondary">
          {opis}
        </p>
        <div className="my-4 h-px bg-line" />
        <div className="flex items-end justify-between gap-3">
          <div>
            {cijena !== "na upit" && (
              <span className="block font-sans text-[11px] text-faint">po osobi</span>
            )}
            <span className="font-display text-2xl font-bold text-pine">
              {cijena === "na upit" ? (
                <span className="font-sans text-lg font-semibold italic text-text-secondary">
                  na upit
                </span>
              ) : (
                <>
                  <span className="mr-1 font-sans text-xs font-semibold text-faint">
                    {cijenaLabel}
                  </span>
                  {cijena}
                </>
              )}
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 font-sans text-sm font-bold text-terracotta">
            Detaljnije
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
