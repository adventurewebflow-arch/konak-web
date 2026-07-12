"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { CtaButton } from "./CtaButton";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavChild = { href: string; labelKey: string };
type NavItem =
  | { type: "link"; href: string; labelKey: string }
  | { type: "group"; labelKey: string; href: string; children: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/", labelKey: "home" },
  { type: "link", href: "/ponuda", labelKey: "offer" },
  { type: "link", href: "/rafting", labelKey: "rafting" },
  { type: "link", href: "/aktivnosti", labelKey: "activities" },
  {
    type: "group",
    labelKey: "camp",
    href: "/kamp",
    children: [
      { href: "/kamp", labelKey: "aboutCamp" },
      { href: "/smjestaj", labelKey: "accommodation" },
      { href: "/hrana", labelKey: "food" },
    ],
  },
  { type: "link", href: "/galerija", labelKey: "gallery" },
  { type: "link", href: "/blog", labelKey: "blog" },
  { type: "link", href: "/kontakt", labelKey: "contact" },
];

const MOBILE_MQ = "(max-width: 959px)";
const TOP_SHOW_Y = 24;
const SCROLL_DELTA = 6;

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

function HamburgerIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [kampOpen, setKampOpen] = useState(false);
  const [desktopKampOpen, setDesktopKampOpen] = useState(false);
  const kampRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const openRef = useRef(open);

  openRef.current = open;

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      const isMobile = window.matchMedia(MOBILE_MQ).matches;

      setScrolled(y > 8);

      if (!isMobile) {
        setNavHidden(false);
        lastY.current = y;
        return;
      }

      // Dok je meni otvoren, bar ostaje vidljiv.
      if (openRef.current) {
        setNavHidden(false);
        lastY.current = y;
        return;
      }

      if (y <= TOP_SHOW_Y) {
        setNavHidden(false);
      } else if (delta > SCROLL_DELTA) {
        setNavHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setNavHidden(false);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setKampOpen(false);
    setDesktopKampOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) setNavHidden(false);
  }, [open]);

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

  const showFloat = navHidden && !open;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-[16px] transition-[background-color,box-shadow,border-color,transform,opacity] duration-[250ms] ease-out ${
          scrolled
            ? "border-line-nav bg-paper/95 shadow-nav"
            : "border-transparent bg-paper/90"
        } ${
          navHidden && !open
            ? "max-[959px]:-translate-y-full max-[959px]:opacity-0 max-[959px]:pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: "var(--container)", padding: "14px var(--px-section)" }}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label={t("brandHomeAria")}
          >
            <Image
              src="/logo_konak.png"
              alt={tc("logoAlt")}
              width={200}
              height={80}
              className="h-[72px] w-auto object-contain sm:h-20"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-6 min-[960px]:flex xl:gap-7"
            aria-label={t("mainNavAria")}
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
                    {t(item.labelKey)}
                  </Link>
                );
              }

              const active = groupActive(pathname, item.children);
              return (
                <div
                  key={item.labelKey}
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
                    {t(item.labelKey)}
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
                              {t(child.labelKey)}
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
              {tc("bookNow")}
            </CtaButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilni-meni"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-md border border-line-nav text-ink min-[960px]:hidden"
            >
              <HamburgerIcon open={open} />
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
              aria-label={t("mobileNavAria")}
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
                      {t(item.labelKey)}
                    </Link>
                  );
                }

                const active = groupActive(pathname, item.children);
                return (
                  <div key={item.labelKey} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={kampOpen}
                      onClick={() => setKampOpen((v) => !v)}
                      className={`flex w-full items-center justify-between py-[13px] font-sans text-base ${
                        active ? "font-bold text-teal" : "font-semibold text-body"
                      }`}
                    >
                      {t(item.labelKey)}
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
                              {t(child.labelKey)}
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

      {/* Plutajući logo + hamburger — samo mobilni, kad je Nav sakriven */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between px-3.5 pt-3.5 min-[960px]:hidden ${
          showFloat ? "opacity-100" : "opacity-0"
        } transition-opacity duration-[250ms] ease-out`}
        aria-hidden={!showFloat}
      >
        <Link
          href="/"
          tabIndex={showFloat ? 0 : -1}
          aria-label={t("brandHomeAria")}
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-line-nav bg-paper shadow-nav ${
            showFloat ? "" : "pointer-events-none"
          }`}
        >
          <Image
            src="/logo_konak.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
        </Link>
        <button
          type="button"
          tabIndex={showFloat ? 0 : -1}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobilni-meni"
          aria-label={t("openMenu")}
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-line-nav bg-paper text-ink shadow-nav ${
            showFloat ? "" : "pointer-events-none"
          }`}
        >
          <HamburgerIcon open={false} />
        </button>
      </div>
    </>
  );
}
