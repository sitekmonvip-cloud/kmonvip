"use client";

import { useCallback, useEffect, useState } from "react";
import { inputCls } from "@/components/crm/FormField";
import type { SupplierRow } from "@/lib/crm/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function CrmSuppliersPage() {
  const [rows, setRows] = useState<SupplierRow[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    fetch(`/api/crm/suppliers?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) {
          setRows(json.rows);
          setTotal(json.total);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(fetchSuppliers, 250);
    return () => clearTimeout(timeout);
  }, [fetchSuppliers]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-ink-900">Fornecedores</h1>
        <p className="mt-1 text-sm text-ink-500">
          Contatos que o SDR do WhatsApp identificou como fornecedores. Ficam fora do funil de leads.
          {total > 0 && ` ${total} no total.`}
        </p>
      </div>

      <input
        placeholder="Buscar por nome, telefone, empresa ou o que oferece"
        className={`${inputCls()} max-w-sm`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left">
              <th className="px-4 py-3 font-medium text-ink-700">Nome</th>
              <th className="px-4 py-3 font-medium text-ink-700">Empresa</th>
              <th className="px-4 py-3 font-medium text-ink-700">Telefone</th>
              <th className="px-4 py-3 font-medium text-ink-700">E-mail</th>
              <th className="px-4 py-3 font-medium text-ink-700">O que oferece</th>
              <th className="px-4 py-3 font-medium text-ink-700">Último contato</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-500">
                  Carregando...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-500">
                  Nenhum fornecedor encontrado.
                </td>
              </tr>
            )}
            {rows.map((supplier) => (
              <tr key={supplier.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 align-top">
                <td className="px-4 py-3 font-medium text-ink-900 whitespace-nowrap">{supplier.name}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{supplier.company_name ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a
                    href={`https://wa.me/${supplier.phone_normalized}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-700 underline hover:text-ink-900"
                  >
                    +{supplier.phone_normalized}
                  </a>
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{supplier.email ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 min-w-[16rem]" title={supplier.notes ?? undefined}>
                  {supplier.offering ?? "—"}
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{formatDate(supplier.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
