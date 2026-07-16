import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";

import { QuoteModalProvider, QuoteModal } from "@/components/QuoteModal";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/seo/JsonLd";
import { homeSchemas } from "@/components/seo/schemas";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, GTM_ID, CLARITY_ID, GSC_VERIFICATION } from "@/lib/seo/constants";
import { routing } from "@/i18n/routing";
import AttributionCapture from "@/components/AttributionCapture";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Transporte Executivo, Blindado e Diplomático no Brasil`,
  },
  description:
    "Transporte executivo, blindado e diplomático para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil. Segurança, discrição e padrão internacional.",
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Transporte Executivo, Blindado e Diplomático no Brasil`,
    description: "Mobilidade executiva de alto padrão para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Transporte Executivo Blindado e Diplomático`,
    description: "Mobilidade executiva de alto padrão no Brasil.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  verification: { google: GSC_VERIFICATION },
};

// HTML lang attribute per locale
const HTML_LANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  zh: "zh-CN",
  ja: "ja",
  fr: "fr",
  de: "de",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={HTML_LANG[locale] || locale} className={`${inter.variable} antialiased`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {/* Global JSON-LD */}
        <JsonLd data={homeSchemas()} />

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>

        <AttributionCapture />

        <NextIntlClientProvider>
          <QuoteModalProvider>
            {children}
            <QuoteModal />
          </QuoteModalProvider>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
