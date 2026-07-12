"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ImageSlot } from "./ImageSlot";

export type GalleryCat = "rafting" | "kamp" | "hrana";

export interface GalleryPhoto {
  id: string;
  labela: string;
  cat: GalleryCat;
  aspect: "3/4" | "4/3" | "1/1";
  src?: string;
  alt?: string;
  gradient?: string;
}

type Filter = "sve" | GalleryCat;

const FILTER_IDS: Filter[] = ["sve", "rafting", "kamp", "hrana"];

const FILTER_KEYS: Record<Filter, "all" | "rafting" | "camp" | "food"> = {
  sve: "all",
  rafting: "rafting",
  kamp: "camp",
  hrana: "food",
};

const ASPECT_CLS: Record<GalleryPhoto["aspect"], string> = {
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const t = useTranslations("Gallery");
  const [filter, setFilter] = useState<Filter>("sve");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "sve" ? photos : photos.filter((p) => p.cat === filter)),
    [photos, filter],
  );

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => {
      if (i === null || filtered.length === 0) return null;
      return (i - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => {
      if (i === null || filtered.length === 0) return null;
      return (i + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    if (lightboxIdx !== null && lightboxIdx >= filtered.length) {
      setLightboxIdx(filtered.length > 0 ? 0 : null);
    }
  }, [filtered.length, lightboxIdx]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label={t("filterAria")}>
        {FILTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            onClick={() => {
              setFilter(id);
              setLightboxIdx(null);
            }}
            className={`kon-chip ${filter === id ? "act" : ""}`}
          >
            {t(FILTER_KEYS[id])}
          </button>
        ))}
      </div>

      <div className="kon-gal mt-8">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className="kon-gal-item group w-full overflow-hidden rounded-card text-left"
            onClick={() => setLightboxIdx(i)}
            aria-label={t("openPhoto", { label: photo.labela })}
          >
            <ImageSlot
              src={photo.src}
              alt={photo.alt ?? photo.labela}
              className={`w-full ${ASPECT_CLS[photo.aspect]}`}
              gradient={photo.gradient}
              imageClassName="transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, 33vw"
            >
              <div
                className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,61,50,0) 45%, rgba(15,61,50,.6))",
                }}
              >
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                  {photo.labela}
                </span>
              </div>
            </ImageSlot>
          </button>
        ))}
      </div>

      {active && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[6000] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(8,20,16,.92)" }}
          role="dialog"
          aria-modal="true"
          aria-label={active.labela}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-pill border border-white/20 bg-white/10 font-sans text-2xl text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label={t("close")}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-pill border border-white/20 bg-white/10 font-sans text-2xl text-white transition-colors hover:bg-white/20 sm:left-4"
            aria-label={t("prev")}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-pill border border-white/20 bg-white/10 font-sans text-2xl text-white transition-colors hover:bg-white/20 sm:right-4"
            aria-label={t("next")}
          >
            ›
          </button>

          <div
            className="relative w-full overflow-hidden rounded-card-lg"
            style={{ width: "min(900px, 92vw)", height: "min(70vh, 720px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageSlot
              src={active.src}
              alt={active.alt ?? active.labela}
              className="h-full w-full"
              gradient={active.gradient}
              sizes="92vw"
            >
              <div
                className="absolute inset-x-0 bottom-0 rounded-b-card-lg px-5 pb-4 pt-16"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,61,50,0) 20%, rgba(15,61,50,.75))",
                }}
              >
                <span className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-white">
                  {active.labela}
                </span>
              </div>
            </ImageSlot>
          </div>
        </div>
      )}
    </>
  );
}
