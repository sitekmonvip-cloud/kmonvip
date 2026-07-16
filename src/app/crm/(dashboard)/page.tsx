"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/crm/StatCard";
import InteractionsChart from "@/components/crm/InteractionsChart";
import InteractionsTable from "@/components/crm/InteractionsTable";
import type { TrackingEventRow } from "@/lib/crm/types";

type Cards = {
  whatsappClicksToday: number;
  whatsappClicks7d: number;
  leadsTotal: number;
  leadsNovos: number;
  topSource: string;
};

export default function CrmDashboardPage() {
  const [days, setDays] = useState<7 | 30>(7);
  const [cards, setCards] = useState<Cards | null>(null);
  const [chart, setChart] = useState<{ day: string; count: number }[]>([]);
  const [recent, setRecent] = useState<TrackingEventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`/api/crm/stats?days=${days}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) {
          setCards(json.cards);
          setChart(json.chart);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [days]);

  useEffect(() => {
    fetch("/api/crm/interactions?limit=10")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) setRecent(json.rows);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium text-ink-900">Visão geral</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="WhatsApp hoje" value={loading ? "—" : cards?.whatsappClicksToday ?? 0} />
        <StatCard label="WhatsApp 7 dias" value={loading ? "—" : cards?.whatsappClicks7d ?? 0} />
        <StatCard label="Leads cadastrados" value={loading ? "—" : cards?.leadsTotal ?? 0} />
        <StatCard label="Leads novos" value={loading ? "—" : cards?.leadsNovos ?? 0} />
        <StatCard label="Principal origem" value={loading ? "—" : cards?.topSource ?? "Direto"} />
      </div>

      <div className="rounded-xl border border-ink-100 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-ink-700">Interações por dia</h2>
          <div className="flex gap-1">
            {[7, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d as 7 | 30)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  days === d ? "bg-ink-900 text-paper" : "text-ink-500 hover:bg-ink-50"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <InteractionsChart data={chart} />
      </div>

      <div>
        <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-ink-700 mb-4">Interações recentes</h2>
        <InteractionsTable rows={recent} />
      </div>
    </div>
  );
}
