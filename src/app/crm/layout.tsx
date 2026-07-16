import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Painel KMON VIP",
  robots: { index: false, follow: false },
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
