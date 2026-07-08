import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CtaButton } from "./CtaButton";

type Variant = "a" | "b";

interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  arrow?: boolean;
}

interface TrustItem {
  icon: ReactNode;
  label: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  variant?: Variant;
  eyebrow?: string;
  naslov: ReactNode;
  lead?: string;
  slika?: HeroImage;
  /** Visina za varijantu B (npr. "56vh"). Za A je uvijek 92vh. */
  visina?: string;
  /** Trust stavke (varijanta A). Ako se izostavi, koristi se podrazumijevani set. */
  trust?: TrustItem[];
  /** „Nazad" link (varijanta B). */
  nazadLink?: { href: string; label: string };
  cta?: HeroCta[];
}

function IconStar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8-4.3-4.1 5.9-.9L12 3Z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 2.5V11c0 4.6-3 8-7 9.5C8 19 5 15.6 5 11V5.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21c4-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 3 7 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const DEFAULT_TRUST: TrustItem[] = [
  { icon: <IconStar />, label: "Google 5.0" },
  { icon: <IconShield />, label: "Licencirani skiperi" },
  { icon: <IconPin />, label: "Hum, Foča" },
];

function Topo() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="var(--teal-contour)" strokeWidth="1.5" opacity="0.12">
        <path d="M-40 180C220 90 420 260 660 190 900 120 1080 280 1320 180" />
        <path d="M-40 260C220 170 420 340 660 270 900 200 1080 360 1320 260" />
        <path d="M-40 340C220 250 420 420 660 350 900 280 1080 440 1320 340" />
        <path d="M-40 420C220 330 420 500 660 430 900 360 1080 520 1320 420" />
        <path d="M-40 500C220 410 420 580 660 510 900 440 1080 600 1320 500" />
        <path d="M-40 580C220 490 420 660 660 590 900 520 1080 680 1320 580" />
      </g>
    </svg>
  );
}

function Eyebrow({ text, variant }: { text: string; variant: Variant }) {
  if (variant === "a") {
    return (
      <span className="inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/8 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-light backdrop-blur-sm">
        {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-light">
      <span className="h-[1.5px] w-[22px] bg-amber-light" aria-hidden="true" />
      {text}
    </span>
  );
}

export function Hero({
  variant = "a",
  eyebrow,
  naslov,
  lead,
  slika,
  visina,
  trust,
  nazadLink,
  cta = [],
}: HeroProps) {
  const isA = variant === "a";
  const minHeight = isA ? "92vh" : (visina ?? "56vh");
  const trustItems = trust ?? DEFAULT_TRUST;

  return (
    <section
      className="relative isolate flex flex-col overflow-hidden text-white"
      style={{ minHeight, background: "var(--gradient-hero)" }}
    >
      {/* Slika (opciono) + overlay-i za čitljivost */}
      {slika && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slika.src}
              alt={slika.alt}
              fill
              priority={isA}
              sizes="100vw"
              className="object-cover kon-heroimg"
              style={{ animation: "konHeroZoom 1.4s ease-out both" }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "var(--overlay-hero-v)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--overlay-hero-h)" }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Topografski dekor */}
      <Topo />

      {/* Trust traka (samo A) */}
      {isA && trustItems.length > 0 && (
        <div className="relative z-10 border-b border-white/10">
          <div
            className="mx-auto flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
            style={{ maxWidth: "var(--container)", padding: "14px var(--px-section)" }}
          >
            {trustItems.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 font-sans text-[12.5px] font-semibold text-on-dark"
              >
                <span className="text-amber">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sadržaj */}
      <div
        className={`relative z-10 mx-auto flex w-full flex-1 flex-col justify-center ${
          isA ? "items-center text-center" : "items-start text-left"
        }`}
        style={{
          maxWidth: "var(--container)",
          padding: "48px var(--px-section) 64px",
        }}
      >
        {/* Nazad link (samo B) */}
        {!isA && nazadLink && (
          <Link
            href={nazadLink.href}
            className="mb-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-on-dark-muted transition-colors hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {nazadLink.label}
          </Link>
        )}

        {eyebrow && (
          <div style={{ animation: "konUp 0.6s ease-out both" }}>
            <Eyebrow text={eyebrow} variant={variant} />
          </div>
        )}

        <h1
          className="mt-5 max-w-4xl font-display font-extrabold text-white"
          style={{
            fontSize: isA
              ? "clamp(56px, 9vw, 128px)"
              : "clamp(34px, 5vw, 68px)",
            lineHeight: isA ? 0.9 : 0.98,
            letterSpacing: isA ? "-0.03em" : "-0.025em",
            animation: "konUp 0.6s ease-out 0.05s both",
          }}
        >
          {naslov}
        </h1>

        {lead && (
          <p
            className={`mt-6 font-sans text-on-dark ${isA ? "max-w-2xl" : "max-w-xl"}`}
            style={{
              fontSize: "clamp(16px, 1.8vw, 23px)",
              lineHeight: 1.55,
              animation: "konUp 0.6s ease-out 0.1s both",
            }}
          >
            {lead}
          </p>
        )}

        {cta.length > 0 && (
          <div
            className={`mt-8 flex flex-wrap gap-3.5 ${isA ? "justify-center" : ""}`}
            style={{ animation: "konUp 0.6s ease-out 0.15s both" }}
          >
            {cta.map((c, i) => (
              <CtaButton
                key={c.href + i}
                href={c.href}
                variant={c.variant ?? (i === 0 ? "primary" : "ghost")}
                arrow={c.arrow}
              >
                {c.label}
              </CtaButton>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indikator (samo A) */}
      {isA && (
        <div className="relative z-10 flex justify-center pb-7" aria-hidden="true">
          <span className="flex h-9 w-6 items-start justify-center rounded-pill border border-white/40 p-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-white"
              style={{ animation: "konScrollDot 1.6s ease-in-out infinite" }}
            />
          </span>
        </div>
      )}
    </section>
  );
}
