import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SITE_URL } from "@/lib/seo/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Painel KMON VIP",
  robots: { index: false, follow: false },
  // Link preview (WhatsApp etc.) for a shared /crm URL: branded card instead of a bare favicon.
  openGraph: {
    title: "Painel KMON VIP",
    siteName: "KMON VIP",
    images: [{ url: `${SITE_URL}/og.jpg?title=Painel+KMON+VIP`, width: 1200, height: 630, alt: "Painel KMON VIP" }],
  },
};

export default function CrmRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-paper text-ink-900">
        {children}
      </body>
    </html>
  );
}
