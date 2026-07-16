"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function InteractionsChart({ data }: { data: { day: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--c-ink-100)" vertical={false} />
        <XAxis
          dataKey="day"
          tickFormatter={(v: string) => v.slice(5)}
          tick={{ fontSize: 12, fill: "var(--c-ink-500)" }}
          axisLine={{ stroke: "var(--c-ink-200)" }}
          tickLine={false}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "var(--c-ink-500)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid var(--c-ink-200)", fontSize: 13 }}
          labelStyle={{ color: "var(--c-ink-900)" }}
        />
        <Bar dataKey="count" fill="var(--brand-champagne)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
