"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/crm/types";
import type { CountRow, MetaStats } from "@/lib/crm/metaStatsService";

const PERIODS = [7, 30, 90] as const;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500">{label}</p>
      <p className="mt-2 text-3xl font-medium text-ink-900">{value}</p>
    </div>
  );
}

function BarList({ title, rows, format }: { title: string; rows: CountRow[]; format?: (label: string) => string }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section className="rounded-xl border border-ink-100 bg-white p-5">
      <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">Sem dados no período.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 break-words text-ink-900">{format ? format(row.label) : row.label}</span>
                <span className="shrink-0 font-medium text-ink-900 tabular-nums">{row.count}</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-ink-50">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(row.count / max) * 100}%`, background: "var(--brand-champagne)" }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DailyBars({ daily }: { daily: MetaStats["daily"] }) {
  const max = Math.max(1, ...daily.map((d) => d.count));
  return (
    <section className="rounded-xl border border-ink-100 bg-white p-5">
      <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-ink-500">Leads por dia</h2>
      {daily.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">Sem dados no período.</p>
      ) : (
        <div className="mt-4 flex h-40 items-end gap-1.5 overflow-x-auto">
          {daily.map((d) => (
            <div key={d.day} className="flex h-full min-w-[22px] flex-1 flex-col items-center justify-end gap-1">
              <span className="text-[11px] text-ink-500 tabular-nums">{d.count}</span>
              <div
                className="w-full rounded-t"
                style={{ height: `${(d.count / max) * 100}%`, minHeight: 4, background: "var(--brand-champagne)" }}
                title={`${d.day}: ${d.count}`}
              />
              <span className="text-[10px] text-ink-500">{d.day.slice(8)}/{d.day.slice(5, 7)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CrmMetaPage() {
  const [days, setDays] = useState<(typeof PERIODS)[number]>(30);
  const [stats, setStats] = useState<MetaStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/crm/meta/stats?days=${days}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json?.ok) {
          setStats(json.stats);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium text-ink-900">Meta · Leads de anúncios</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full border border-ink-200 bg-white p-1" role="group" aria-label="Período">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={days === p}
                onClick={() => setDays(p)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  days === p ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                {p} dias
              </button>
            ))}
          </div>
          <Link
            href="/crm/leads?origin=meta"
            className="rounded-full border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 hover:bg-white transition-colors"
          >
            Ver leads do Meta
          </Link>
        </div>
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">Não foi possível carregar os dados.</p>}

      {!stats ? (
        !error && <p className="py-8 text-center text-sm text-ink-500">Carregando...</p>
      ) : stats.totals.total === 0 ? (
        <p className="rounded-xl border border-dashed border-ink-200 bg-white px-6 py-12 text-center text-sm text-ink-500">
          Nenhum lead do Meta nos últimos {stats.days} dias.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label={`Leads em ${stats.days} dias`} value={stats.totals.total} />
            <StatCard label="Leads hoje" value={stats.totals.today} />
            <StatCard label="Campanhas" value={stats.totals.campaigns} />
            <StatCard label="Países" value={stats.totals.countries} />
          </div>

          <DailyBars daily={stats.daily} />

          <div className="grid gap-4 lg:grid-cols-2">
            <BarList title="Por campanha" rows={stats.byCampaign} />
            <BarList title="Por conjunto de anúncios" rows={stats.byAdset} />
            <BarList title="Por anúncio" rows={stats.byAd} />
            <BarList title="Por formulário" rows={stats.byForm} />
            <BarList title="Por país" rows={stats.byCountry} />
            <BarList
              title="Por status do atendimento"
              rows={stats.byStatus}
              format={(label) => LEAD_STATUS_LABELS[label as LeadStatus] ?? label}
            />
          </div>
        </>
      )}
    </div>
  );
}
