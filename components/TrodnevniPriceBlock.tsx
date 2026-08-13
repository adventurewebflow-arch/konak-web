"use client";

import { useTranslations } from "next-intl";
import {
  TRODNEVNI_WEEKDAY,
  TRODNEVNI_WEEKEND,
  eur,
} from "@/lib/prices";

type Variant = "dark" | "light";

export function TrodnevniPriceBlock({ variant }: { variant: Variant }) {
  const t = useTranslations("Common");
  const dark = variant === "dark";

  const labelCls = dark
    ? "text-on-dark-muted"
    : "text-text-secondary";
  const priceCls = dark
    ? "font-display text-base font-bold text-white"
    : "font-display text-sm font-bold text-pine";
  const slashCls = dark
    ? "font-sans text-[11px] font-normal text-on-dark-muted"
    : "font-sans text-[11px] font-normal text-faint";
  const noteCls = dark
    ? "mt-2 font-sans text-xs leading-relaxed text-on-dark-muted"
    : "mt-1.5 font-sans text-[11px] leading-snug text-faint";
  const headingCls = dark
    ? "font-sans text-sm text-on-dark-muted"
    : "font-sans text-xs font-semibold text-text-secondary";

  const tiers = [
    { label: t("trodnevniPrice.two"), price: eur(TRODNEVNI_WEEKEND.two) },
    { label: t("trodnevniPrice.three"), price: eur(TRODNEVNI_WEEKEND.three) },
    { label: t("trodnevniPrice.fourPlus"), price: eur(TRODNEVNI_WEEKEND.fourPlus) },
  ];

  return (
    <div>
      <ul className="flex flex-col gap-1.5">
        <li className="flex items-baseline justify-between gap-3 font-sans text-sm">
          <span className={labelCls}>{t("trodnevniPrice.weekday")}</span>
          <span className={priceCls}>{eur(TRODNEVNI_WEEKDAY)}</span>
        </li>
        <li>
          <span className={headingCls}>{t("trodnevniPrice.weekend")}</span>
          <ul className="mt-1 flex flex-col gap-1 pl-3">
            {tiers.map((tier) => (
              <li
                key={tier.label}
                className="flex items-baseline justify-between gap-3 font-sans text-sm"
              >
                <span className={labelCls}>{tier.label}</span>
                <span className={priceCls}>
                  {tier.price}
                  <span className={`ml-1 ${slashCls}`}>
                    {t("perPersonSlash")}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <p className={noteCls}>{t("trodnevniPrice.note")}</p>
    </div>
  );
}
