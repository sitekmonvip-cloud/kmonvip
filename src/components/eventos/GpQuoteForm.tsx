"use client";

import { useState } from "react";
import { getAttribution } from "@/lib/tracking/attribution";
import { gtmEvent } from "@/lib/tracking/gtm";
import WhatsAppCTA from "@/components/page/WhatsAppCTA";

const DAYS = ["Sexta, 6/11", "Sábado, 7/11", "Domingo, 8/11"];
const VEHICLES = ["Sedan blindado", "SUV blindado", "Indiquem o melhor para mim"];
const PASSENGERS = ["1", "2", "3", "4", "5 ou mais (mais de um veículo)"];

type Fields = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  days: string[];
  vehicle: string;
  passengers: string;
  pickup: string;
  notes: string;
};

const EMPTY: Fields = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  days: [],
  vehicle: VEHICLES[0],
  passengers: "1",
  pickup: "",
  notes: "",
};

const WA_MESSAGE =
  "Olá! Vim pelo site da KMON VIP e quero cotar transporte blindado com motorista para o GP de São Paulo (6 a 8 de novembro).";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function buildMessage(f: Fields): [string, string] {
  const rows: [string, string][] = [
    ["Evento", "GP de São Paulo 2026 (Interlagos)"],
    ["Nome", f.fullName],
    ["Telefone / WhatsApp", f.phone],
    ["E-mail", f.email],
    ["Empresa", f.company || "—"],
    ["Dias", f.days.join(", ")],
    ["Veículo", f.vehicle],
    ["Passageiros", f.passengers],
    ["Embarque", f.pickup],
    ["Observações", f.notes || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1c1b19">
<h2 style="font-size:18px;margin:0 0 16px">Cotação — GP de São Paulo 2026 (transporte blindado)</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#6b6b66;vertical-align:top">${escapeHtml(k)}</td><td><strong>${escapeHtml(v).replace(/\n/g, "<br>")}</strong></td></tr>`)
    .join("")}</table>
<p style="color:#b0aea5;font-size:12px;margin-top:20px">Lead recebido pela página /eventos/gp-sao-paulo</p></div>`;
  return [html, text];
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-[#F3F1EC] placeholder:text-[#7d786f] outline-none transition-colors focus:border-[#BFB08A] focus:bg-white/[0.06]";
const labelCls = "block text-[11px] font-medium uppercase tracking-[0.14em] text-[#A7A29A] mb-2";

export default function GpQuoteForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const toggleDay = (d: string) =>
    set("days", f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d]);

  function validate(): boolean {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (f.fullName.trim().length < 2) e.fullName = "Informe seu nome.";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um telefone com DDD.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Informe um e-mail válido.";
    if (f.days.length === 0) e.days = "Escolha pelo menos um dia.";
    if (f.pickup.trim().length < 3) e.pickup = "Informe o hotel, endereço ou aeroporto.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    const [html, text] = buildMessage(f);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          text,
          fullName: f.fullName.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          countryCode: "55",
          company: f.company.trim() || undefined,
          purpose: "GP São Paulo 2026",
          serviceType: "Transporte Blindado",
          city: "São Paulo",
          vehicleProtection: "Blindado",
          ...getAttribution(),
          landingPage: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      gtmEvent("quote_submitted", {
        purpose: "gp-sao-paulo-2026",
        service_type: "transporte-blindado",
        city: "São Paulo",
        vehicle: f.vehicle,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#141416] p-8 md:p-10">
        <span className="mb-4 block h-px w-12 bg-[#BFB08A]" />
        <h3 className="text-2xl font-medium tracking-tight text-[#F3F1EC]">Pedido recebido</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#A7A29A]">
          Nossa equipe vai retornar com a proposta pelo WhatsApp ou e-mail informados. Se preferir adiantar, fale agora com um consultor.
        </p>
        <WhatsAppCTA
          message={WA_MESSAGE}
          buttonId="gp-sp-form-success-whatsapp"
          buttonLocation="gp-sp-form-success"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#BFB08A] px-6 py-3 text-sm font-medium text-[#0B0B0C] transition-transform hover:-translate-y-0.5"
        >
          Falar no WhatsApp
        </WhatsAppCTA>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-white/10 bg-[#141416] p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="gp-name" className={labelCls}>Nome completo</label>
          <input id="gp-name" className={inputCls} value={f.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" />
          {errors.fullName && <p className="mt-1.5 text-xs text-[#E0786B]">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="gp-phone" className={labelCls}>WhatsApp</label>
          <input id="gp-phone" type="tel" inputMode="tel" className={inputCls} placeholder="(11) 90000-0000" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className="mt-1.5 text-xs text-[#E0786B]">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="gp-email" className={labelCls}>E-mail</label>
          <input id="gp-email" type="email" className={inputCls} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1.5 text-xs text-[#E0786B]">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="gp-company" className={labelCls}>Empresa <span className="normal-case tracking-normal text-[#7d786f]">(opcional)</span></label>
          <input id="gp-company" className={inputCls} value={f.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>Dias do evento</legend>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => {
              const on = f.days.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleDay(d)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    on ? "border-[#BFB08A] bg-[#BFB08A] text-[#0B0B0C]" : "border-white/15 text-[#D9D5CD] hover:border-white/30"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {errors.days && <p className="mt-1.5 text-xs text-[#E0786B]">{errors.days}</p>}
        </fieldset>

        <div>
          <label htmlFor="gp-vehicle" className={labelCls}>Veículo blindado</label>
          <select id="gp-vehicle" className={inputCls} value={f.vehicle} onChange={(e) => set("vehicle", e.target.value)}>
            {VEHICLES.map((v) => <option key={v} value={v} className="bg-[#141416]">{v}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="gp-pax" className={labelCls}>Passageiros</label>
          <select id="gp-pax" className={inputCls} value={f.passengers} onChange={(e) => set("passengers", e.target.value)}>
            {PASSENGERS.map((p) => <option key={p} value={p} className="bg-[#141416]">{p}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="gp-pickup" className={labelCls}>Embarque</label>
          <input id="gp-pickup" className={inputCls} placeholder="Hotel, endereço ou aeroporto" value={f.pickup} onChange={(e) => set("pickup", e.target.value)} />
          {errors.pickup && <p className="mt-1.5 text-xs text-[#E0786B]">{errors.pickup}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="gp-notes" className={labelCls}>Observações <span className="normal-case tracking-normal text-[#7d786f]">(opcional)</span></label>
          <textarea id="gp-notes" rows={3} className={inputCls} placeholder="Horários, setor do ingresso, idioma do passageiro, escolta…" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-5 rounded-lg border border-[#E0786B]/30 bg-[#E0786B]/10 px-4 py-3 text-sm text-[#F0B4AA]">
          Não conseguimos enviar agora. Tente de novo ou fale direto pelo WhatsApp.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BFB08A] px-7 py-3.5 text-sm font-medium text-[#0B0B0C] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Enviando…" : "Solicitar cotação"}
        </button>
        <WhatsAppCTA
          message={WA_MESSAGE}
          buttonId="gp-sp-form-whatsapp"
          buttonLocation="gp-sp-form"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm text-[#F3F1EC] transition-colors hover:border-white/40"
        >
          Prefiro o WhatsApp
        </WhatsAppCTA>
      </div>
      <p className="mt-4 text-xs text-[#7d786f]">Seus dados são usados só para responder a esta cotação.</p>
    </form>
  );
}
