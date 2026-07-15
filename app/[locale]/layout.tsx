import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { OG_IMAGES, SITE_URL } from "@/lib/seo";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial Black", "sans-serif"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rafting kamp Konak",
    template: "%s | Rafting kamp Konak",
  },
  description:
    "Rafting kamp Konak — rafting na Tari, kanjoning, smještaj i domaća kuhinja u Humu kod Foče.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rafting kamp Konak",
    locale: "sr_BA",
    title: "Rafting kamp Konak",
    description:
      "Rafting na Tari, kanjoning, smještaj i domaća kuhinja u Humu kod Foče.",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafting kamp Konak",
    description:
      "Rafting na Tari, kanjoning, smještaj i domaća kuhinja u Humu kod Foče.",
    images: ["/og-konak.jpg"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Omogućava statički render (mora se pozvati prije korišćenja prevoda).
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
          <MobileCtaBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
