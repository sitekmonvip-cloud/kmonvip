import { GTM_ID, CLARITY_ID, GSC_VERIFICATION } from "@/lib/seo/constants";

const INTEGRATIONS = [
  { name: "Google Tag Manager", id: GTM_ID },
  { name: "Microsoft Clarity", id: CLARITY_ID },
  { name: "Google Search Console", id: GSC_VERIFICATION },
  { name: "Meta Pixel", id: null },
  { name: "Google Ads", id: null },
];

export default function CrmConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-ink-900">Configurações de rastreamento</h1>
      <p className="text-sm text-ink-500 max-w-2xl">
        Identificadores já usados no site. Esta versão é somente leitura — edição ao vivo fica
        para uma próxima etapa.
      </p>

      <div className="rounded-xl border border-ink-100 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left">
              <th className="px-4 py-3 font-medium text-ink-700">Integração</th>
              <th className="px-4 py-3 font-medium text-ink-700">Identificador</th>
              <th className="px-4 py-3 font-medium text-ink-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((item) => (
              <tr key={item.name} className="border-b border-ink-100 last:border-0">
                <td className="px-4 py-3 font-medium text-ink-900 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-3 text-ink-500 font-mono text-xs whitespace-nowrap">{item.id ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.id ? "bg-accent-green/20 text-ink-900" : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {item.id ? "Configurado" : "Não configurado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
