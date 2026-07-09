import { Link } from "@/i18n/navigation";

const TEL = "+38765848110";
const WHATSAPP = "https://wa.me/38765848110";

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.4 3.5-2 1.3a12 12 0 0 0 5.3 5.3l1.3-2 3.5 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.25-.13-1.48-.73-1.7-.81-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.42.25-.39.71-1.3.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.03 2.59.13.17 1.77 2.7 4.28 3.79 1.6.69 2.22.75 3.02.63.49-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function MobileCtaBar() {
  return (
    <div
      className="kon-mobilecta fixed inset-x-0 bottom-0 items-center gap-2.5 border-t border-line-nav bg-paper/95 px-4 py-3 shadow-mobile-cta backdrop-blur-md"
      style={{ zIndex: 5500 }}
    >
      <a
        href={`tel:${TEL}`}
        aria-label="Pozovi telefonom"
        className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-input bg-pine text-white transition-colors hover:bg-pine-hover"
      >
        <IconPhone />
      </a>
      <a
        href={WHATSAPP}
        aria-label="Piši nam na WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-input border border-line-nav bg-surface text-pine transition-colors hover:bg-surface-warm"
      >
        <IconWhatsApp />
      </a>
      <Link
        href="/rezervacija"
        className="flex h-[54px] flex-1 items-center justify-center rounded-input bg-terracotta font-sans text-base font-bold text-white shadow-cta-sm transition-colors hover:bg-terracotta-hover"
      >
        Rezerviši turu
      </Link>
    </div>
  );
}
