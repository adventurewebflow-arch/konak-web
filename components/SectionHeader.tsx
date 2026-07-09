import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface SectionHeaderProps {
  eyebrow: string;
  naslov: ReactNode;
  /** Opcioni link desno (npr. „Sve o raftingu →"). */
  link?: { href: string; label: string };
  /** „light" (na svijetloj sekciji) ili „dark" (na pine/ink sekciji). */
  tone?: "light" | "dark";
  className?: string;
}

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

export function SectionHeader({
  eyebrow,
  naslov,
  link,
  tone = "light",
  className = "",
}: SectionHeaderProps) {
  const eyebrowCls = tone === "dark" ? "text-amber-light" : "text-terracotta";
  const naslovCls = tone === "dark" ? "text-white" : "text-pine";
  const linkCls =
    tone === "dark"
      ? "text-teal-light hover:text-white"
      : "text-terracotta hover:text-terracotta-hover";

  return (
    <div
      className={`flex flex-col gap-4 ${
        link ? "sm:flex-row sm:items-end sm:justify-between" : ""
      } ${className}`}
    >
      <div>
        <span
          className={`font-sans text-xs font-bold uppercase tracking-[0.18em] ${eyebrowCls}`}
        >
          {eyebrow}
        </span>
        <h2
          className={`mt-3 font-display font-extrabold ${naslovCls}`}
          style={{
            fontSize: "clamp(30px, 4.5vw, 58px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
          }}
        >
          {naslov}
        </h2>
      </div>

      {link && (
        <Link
          href={link.href}
          className={`group inline-flex shrink-0 items-center gap-1.5 font-sans text-sm font-bold transition-colors ${linkCls}`}
        >
          {link.label}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
