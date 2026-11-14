"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { formatPhone, whatsappLink } from "@/lib/crm/phone";

export default function PhoneCell({ phone }: { phone: string | null }) {
  const [copied, setCopied] = useState(false);

  if (!phone) return <span className="text-ink-500">—</span>;

  const link = whatsappLink(phone);

  async function copy() {
    try {
      await navigator.clipboard.writeText(formatPhone(phone!));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — ignore */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-ink-900 tabular-nums">{formatPhone(phone)}</span>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir conversa no WhatsApp"
          aria-label="Abrir conversa no WhatsApp"
          className="rounded-full p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <MessageCircle size={16} />
        </a>
      )}
      <button
        type="button"
        onClick={copy}
        title="Copiar telefone"
        aria-label="Copiar telefone"
        className="rounded-full p-1.5 text-ink-500 hover:bg-ink-100 transition-colors"
      >
        {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
      </button>
    </div>
  );
}
