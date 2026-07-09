import { Link } from "@/i18n/navigation";
import { CtaButton } from "./CtaButton";

const PHONE_DISPLAY = "+387 65 848 110";
const PHONE_TEL = "+38765848110";
const PHONE_DIGITS = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/prErkjurQca1w3ccA";

const FOOTER_LINKS = [
  { href: "/", label: "Početna" },
  { href: "/ponuda", label: "Ponuda" },
  { href: "/rafting", label: "Rafting" },
  { href: "/kamp", label: "Kamp" },
  { href: "/galerija", label: "Galerija" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

function Topo() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1280 480"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="var(--teal-contour)" strokeWidth="1.5" opacity="0.1">
        <path d="M-40 120C180 60 360 180 560 130 760 80 940 190 1320 110" />
        <path d="M-40 180C180 120 360 240 560 190 760 140 940 250 1320 170" />
        <path d="M-40 240C180 180 360 300 560 250 760 200 940 310 1320 230" />
        <path d="M-40 300C180 240 360 360 560 310 760 260 940 370 1320 290" />
        <path d="M-40 360C180 300 360 420 560 370 760 320 940 430 1320 350" />
      </g>
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 1-.8 1.8-1.8 1.7C11 22 2 13 3.3 5.8 3.4 4.8 4.2 4 5.2 4h1.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c4-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 3 7 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4c.4 2.2 1.8 3.7 4 4v3c-1.5 0-2.9-.5-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .7 0 1 .1v3.1a2.4 2.4 0 1 0 1.5 2.3V4H14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 8.5V7c0-.8.5-1 1-1H17V3h-2.3C12.4 3 11 4.5 11 6.7V8.5H9V12h2v9h3.5v-9H17l.5-3.5h-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/raftingkampkonak/", Icon: IconInstagram },
  { label: "TikTok", href: "https://tiktok.com/@tararafting2", Icon: IconTikTok },
  { label: "Facebook", href: "https://facebook.com/RaftingKonak/", Icon: IconFacebook },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-pine text-[#cfe0d6]">
      <Topo />

      <div
        className="relative mx-auto"
        style={{
          maxWidth: "var(--container)",
          padding: "clamp(60px, 9vh, 104px) var(--px-section) 36px",
        }}
      >
        {/* Gornji dio */}
        <div className="grid gap-[clamp(36px,6vw,90px)] min-[861px]:grid-cols-[1.3fr_1fr]">
          {/* Lijevo: poziv na akciju */}
          <div>
            <p className="mb-4 inline-flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-light">
              <span className="h-[1.5px] w-[22px] bg-amber-light" aria-hidden="true" />
              Spremni za Taru?
            </p>
            <h2
              className="max-w-xl font-display font-bold text-white"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
            >
              Rezerviši svoju avanturu na Tari
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-[#cfe0d6]">
              Javi nam se za slobodne termine i savjet oko izbora ture — od
              jednodnevnog rafta do cijele Tare, kanjoninga i smještaja u kampu.
            </p>
            <div className="mt-7">
              <CtaButton variant="primary" href="/rezervacija" arrow>
                Rezerviši turu
              </CtaButton>
            </div>
          </div>

          {/* Desno: kontakt + social */}
          <div className="min-[861px]:justify-self-end">
            <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-light">
              Kontakt
            </p>

            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="group inline-flex items-center gap-3 font-sans text-[15px] transition-colors hover:text-white"
                >
                  <span className="text-teal-light">
                    <IconPhone />
                  </span>
                  {PHONE_DISPLAY}
                </a>
                <span className="mt-1 block pl-[30px] font-sans text-[13px] text-on-dark-muted">
                  <a
                    href={`https://wa.me/${PHONE_DIGITS}`}
                    className="transition-colors hover:text-amber"
                  >
                    WhatsApp
                  </a>
                  {" · "}
                  <a
                    href={`viber://chat?number=%2B${PHONE_DIGITS}`}
                    className="transition-colors hover:text-amber"
                  >
                    Viber
                  </a>
                </span>
              </li>

              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 font-sans text-[15px] transition-colors hover:text-white"
                >
                  <span className="text-teal-light">
                    <IconMail />
                  </span>
                  {EMAIL}
                </a>
              </li>

              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-sans text-[15px] transition-colors hover:text-white"
                >
                  <span className="text-teal-light">
                    <IconPin />
                  </span>
                  Hum, Foča 73300, BiH
                </a>
              </li>
            </ul>

            {/* Social ikone */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-white/8 text-[#cfe0d6] transition-colors hover:bg-amber hover:text-pine"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Donji red */}
        <div className="mt-[clamp(40px,6vh,72px)] flex flex-col gap-4 border-t border-white/13 pt-7 min-[861px]:flex-row min-[861px]:items-center min-[861px]:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Podnožje navigacija">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[13.5px] font-semibold text-on-dark-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="font-sans text-[13px] text-on-dark-muted">
            © 2026 Rafting kamp Konak · Hum, Foča
          </p>
        </div>
      </div>
    </footer>
  );
}
