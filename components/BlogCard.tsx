import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

interface BlogCardProps {
  slika?: { src: string; alt: string };
  kategorija: string;
  naslov: string;
  opis: string;
  href: string;
  featured?: boolean;
}

const LIFT =
  "transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-card-hover";
const ZOOM = "transition-transform duration-500 group-hover:scale-105";

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

export function BlogCard({
  slika,
  kategorija,
  naslov,
  opis,
  href,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <Link
        href={href}
        className={`group grid overflow-hidden rounded-card bg-ink text-white md:grid-cols-[1.1fr_0.9fr] ${LIFT}`}
      >
        <ImageSlot
          src={slika?.src}
          alt={slika?.alt}
          className="aspect-[16/10] md:aspect-auto md:min-h-[280px]"
          imageClassName={ZOOM}
          gradient="var(--gradient-slot-3)"
          sizes="(max-width: 768px) 100vw, 640px"
        />
        <div className="flex flex-col justify-center gap-3 p-7 md:p-9">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal-light">
            {kategorija}
          </span>
          <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">{naslov}</h3>
          <p className="font-sans text-[15px] leading-relaxed text-on-dark-muted">{opis}</p>
          <span className="mt-1 inline-flex items-center gap-1 font-sans text-sm font-bold text-amber-light">
            Pročitaj
            <Arrow />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-card border border-line bg-surface ${LIFT}`}
    >
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[16/10]"
        imageClassName={ZOOM}
        gradient="var(--gradient-slot-2)"
      />
      <div className="p-[22px]">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
          {kategorija}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{naslov}</h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">{opis}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-bold text-terracotta">
          Pročitaj
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
