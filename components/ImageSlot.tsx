import Image from "next/image";
import type { ReactNode } from "react";

interface ImageSlotProps {
  src?: string;
  alt?: string;
  /** Utility klase za odnos stranica / veličinu (npr. "aspect-[5/4]"). */
  className?: string;
  sizes?: string;
  /** Placeholder gradijent dok nema prave fotografije. */
  gradient?: string;
  /** Dodatne klase na <Image> (npr. zoom na hover). */
  imageClassName?: string;
  /** Sloj preko slike (overlay, oznake, naslov). */
  children?: ReactNode;
}

export function ImageSlot({
  src,
  alt = "",
  className = "",
  sizes = "(max-width: 768px) 100vw, 400px",
  gradient = "var(--gradient-slot-1)",
  imageClassName = "",
  children,
}: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
      )}
      {children}
    </div>
  );
}
