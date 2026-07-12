"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ImageSlot } from "./ImageSlot";

export interface GalleryItem {
  href: string;
  src?: string;
  alt?: string;
  gradient?: string;
}

interface GallerySliderProps {
  items: GalleryItem[];
  /** aria-label za svaku pločicu (npr. „Galerija sa Tare"). */
  label?: string;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GallerySlider({ items, label }: GallerySliderProps) {
  const t = useTranslations("Gallery");
  const trackRef = useRef<HTMLDivElement>(null);
  const tileLabel = label ?? t("defaultLabel");

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowCls =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-surface text-pine shadow-soft transition-colors hover:bg-surface-warm sm:flex";

  return (
    <div className="relative">
      <div ref={trackRef} className="kon-slider">
        {items.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            aria-label={tileLabel}
            className="kon-slide group block overflow-hidden rounded-md"
          >
            <ImageSlot
              className="aspect-[3/4] h-full"
              gradient={it.gradient}
              src={it.src}
              alt={it.alt}
              imageClassName="transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 700px) 70vw, 300px"
            />
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label={t("sliderPrev")}
        className={`${arrowCls} left-2`}
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label={t("sliderNext")}
        className={`${arrowCls} right-2`}
      >
        <Chevron dir="right" />
      </button>
    </div>
  );
}
