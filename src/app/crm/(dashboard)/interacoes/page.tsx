"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InteractionsTable from "@/components/crm/InteractionsTable";
import type { TrackingEventRow } from "@/lib/crm/types";

const PAGE_SIZE = 25;

export default function CrmInteractionsPage() {
  const [rows, setRows] = useState<TrackingEventRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`/api/crm/interactions?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) {
          setRows(json.rows);
          setTotal(json.total);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-ink-900">Interações</h1>

      {loading ? (
        <p className="text-sm text-ink-500 py-8 text-center">Carregando...</p>
      ) : (
        <InteractionsTable rows={rows} />
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
