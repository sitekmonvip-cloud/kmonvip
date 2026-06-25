import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider, QuoteModal } from "@/components/QuoteModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KMON VIP | Transporte Executivo, Blindado e Diplomático no Brasil",
  description:
    "Transporte executivo, blindado e diplomático para CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil. Segurança, discrição e padrão internacional.",
  keywords: [
    "transporte executivo",
    "transporte blindado",
    "transporte diplomático",
    "transporte executivo Brasília",
    "transporte VIP Brasil",
    "motorista executivo",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <QuoteModalProvider>
          {children}
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
