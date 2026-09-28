import type { TrackingEventRow } from "@/lib/crm/types";

const EVENT_LABELS: Record<string, string> = {
  whatsapp_click: "Clique no WhatsApp",
  form_submission: "Envio de formulário",
  phone_click: "Clique em telefone",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function InteractionsTable({ rows }: { rows: TrackingEventRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-ink-500 py-8 text-center">Nenhuma interação registrada ainda.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 bg-ink-50 text-left">
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Data/Hora</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Tipo</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Página</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Botão</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Serviço</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Origem</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Campanha</th>
            <th className="px-4 py-3 font-medium text-ink-700 whitespace-nowrap">Dispositivo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
              <td className="px-4 py-3 whitespace-nowrap text-ink-700">{formatDate(row.created_at)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-900">{EVENT_LABELS[row.event_type] ?? row.event_type}</td>
              <td className="px-4 py-3 max-w-[200px] truncate text-ink-500">{row.page_url ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-500">{row.button_id ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-500">{row.service ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-500">{row.utm_source ?? row.referrer ?? "Direto"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-500">{row.utm_campaign ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-ink-500 capitalize">{row.device_type ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
