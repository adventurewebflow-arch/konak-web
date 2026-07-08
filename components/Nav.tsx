"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { CtaButton } from "./CtaButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Finalni red linkova se potvrđuje posebno (COMPONENTS.md §1).
const LINKS = [
  { href: "/", label: "Početna" },
  { href: "/ponuda", label: "Ponuda" },
  { href: "/rafting", label: "Rafting" },
  { href: "/kamp", label: "Kamp" },
  { href: "/galerija", label: "Galerija" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

function LogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 17c2.5 1.5 4.5 1.5 6 0s3.5-1.5 6 0 4.5 1.5 6 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14.5 3.5 8 10l3.5 3.5L18 7l-3.5-3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 10 5.5 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zatvori mobilni meni pri promjeni rute.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-[16px] transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-line-nav bg-paper/95 shadow-nav"
          : "border-transparent bg-paper/90"
      }`}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: "var(--container)", padding: "14px var(--px-section)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rafting kamp Konak — početna">
          <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-pine text-white">
            <LogoIcon />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[22px] font-extrabold leading-none text-ink">
              KONAK
            </span>
            <span className="mt-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.32em] text-teal">
              Rafting kamp · Tara
            </span>
          </span>
        </Link>

        {/* Linkovi (desktop) */}
        <nav className="hidden items-center gap-7 min-[960px]:flex" aria-label="Glavna navigacija">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-sans text-[14.5px] tracking-[0.005em] transition-colors ${
                  active
                    ? "font-bold text-teal"
                    : "font-semibold text-body hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desno: jezik + CTA + hamburger */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden min-[960px]:flex" />
          <CtaButton variant="primary" size="sm" href="/rezervacija">
            Rezerviši
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobilni-meni"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-md border border-line-nav text-ink min-[960px]:hidden"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobilni meni */}
      {open && (
        <div
          id="mobilni-meni"
          className="border-t border-line-nav bg-paper/95 backdrop-blur-[16px] min-[960px]:hidden"
        >
          <nav
            className="mx-auto flex flex-col"
            style={{ maxWidth: "var(--container)", padding: "6px var(--px-section) 16px" }}
            aria-label="Mobilna navigacija"
          >
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-line py-[13px] font-sans text-base transition-colors ${
                    active ? "font-bold text-teal" : "font-semibold text-body hover:text-teal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <LanguageSwitcher className="pt-4" />
          </nav>
        </div>
      )}
    </header>
  );
}
