"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InteractionsList from "@/components/crm/InteractionsList";
import { inputCls } from "@/components/crm/FormField";
import type { TrackingEventRow } from "@/lib/crm/types";

const PAGE_SIZE = 25;

const FILTERS = [
  { value: "all", label: "Todas" },
  { value: "whatsapp_click", label: "WhatsApp" },
  { value: "form_submission", label: "Formulário" },
  { value: "pending", label: "Aguardando telefone" },
] as const;
type Filter = (typeof FILTERS)[number]["value"];

export default function CrmInteractionsPage() {
  const [rows, setRows] = useState<TrackingEventRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (search.trim()) params.set("search", search.trim());
      if (filter === "pending") params.set("pending", "1");
      else if (filter !== "all") params.set("type", filter);

      fetch(`/api/crm/interactions?${params.toString()}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          if (json?.ok) {
            setRows(json.rows);
            setTotal(json.total);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timeout);
  }, [page, search, filter]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-medium text-ink-900">Interações</h1>
        <input
          placeholder="Buscar por protocolo ou telefone"
          className={`${inputCls()} max-w-xs`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar interações">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => {
              setFilter(value);
              setPage(0);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === value ? "bg-ink-900 text-white" : "border border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-ink-500 py-8 text-center">Carregando...</p>
      ) : (
        <InteractionsList rows={rows} />
      )}

      <div className="flex items-center justify-between text-sm text-ink-500">
        <span>
          Página {page + 1} de {totalPages} ({total} interações)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full border border-ink-200 disabled:opacity-40 hover:bg-ink-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
            disabled={page + 1 >= totalPages}
            className="p-2 rounded-full border border-ink-200 disabled:opacity-40 hover:bg-ink-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
