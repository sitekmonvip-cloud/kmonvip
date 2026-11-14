"use client";

import { useState } from "react";
import { ChevronDown, FileText, MessageCircle, Phone } from "lucide-react";
import ClickContact from "@/components/crm/ClickContact";
import PhoneCell from "@/components/crm/PhoneCell";
import type { TrackingEventRow } from "@/lib/crm/types";

const EVENT_META: Record<string, { label: string; Icon: typeof MessageCircle; tone: string }> = {
  whatsapp_click: { label: "Clique no WhatsApp", Icon: MessageCircle, tone: "bg-emerald-50 text-emerald-700" },
  form_submission: { label: "Envio de formulário", Icon: FileText, tone: "bg-sky-50 text-sky-700" },
  phone_click: { label: "Clique em telefone", Icon: Phone, tone: "bg-amber-50 text-amber-700" },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function dayKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (dayKey(iso) === dayKey(today.toISOString())) return "Hoje";
  if (dayKey(iso) === dayKey(yesterday.toISOString())) return "Ontem";
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function origin(row: TrackingEventRow) {
  return row.utm_source ?? row.referrer ?? "Direto";
}

function ContactCell({ row }: { row: TrackingEventRow }) {
  if (row.event_type === "whatsapp_click") {
    return <ClickContact eventId={row.id} initial={row.metadata} />;
  }

  // Form submissions carry the name and phone typed in the quote form.
  const meta = row.metadata;
  if (meta?.phone) {
    return (
      <div>
        {meta.name && <div className="text-xs text-ink-500">{meta.name}</div>}
        <PhoneCell phone={meta.phone} />
      </div>
    );
  }
  return <span className="text-ink-500">—</span>;
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink-900 break-words">{children}</dd>
    </div>
  );
}

function InteractionItem({ row }: { row: TrackingEventRow }) {
  const [open, setOpen] = useState(false);
  const meta = EVENT_META[row.event_type] ?? { label: row.event_type, Icon: MessageCircle, tone: "bg-ink-50 text-ink-700" };
  const { Icon } = meta;
  const device = row.device_type ? row.device_type.charAt(0).toUpperCase() + row.device_type.slice(1) : null;
  const context = [row.service, origin(row), device].filter(Boolean);

  return (
    <li className="rounded-xl border border-ink-100 bg-white">
      <div className="grid gap-3 p-4 md:grid-cols-[230px_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-center">
        <div className="flex items-center gap-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.tone}`}>
            <Icon size={16} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-900">{meta.label}</p>
            <p className="text-xs text-ink-500">{formatTime(row.created_at)}</p>
          </div>
        </div>

        <div className="min-w-0">
          <ContactCell row={row} />
        </div>

        <div className="min-w-0 text-xs text-ink-500">
          <p className="truncate" title={row.page_url ?? undefined}>
            {row.page_url ?? "—"}
          </p>
          {context.length > 0 && <p className="mt-0.5 truncate">{context.join(" · ")}</p>}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-1 justify-self-start text-xs font-medium text-ink-700 hover:text-ink-900 md:justify-self-end"
        >
          {open ? "Ver menos" : "Ver mais"}
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <dl className="grid gap-4 border-t border-ink-100 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <Detail label="Página">{row.page_url ?? "—"}</Detail>
          <Detail label="Título da página">{row.page_title ?? "—"}</Detail>
          <Detail label="Botão">{[row.button_id, row.button_location].filter(Boolean).join(" · ") || "—"}</Detail>
          <Detail label="Serviço">{row.service ?? "—"}</Detail>
          <Detail label="Origem">{[origin(row), row.utm_medium].filter(Boolean).join(" · ")}</Detail>
          <Detail label="Campanha">{row.utm_campaign ?? "—"}</Detail>
          <Detail label="Termo / conteúdo">{[row.utm_term, row.utm_content].filter(Boolean).join(" · ") || "—"}</Detail>
          <Detail label="Dispositivo">
            <span className="capitalize">{row.device_type ?? "—"}</span>
          </Detail>
          {row.metadata?.ref && (
            <Detail label="Protocolo">
              <span className="font-mono">{row.metadata.ref}</span>
            </Detail>
          )}
          {(row.gclid || row.fbclid) && <Detail label="Anúncio">{row.gclid ? "Google Ads" : "Meta Ads"}</Detail>}
          <Detail label="Data e hora">{new Date(row.created_at).toLocaleString("pt-BR")}</Detail>
        </dl>
      )}
    </li>
  );
}

export default function InteractionsList({ rows }: { rows: TrackingEventRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-ink-500 py-8 text-center">Nenhuma interação encontrada.</p>;
  }

  // The API returns newest first, so consecutive rows with the same day share a heading.
  const groups: { key: string; label: string; rows: TrackingEventRow[] }[] = [];
  for (const row of rows) {
    const key = dayKey(row.created_at);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.rows.push(row);
    else groups.push({ key, label: dayLabel(row.created_at), rows: [row] });
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.key} aria-label={group.label}>
          <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-ink-500 first-letter:uppercase">
            {group.label} · {group.rows.length}
          </h2>
          <ul className="space-y-2">
            {group.rows.map((row) => (
              <InteractionItem key={row.id} row={row} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
