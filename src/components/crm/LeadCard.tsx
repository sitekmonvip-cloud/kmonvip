"use client";

import { useState } from "react";
import { ChevronDown, Mail, Pencil } from "lucide-react";
import PhoneCell from "@/components/crm/PhoneCell";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadRow, type LeadStatus } from "@/lib/crm/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink-900 break-words">{children}</dd>
    </div>
  );
}

export default function LeadCard({
  lead,
  onEdit,
  onStatusChange,
  onDragStart,
  onDragEnd,
}: {
  lead: LeadRow;
  onEdit: (lead: LeadRow) => void;
  onStatusChange: (id: number, status: LeadStatus) => void;
  onDragStart?: (id: number) => void;
  onDragEnd?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isMeta = lead.source === "meta";
  const extra = lead.extra;
  const answers = Object.entries(extra?.respostas ?? {});
  const represents = answers.find(([question]) => /representa/i.test(question))?.[1];
  const origin = isMeta
    ? ["Meta", lead.medium].filter(Boolean).join(" · ")
    : [lead.source ?? "Direto", lead.medium, lead.campaign].filter(Boolean).join(" · ");

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", String(lead.id));
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(lead.id);
      }}
      onDragEnd={() => onDragEnd?.()}
      className="rounded-xl border border-ink-100 bg-white p-3.5 shadow-sm cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-ink-900 break-words min-w-0">
          {lead.name}
          {isMeta && (
            <span className="ml-2 inline-block rounded-full bg-blue-50 px-2 py-0.5 align-middle text-[11px] font-medium text-blue-700">
              Meta
            </span>
          )}
        </h3>
        <span className="shrink-0 text-xs text-ink-500">{formatDate(lead.created_at)}</span>
      </div>
      {lead.company_name && <p className="mt-0.5 text-xs text-ink-500 break-words">{lead.company_name}</p>}

      <div className="mt-2">
        <PhoneCell phone={lead.phone} />
      </div>

      {(lead.service_interest || lead.service_city || extra?.pais) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {isMeta && extra?.pais && (
            <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700">{extra.pais}</span>
          )}
          {isMeta && represents && (
            <span className="max-w-full rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-700 break-words">
              {Array.isArray(represents) ? represents.join(", ") : represents}
            </span>
          )}
          {!isMeta && lead.service_interest && (
            <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-700">{lead.service_interest}</span>
          )}
          {lead.service_city && (
            <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-500 capitalize">
              {lead.service_city.toLowerCase()}
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-ink-700 hover:text-ink-900"
      >
        {open ? "Ver menos" : "Ver mais"}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-t border-ink-100 pt-3">
          <dl className="space-y-3">
            <Detail label="E-mail">
              {lead.email ? (
                <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 underline [overflow-wrap:anywhere] hover:text-ink-700">
                  <Mail size={14} /> {lead.email}
                </a>
              ) : (
                "—"
              )}
            </Detail>
            <Detail label="Origem">{origin}</Detail>
            {isMeta ? (
              <>
                {lead.campaign && <Detail label="Campanha">{lead.campaign}</Detail>}
                {lead.utm_term && <Detail label="Conjunto de anúncios">{lead.utm_term}</Detail>}
                {lead.utm_content && <Detail label="Anúncio">{lead.utm_content}</Detail>}
                {lead.conversion_page && <Detail label="Formulário">{lead.conversion_page}</Detail>}
                {extra?.pais && <Detail label="País">{extra.pais}</Detail>}
                {extra?.cargo && <Detail label="Cargo">{extra.cargo}</Detail>}
              </>
            ) : (
              lead.conversion_page && <Detail label="Página de conversão">{lead.conversion_page}</Detail>
            )}
            {answers.length > 0 && (
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
                  Respostas do formulário
                </dt>
                <dd className="mt-1 space-y-2 rounded-lg bg-ink-50 p-3">
                  {answers.map(([question, answer]) => (
                    <div key={question}>
                      <p className="text-xs text-ink-500">{question}</p>
                      <p className="text-sm text-ink-900 break-words">
                        {Array.isArray(answer) ? answer.join(" · ") : answer}
                      </p>
                    </div>
                  ))}
                </dd>
              </div>
            )}
            <Detail label="Observação">
              {lead.notes ? <span className="whitespace-pre-wrap">{lead.notes}</span> : "—"}
            </Detail>
            <Detail label="Entrada">{formatDateTime(lead.created_at)}</Detail>
          </dl>

          <label className="block">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Status</span>
            <select
              className="mt-1 w-full rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-sm"
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-xs font-medium text-ink-700 hover:bg-ink-50 transition-colors"
          >
            <Pencil size={14} /> Editar lead
          </button>
        </div>
      )}
    </article>
  );
}
