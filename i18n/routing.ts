import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // SR = default (bez prefiksa na /), EN sa prefiksom (/en)
  locales: ["sr", "en"],
  defaultLocale: "sr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
