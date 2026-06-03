export default function Marquee() {
  return (
    <div className="py-4 bg-ink-50 border-y border-ink-100">
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-500">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p className="text-sm text-ink-500">
          Discrição. Precisão. Proteção. Cada detalhe gerenciado com os mais altos padrões.
        </p>
      </div>
    </div>
  );
}
