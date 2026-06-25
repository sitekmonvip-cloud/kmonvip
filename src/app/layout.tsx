import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider, QuoteModal } from "@/components/QuoteModal";
import JsonLd from "@/components/seo/JsonLd";
import { homeSchemas } from "@/components/seo/schemas";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Transporte Executivo, Blindado e Diplomático no Brasil`,
  },
  description:
    "Transporte executivo, blindado e diplomático para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil. Segurança, discrição e padrão internacional.",
  keywords: [
    "transporte executivo",
    "transporte blindado",
    "transporte diplomático",
    "transporte executivo Brasília",
    "transporte executivo São Paulo",
    "transporte executivo Rio de Janeiro",
    "transporte VIP Brasil",
    "motorista executivo",
    "frota executiva",
    "transporte para embaixadas",
    "transporte para eventos",
    "transporte para autoridades",
    "transfer executivo",
    "van executiva",
    "ônibus premium",
  ],
  authors: [{ name: "KMON VIP" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Transporte Executivo, Blindado e Diplomático no Brasil`,
    description:
      "Mobilidade executiva de alto padrão para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Transporte Executivo Blindado e Diplomático`,
    description: "Mobilidade executiva de alto padrão no Brasil.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  // verification: { google: "ADD_GSC_CODE" }, // TODO: add when GSC registered
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {/* Global JSON-LD (Organization + WebSite + HQ LocalBusiness) */}
        <JsonLd data={homeSchemas()} />

        <QuoteModalProvider>
          {children}
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
