"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Download, LayoutGrid, List } from "lucide-react";
import { inputCls, PrimaryButton } from "@/components/crm/FormField";
import LeadBoard from "@/components/crm/LeadBoard";
import LeadModal from "@/components/crm/LeadModal";
import PhoneCell from "@/components/crm/PhoneCell";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadRow, type LeadStatus } from "@/lib/crm/types";

// The board needs every lead at once, so ask for far more than the API's default page of 25.
const LEADS_LIMIT = 500;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function CrmLeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLead, setModalLead] = useState<LeadRow | null | "new">(null);
  const [view, setView] = useState<"board" | "list">("board");
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LEADS_LIMIT) });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    fetch(`/api/crm/leads?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) setRows(json.rows);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, status, from, to]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, 250);
    return () => clearTimeout(timeout);
  }, [fetchLeads]);

  const exportHref = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const qs = params.toString();
    return `/api/crm/leads/export${qs ? `?${qs}` : ""}`;
  }, [search, status, from, to]);

  async function handleStatusChange(id: number, newStatus: LeadStatus) {
    // The database returns BIGSERIAL ids as strings, while a dropped card hands us a number.
    const sameLead = (r: LeadRow) => String(r.id) === String(id);
    const previous = rows.find(sameLead)?.status;
    if (!previous || previous === newStatus) return;

    setActionError(null);
    setRows((prev) => prev.map((r) => (sameLead(r) ? { ...r, status: newStatus } : r)));
    try {
      const res = await fetch(`/api/crm/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      // Put the lead back where it was so the screen never shows a status the server doesn't have.
      setRows((prev) => prev.map((r) => (sameLead(r) ? { ...r, status: previous } : r)));
      setActionError("Não foi possível mover o lead. Tente novamente.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-medium text-ink-900">Leads</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex rounded-full border border-ink-200 bg-white p-1" role="group" aria-label="Modo de exibição">
            {([
              ["board", "Quadro", LayoutGrid],
              ["list", "Lista", List],
            ] as const).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                aria-pressed={view === value}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  view === value ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
          <a
            href={exportHref}
            className="px-6 py-3 rounded-full border border-ink-200 text-sm font-medium text-ink-700 hover:bg-white transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Exportar CSV
          </a>
          <PrimaryButton type="button" onClick={() => setModalLead("new")} className="flex items-center gap-2">
            <Plus size={16} /> Novo lead
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Buscar por nome, telefone ou empresa"
          className={`${inputCls()} max-w-xs`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={`${inputCls()} max-w-[180px]`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os status</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <input type="date" className={`${inputCls()} max-w-[160px]`} value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" className={`${inputCls()} max-w-[160px]`} value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      {actionError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {actionError}
        </p>
      )}

      {view === "board" ? (
        loading && rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-500">Carregando...</p>
        ) : (
          <LeadBoard leads={rows} onStatusChange={handleStatusChange} onEdit={setModalLead} />
        )
      ) : (
      <div className="overflow-x-auto rounded-xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left">
              <th className="px-4 py-3 font-medium text-ink-700">Nome</th>
              <th className="px-4 py-3 font-medium text-ink-700">Empresa</th>
              <th className="px-4 py-3 font-medium text-ink-700">Telefone</th>
              <th className="px-4 py-3 font-medium text-ink-700">Serviço</th>
              <th className="px-4 py-3 font-medium text-ink-700">Cidade</th>
              <th className="px-4 py-3 font-medium text-ink-700">Origem</th>
              <th className="px-4 py-3 font-medium text-ink-700">Status</th>
              <th className="px-4 py-3 font-medium text-ink-700">Entrada</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-ink-500">
                  Carregando...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-ink-500">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
            {rows.map((lead) => (
              <tr key={lead.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                <td className="px-4 py-3 font-medium text-ink-900 whitespace-nowrap">{lead.name}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.company_name ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <PhoneCell phone={lead.phone} />
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.service_interest ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.service_city ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.source ?? "Direto"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    className="rounded-full border border-ink-200 bg-white px-2 py-1 text-xs"
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {LEAD_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => setModalLead(lead)}
                    className="text-xs font-medium text-ink-700 hover:text-ink-900 underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {modalLead && (
        <LeadModal
          lead={modalLead === "new" ? null : modalLead}
          onClose={() => setModalLead(null)}
          onSaved={() => {
            setModalLead(null);
            fetchLeads();
          }}
        />
      )}
    </div>
  );
}
