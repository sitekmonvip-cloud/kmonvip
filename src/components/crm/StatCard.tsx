export default function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500 mb-2">{label}</p>
      <p className="text-2xl font-medium text-ink-900">{value}</p>
    </div>
  );
}
