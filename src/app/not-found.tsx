import Link from "next/link";

// The root layout renders no <html>, so this fallback (paths outside [locale]) must.
export default function RootNotFound() {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "48px 20px", maxWidth: 640, margin: "0 auto" }}>
        <title>Página não encontrada | KMON VIP</title>
        <meta name="robots" content="noindex" />
        <h1>Página não encontrada</h1>
        <p>
          <Link href="/">Voltar para a KMON VIP</Link>
        </p>
      </body>
    </html>
  );
}
