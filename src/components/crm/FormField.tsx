// Shared input styling, extracted from QuoteModal's inputCls()/Field pattern so the
// /crm panel matches the public site's form look without re-deriving the tokens.
export function inputCls(hasError?: boolean) {
  return `w-full px-4 py-3 rounded-lg border bg-white text-base text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 ${
    hasError ? "border-red-500" : "border-ink-200"
  }`;
}

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.08em] text-ink-700 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-7 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${className}`}
      style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-6 py-3 rounded-full border border-ink-200 text-sm font-medium text-ink-700 hover:bg-white transition-colors disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
}
