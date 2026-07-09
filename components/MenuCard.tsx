import { ImageSlot } from "./ImageSlot";

interface MenuCardProps {
  eyebrow: string;
  naslov: string;
  opis: string;
  slika?: { src: string; alt: string };
  gradient?: string;
}

export function MenuCard({
  eyebrow,
  naslov,
  opis,
  slika,
  gradient = "var(--gradient-slot-1)",
}: MenuCardProps) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <ImageSlot
        src={slika?.src}
        alt={slika?.alt}
        className="aspect-[16/10] w-full"
        gradient={gradient}
        sizes="(max-width: 900px) 100vw, 50vw"
      />
      <div className="p-[22px]">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
          {eyebrow}
        </span>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">{naslov}</h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
          {opis}
        </p>
      </div>
    </article>
  );
}
