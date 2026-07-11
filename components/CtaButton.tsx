import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface CtaButtonProps {
  children: ReactNode;
  /** primary = terracotta (CTA) · secondary = pine (na svijetlom) · ghost = border (na tamnom) */
  variant?: Variant;
  size?: Size;
  /** Interna ruta (locale-aware) ili eksterni link (tel:, mailto:, https:, wa.me). Bez href → <button>. */
  href?: string;
  /** Prikaži strelicu koja se pomjera na hover. */
  arrow?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
}

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-sans font-bold leading-none transition-all duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

const SIZES: Record<Size, string> = {
  md: "px-8 py-4 text-base",
  sm: "px-6 py-3 text-[15px]",
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-terracotta text-white hover:bg-terracotta-hover",
  secondary: "bg-pine text-white hover:bg-pine-hover",
  ghost: "border border-white/35 text-white hover:bg-white/20",
};

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:|sms:)/.test(href) || href.includes("wa.me");
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
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

export function CtaButton({
  children,
  variant = "primary",
  size = "md",
  href,
  arrow = false,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
}: CtaButtonProps) {
  const shadow =
    variant === "primary" ? (size === "sm" ? "shadow-cta-sm" : "shadow-cta") : "";
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${shadow} ${
    disabled ? "pointer-events-none opacity-50" : ""
  } ${className}`.trim();

  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
