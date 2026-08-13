"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CtaButton } from "./CtaButton";

const STORAGE_KEY = "konak-weekend-nudge-dismissed";
const DELAY_MS = 4500;
const SCROLL_PX = 280;

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WeekendRaftingNudge() {
  const t = useTranslations("TuraDetalj.ui");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* private mode — still show once this visit */
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      if (window.scrollY >= SCROLL_PX) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside
      role="complementary"
      aria-label={t("weekendNudgeCta")}
      className="fixed inset-x-4 z-[5400] max-[719px]:bottom-[88px] min-[720px]:inset-x-auto min-[720px]:bottom-6 min-[720px]:right-6 min-[720px]:w-[min(100%-3rem,22rem)] motion-safe:animate-[konNudgeIn_0.4s_ease-out]"
    >
      <div className="relative overflow-hidden rounded-card border border-line bg-paper p-5 pl-6 pr-11 shadow-soft">
        <span
          className="absolute inset-y-3 left-0 w-1 rounded-full bg-teal"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("weekendNudgeClose")}
          className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-input text-muted transition-colors hover:bg-mint-surface hover:text-ink"
        >
          <IconClose />
        </button>
        <p className="font-sans text-sm leading-relaxed text-ink">
          {t("weekendNudgeText")}
        </p>
        <div className="mt-3.5">
          <CtaButton
            href="/rafting/vikend-dva-raftinga"
            variant="secondary"
            size="sm"
            arrow
            className="w-full"
            onClick={dismiss}
          >
            {t("weekendNudgeCta")}
          </CtaButton>
        </div>
      </div>
    </aside>
  );
}
