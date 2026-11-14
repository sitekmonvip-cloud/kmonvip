"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import PhoneCell from "@/components/crm/PhoneCell";
import type { TrackingEventRow } from "@/lib/crm/types";

type Metadata = TrackingEventRow["metadata"];

/**
 * Contact column for a WhatsApp click. Shows the phone once known (captured by the webhook or
 * typed by the sales team) and lets the team type it in, using the protocol code as the key.
 */
export default function ClickContact({ eventId, initial }: { eventId: number; initial: Metadata }) {
  const [meta, setMeta] = useState<Metadata>(initial);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(next: string) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/crm/interactions/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: next }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setError(res.status === 422 ? "Telefone inválido" : "Não foi possível salvar");
        return;
      }
      setMeta(json.metadata);
      setEditing(false);
    } catch {
      setError("Não foi possível salvar");
    } finally {
      setSaving(false);
    }
  }

  function startEditing() {
    setValue(meta?.phone ?? "");
    setError(null);
    setEditing(true);
  }

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save(value);
        }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="(21) 98445-6657"
            inputMode="tel"
            aria-label="Telefone do cliente"
            className="w-40 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-900 outline-none focus:border-ink-900"
          />
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-xs text-ink-500 underline hover:text-ink-900"
          >
            Cancelar
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {meta?.phone && <p className="text-xs text-ink-500">Deixe vazio para remover o telefone.</p>}
      </form>
    );
  }

  if (meta?.phone) {
    const name = meta.contact_name ?? meta.name ?? null;
    return (
      <div>
        {name && <div className="text-xs text-ink-500">{name}</div>}
        <div className="flex items-center gap-1">
          <PhoneCell phone={meta.phone} />
          <button
            type="button"
            onClick={startEditing}
            title="Corrigir telefone"
            aria-label="Corrigir telefone"
            className="rounded-full p-1.5 text-ink-500 hover:bg-ink-100 transition-colors"
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>
    );
  }

  if (!meta?.ref) {
    // Clicks logged before the protocol code existed can't be matched to a message.
    return <span className="text-xs text-ink-300">Sem identificação</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-ink-500">
        Aguardando mensagem · Protocolo <span className="font-mono text-ink-700">{meta.ref}</span>
      </span>
      <button
        type="button"
        onClick={startEditing}
        className="text-xs font-medium text-ink-700 underline hover:text-ink-900 whitespace-nowrap"
      >
        Informar telefone
      </button>
    </div>
  );
}
