// Root layout — minimal. Locale-aware <html>/<body> lives in [locale]/layout.tsx.
// This layout cannot return <html><body> because next-intl needs to inject lang per locale.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
