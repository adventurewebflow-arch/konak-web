"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { CtaButton } from "./CtaButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavChild = { href: string; label: string };
type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; href: string; children: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/", label: "Početna" },
  { type: "link", href: "/ponuda", label: "Ponuda" },
  { type: "link", href: "/rafting", label: "Rafting" },
  { type: "link", href: "/aktivnosti", label: "Aktivnosti" },
  {
    type: "group",
    label: "Kamp",
    href: "/kamp",
    children: [
      { href: "/kamp", label: "O kampu" },
      { href: "/smjestaj", label: "Smještaj" },
      { href: "/hrana", label: "Hrana" },
    ],
  },
  { type: "link", href: "/galerija", label: "Galerija" },
  { type: "link", href: "/blog", label: "Blog" },
  { type: "link", href: "/kontakt", label: "Kontakt" },
];

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function pathActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function groupActive(pathname: string, children: NavChild[]) {
  return children.some((c) => pathActive(pathname, c.href));
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [kampOpen, setKampOpen] = useState(false);
  const [desktopKampOpen, setDesktopKampOpen] = useState(false);
  const kampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setKampOpen(false);
    setDesktopKampOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopKampOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (kampRef.current && !kampRef.current.contains(e.target as Node)) {
        setDesktopKampOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopKampOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [desktopKampOpen]);

  const linkCls = (active: boolean) =>
    `font-sans text-[14.5px] tracking-[0.005em] transition-colors ${
      active ? "font-bold text-teal" : "font-semibold text-body hover:text-teal"
    }`;

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
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Rafting kamp Konak — početna"
        >
          <Image
            src="/logo_konak.png"
            alt="Konak Rafting Kamp"
            width={200}
            height={80}
            className="h-[72px] w-auto object-contain sm:h-20"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-6 min-[960px]:flex xl:gap-7"
          aria-label="Glavna navigacija"
        >
          {NAV_ITEMS.map((item) => {
            if (item.type === "link") {
              const active = pathActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkCls(active)}
                >
                  {item.label}
                </Link>
              );
            }

            const active = groupActive(pathname, item.children);
            return (
              <div
                key={item.label}
                ref={kampRef}
                className="relative"
                onMouseEnter={() => setDesktopKampOpen(true)}
                onMouseLeave={() => setDesktopKampOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={desktopKampOpen}
                  aria-haspopup="menu"
                  onClick={() => setDesktopKampOpen((v) => !v)}
                  className={`inline-flex items-center gap-1 ${linkCls(active)}`}
                >
                  {item.label}
                  <Chevron open={desktopKampOpen} />
                </button>
                {desktopKampOpen && (
                  <div
                    role="menu"
                    className="absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 pt-2"
                  >
                    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                      {item.children.map((child) => {
                        const childActive = pathActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            aria-current={childActive ? "page" : undefined}
                            className={`block border-b border-line px-4 py-3 font-sans text-sm last:border-b-0 ${
                              childActive
                                ? "bg-mint-surface font-bold text-teal"
                                : "font-semibold text-body hover:bg-sand hover:text-teal"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden min-[960px]:flex" />
          <CtaButton
            variant="primary"
            size="sm"
            href="/rezervacija"
            className="hidden min-[960px]:inline-flex"
          >
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
            {NAV_ITEMS.map((item) => {
              if (item.type === "link") {
                const active = pathActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-line py-[13px] font-sans text-base transition-colors ${
                      active ? "font-bold text-teal" : "font-semibold text-body hover:text-teal"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const active = groupActive(pathname, item.children);
              return (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={kampOpen}
                    onClick={() => setKampOpen((v) => !v)}
                    className={`flex w-full items-center justify-between py-[13px] font-sans text-base ${
                      active ? "font-bold text-teal" : "font-semibold text-body"
                    }`}
                  >
                    {item.label}
                    <Chevron open={kampOpen} />
                  </button>
                  {kampOpen && (
                    <div className="flex flex-col pb-2 pl-3">
                      {item.children.map((child) => {
                        const childActive = pathActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={`border-b border-line/70 py-2.5 font-sans text-[15px] last:border-b-0 ${
                              childActive
                                ? "font-bold text-teal"
                                : "font-semibold text-text-secondary hover:text-teal"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <LanguageSwitcher className="pt-4" />
          </nav>
        </div>
      )}
    </header>
  );
}
