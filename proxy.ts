import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: "middleware" je preimenovan u "proxy". next-intl handler ide kao
// default export; runtime je nodejs (proxy ne podržava edge).
export default createMiddleware(routing);

export const config = {
  // Preskoči API rute, Next interne putanje i fajlove sa ekstenzijom (slike, css…).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
