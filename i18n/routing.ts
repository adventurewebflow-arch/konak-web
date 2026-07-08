import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // SR = default (bez prefiksa na /), ostali jezici sa prefiksom (/en, /de, /ru)
  locales: ["sr", "en", "de", "ru"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
