import type { ReactNode } from "react";
import { CtaButton } from "./CtaButton";
import { ImageSlot } from "./ImageSlot";
import { SectionHeader } from "./SectionHeader";

interface FeatureSplitProps {
  eyebrow: string;
  naslov: ReactNode;
  opis: string;
  chips: string[];
  /** Omjer kolona, npr. "1.1fr .9fr". */
  cols?: string;
  /** Slika lijevo na desktopu (default: desno). */
  imageLeft?: boolean;
  imageBadge?: string;
  slika?: { src: string; alt: string };
  imageGradient?: string;
  cta?: { label: string; href: string; variant?: "primary" | "secondary" };
}

export function FeatureSplit({
  eyebrow,
  naslov,
  opis,
  chips,
  cols = "1fr 1fr",
  imageLeft = false,
  imageBadge,
  slika,
  imageGradient = "var(--gradient-slot-2)",
  cta,
}: FeatureSplitProps) {
  const image = (
    <ImageSlot
      src={slika?.src}
      alt={slika?.alt}
      className="aspect-[4/3] w-full rounded-card-lg shadow-soft"
      gradient={imageGradient}
      sizes="(max-width: 960px) 100vw, 520px"
    >
      {imageBadge && (
        <span className="absolute left-4 top-4 rounded-pill bg-amber px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink shadow-featured">
          {imageBadge}
        </span>
      )}
    </ImageSlot>
  );

  const text = (
    <div className="flex flex-col justify-center">
      <SectionHeader eyebrow={eyebrow} naslov={naslov} />
      <p
        className="mt-6 max-w-xl font-sans text-body"
        style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.65 }}
      >
        {opis}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-pill border border-line-chip bg-surface px-4 py-2 font-sans text-sm font-semibold text-text-secondary"
          >
            {chip}
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-8">
          <CtaButton href={cta.href} variant={cta.variant ?? "secondary"} arrow>
            {cta.label}
          </CtaButton>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`kon-split kon-split-stack ${imageLeft ? "kon-split--img-left" : ""}`}
      style={{ ["--split-cols" as string]: cols }}
    >
      {imageLeft ? (
        <>
          <div className="kon-split-media">{image}</div>
          <div className="kon-split-body">{text}</div>
        </>
      ) : (
        <>
          <div className="kon-split-body">{text}</div>
          <div className="kon-split-media">{image}</div>
        </>
      )}
    </div>
  );
}
