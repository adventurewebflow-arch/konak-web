import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Prevod još ne postoji (Task 5). Dok fajl za traženi jezik ne postoji,
  // pada nazad na srpski skelet — sadržaj ostaje srpski na svim rutama.
  let messages: Record<string, unknown>;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../messages/${routing.defaultLocale}.json`))
      .default;
  }

  return { locale, messages };
});
