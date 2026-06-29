"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuoteModal } from "./QuoteModalProvider";

// ── Config ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "5561998630303";
const NOTIFY_EMAIL    = "contaslopeshpl@gmail.com";

// ── Types ───────────────────────────────────────────────────────────
type Purpose = "empresa" | "trabalho" | "pessoa-fisica";

type FormData = {
  purpose: Purpose | "";
  serviceType: string;
  startDate: string;
  endDate: string;
  bilingualDriver: boolean;
  vehicleProtection: "blindado" | "convencional" | "";
  vehicleModel: string;
  additionalInfo: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
};

const initialData: FormData = {
  purpose: "",
  serviceType: "",
  startDate: "",
  endDate: "",
  bilingualDriver: false,
  vehicleProtection: "",
  vehicleModel: "",
  additionalInfo: "",
  fullName: "",
  email: "",
  phone: "",
  position: "",
  company: "",
};

const serviceTypes = [
  "Transporte Executivo Corporativo",
  "Transfer Aeroporto",
  "Eventos e Congressos",
  "Cerimônias e Festas",
  "Visita Diplomática",
  "Atendimento Continuado",
  "Outro",
];

const vehicleModels = [
  "Sedan",
  "SUV",
  "Van",
  "Minivan",
  "Micro-ônibus",
  "Ônibus",
];

// ── Component ───────────────────────────────────────────────────────
export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const [step, setStep]   = useState(1);
  const [data, setData]   = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      // Slight delay to avoid flicker during close transition
      const t = setTimeout(() => {
        setStep(1);
        setData(initialData);
        setErrors({});
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  // ── Validation per step ───────────────────────────────────────────
  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.purpose) e.purpose = "Selecione uma opção.";
      if (data.purpose === "trabalho") e.purpose = "Este canal é exclusivo para cotações comerciais.";
    } else if (s === 2) {
      if (!data.serviceType) e.serviceType = "Selecione o tipo de serviço.";
      if (!data.startDate)   e.startDate   = "Data de início é obrigatória.";
      if (!data.vehicleProtection) e.vehicleProtection = "Selecione um tipo de veículo.";
      if (!data.vehicleModel) e.vehicleModel = "Modelo do veículo é obrigatório.";
      if (!data.additionalInfo.trim()) e.additionalInfo = "Informações adicionais são obrigatórias.";
    } else if (s === 3) {
      if (!data.fullName.trim()) e.fullName = "Nome é obrigatório.";
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "E-mail válido é obrigatório.";
      if (!data.phone.trim()) e.phone = "Telefone é obrigatório.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  // ── Submit ────────────────────────────────────────────────────────
  const buildMessage = () => {
    const purposeLabel = {
      "empresa": "Empresa / Empresário",
      "trabalho": "Oportunidade de trabalho",
      "pessoa-fisica": "Pessoa Física",
    }[data.purpose as Purpose] || "—";

    return [
      `*Nova Cotação — KMON VIP*`,
      ``,
      `*Categoria:* ${purposeLabel}`,
      `*Serviço:* ${data.serviceType}`,
      `*Início:* ${data.startDate}`,
      data.endDate ? `*Término:* ${data.endDate}` : "",
      `*Motorista bilíngue:* ${data.bilingualDriver ? "Sim" : "Não"}`,
      `*Tipo de veículo:* ${data.vehicleProtection}`,
      `*Modelo:* ${data.vehicleModel}`,
      ``,
      `*Informações adicionais:*`,
      data.additionalInfo,
      ``,
      `*Dados de contato:*`,
      `Nome: ${data.fullName}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone}`,
      data.position ? `Cargo: ${data.position}` : "",
      data.company ? `Empresa: ${data.company}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;

    // ── Tracking placeholder ──
    // TODO: replace with real tracking/backend integration
    // For now: log + open WhatsApp + send via mailto fallback
    console.log("[KMON-LEAD]", {
      timestamp: new Date().toISOString(),
      notifyEmail: NOTIFY_EMAIL,
      data,
    });

    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Nova solicitação de cotação — KMON VIP");
    const body    = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className="fixed inset-0 z-[80] transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Solicitar cotação"
        className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
      >
        <div
          className="relative bg-white w-full max-w-xl pointer-events-auto rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100 shrink-0">
            <Image
              src="/images/logos/logo SVG KMON preta.svg"
              alt="KMON VIP"
              width={90}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <button
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 hover:bg-ink-100 transition-colors text-ink-700"
              aria-label="Fechar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* Progress + Step label */}
          {!submitted && (
            <div className="px-6 pt-5 shrink-0">
              <div className="flex gap-2 mb-3">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="flex-1 h-1 rounded-full transition-colors"
                    style={{
                      background:
                        s <= step ? "var(--brand-champagne)" : "var(--c-ink-100)",
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
                Passo {step} de 3
              </span>
            </div>
          )}

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {submitted ? (
              <SuccessScreen
                onWhatsApp={openWhatsApp}
                onEmail={sendEmail}
                onClose={close}
              />
            ) : step === 1 ? (
              <Step1 data={data} set={set} errors={errors} />
            ) : step === 2 ? (
              <Step2 data={data} set={set} errors={errors} />
            ) : (
              <Step3 data={data} set={set} errors={errors} />
            )}
          </div>

          {/* Footer buttons */}
          {!submitted && (
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-ink-100 bg-paper shrink-0">
              {step > 1 ? (
                <button
                  onClick={goBack}
                  className="px-6 py-3 rounded-full border border-ink-200 text-sm font-medium text-ink-700 hover:bg-white transition-colors"
                >
                  Voltar
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  onClick={goNext}
                  disabled={step === 1 && data.purpose === "trabalho"}
                  className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97]"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  Concluir
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Step 1: Purpose ────────────────────────────────────────────────
function Step1({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  const opts: { value: Purpose; title: string; sub: string }[] = [
    { value: "empresa",       title: "Empresa / Empresário",     sub: "Transporte Executivo Corporativo" },
    { value: "pessoa-fisica", title: "Pessoa Física",            sub: "Transfer ou Motorista Particular" },
    { value: "trabalho",      title: "Oportunidade de trabalho", sub: "Busca de Emprego / Candidato" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-6">Como podemos ajudar?</h2>
      <div className="flex flex-col gap-3">
        {opts.map((o) => {
          const isActive = data.purpose === o.value;
          return (
            <label
              key={o.value}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                isActive
                  ? "border-ink-900 bg-ink-50"
                  : "border-ink-200 hover:border-ink-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="purpose"
                value={o.value}
                checked={isActive}
                onChange={() => set("purpose", o.value)}
                className="sr-only"
              />
              <span
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? "border-ink-900" : "border-ink-300"
                }`}
              >
                {isActive && (
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-900" />
                )}
              </span>
              <span className="flex-1">
                <span className="block font-medium text-ink-900">{o.title}</span>
                <span className="block text-sm text-ink-500">{o.sub}</span>
              </span>
            </label>
          );
        })}
      </div>
      {errors.purpose && <p className="mt-3 text-sm text-red-600">{errors.purpose}</p>}

      {/* Block message when "Oportunidade de trabalho" selected */}
      {data.purpose === "trabalho" && (
        <div
          className="mt-6 rounded-xl border p-5"
          style={{
            background: "rgba(191,176,138,0.08)",
            borderColor: "rgba(191,176,138,0.35)",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-900 mb-2">
            Este canal é exclusivo para cotações comerciais
          </p>
          <p className="text-sm text-ink-700 leading-relaxed">
            No momento não estamos recebendo candidaturas por este formulário.
            Para oportunidades de trabalho, fique atento aos nossos canais oficiais.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Step 2: Details ────────────────────────────────────────────────
function Step2({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-medium tracking-tight mb-1">Detalhes do serviço</h2>
      <p className="text-sm text-ink-500 -mt-3">Conte um pouco sobre o atendimento desejado.</p>

      <Field label="Tipo de serviço *" error={errors.serviceType}>
        <select
          value={data.serviceType}
          onChange={(e) => set("serviceType", e.target.value)}
          className={inputCls(!!errors.serviceType)}
        >
          <option value="">Selecione</option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Data início *" error={errors.startDate}>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            className={inputCls(!!errors.startDate)}
          />
        </Field>
        <Field label="Data término">
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => set("endDate", e.target.value)}
            className={inputCls(false)}
          />
        </Field>
      </div>

      {/* Toggle Motorista Bilíngue */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <span
          className="relative inline-flex w-11 h-6 rounded-full transition-colors"
          style={{
            background: data.bilingualDriver ? "var(--brand-champagne)" : "var(--c-ink-200)",
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: data.bilingualDriver ? "translateX(20px)" : "translateX(0)" }}
          />
          <input
            type="checkbox"
            checked={data.bilingualDriver}
            onChange={(e) => set("bilingualDriver", e.target.checked)}
            className="sr-only"
          />
        </span>
        <span className="text-sm font-medium text-ink-900">Motorista Bilíngue</span>
      </label>

      <Field label="Veículo *" error={errors.vehicleProtection}>
        <div className="grid grid-cols-2 gap-3">
          {(["blindado", "convencional"] as const).map((v) => {
            const isActive = data.vehicleProtection === v;
            return (
              <label
                key={v}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  isActive ? "border-ink-900 bg-ink-50" : "border-ink-200 hover:border-ink-300"
                }`}
              >
                <input
                  type="radio"
                  name="vehicleProtection"
                  value={v}
                  checked={isActive}
                  onChange={() => set("vehicleProtection", v)}
                  className="sr-only"
                />
                <span
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? "border-ink-900" : "border-ink-300"
                  }`}
                >
                  {isActive && <span className="h-2 w-2 rounded-full bg-ink-900" />}
                </span>
                <span className="text-sm font-medium capitalize">{v}</span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field label="Modelo do veículo *" error={errors.vehicleModel}>
        <select
          value={data.vehicleModel}
          onChange={(e) => set("vehicleModel", e.target.value)}
          className={inputCls(!!errors.vehicleModel)}
        >
          <option value="">Selecione o modelo</option>
          {vehicleModels.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Field>

      <Field label="Informações adicionais *" error={errors.additionalInfo}>
        <textarea
          value={data.additionalInfo}
          onChange={(e) => set("additionalInfo", e.target.value)}
          rows={3}
          placeholder="Alguma informação específica para o seu atendimento?"
          className={inputCls(!!errors.additionalInfo)}
        />
      </Field>
    </div>
  );
}

// ─── Step 3: Contact ────────────────────────────────────────────────
function Step3({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium tracking-tight">Seus Dados</h2>
      <p className="text-sm text-ink-500 -mt-2">
        Preencha seus dados de contato e clique em <strong>CONCLUIR</strong>.
      </p>

      <Field label="Nome completo *" error={errors.fullName}>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="Seu nome completo"
          className={inputCls(!!errors.fullName)}
        />
      </Field>

      <Field label="E-mail corporativo *" error={errors.email}>
        <input
          type="email"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="seu@empresa.com.br"
          className={inputCls(!!errors.email)}
        />
      </Field>

      <Field label="Telefone *" error={errors.phone}>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 py-3 rounded-lg border border-ink-200 bg-ink-50 text-sm font-medium text-ink-700 shrink-0">
            🇧🇷 +55
          </span>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="(11) 91234-5678"
            className={inputCls(!!errors.phone)}
          />
        </div>
      </Field>

      <Field label="Cargo">
        <input
          type="text"
          value={data.position}
          onChange={(e) => set("position", e.target.value)}
          placeholder="Ex: Gerente de Segurança, Assistente Executivo..."
          className={inputCls(false)}
        />
      </Field>

      <Field label="Empresa">
        <input
          type="text"
          value={data.company}
          onChange={(e) => set("company", e.target.value)}
          placeholder="Nome da sua empresa"
          className={inputCls(false)}
        />
      </Field>
    </div>
  );
}

// ─── Success screen ─────────────────────────────────────────────────
function SuccessScreen({
  onWhatsApp, onEmail, onClose,
}: {
  onWhatsApp: () => void;
  onEmail: () => void;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-6">
      <div
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--brand-champagne)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-2xl font-medium tracking-tight mb-3">Solicitação registrada</h3>
      <p className="text-sm text-ink-500 leading-relaxed mb-8 max-w-sm mx-auto">
        Para concluir, escolha como prefere finalizar o contato:
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={onWhatsApp}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-sm text-white transition-transform active:scale-[0.97]"
          style={{ background: "#25D366" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
          Falar no WhatsApp
        </button>
        <button
          onClick={onEmail}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-ink-200 font-medium text-sm text-ink-900 hover:bg-ink-50 transition-colors"
        >
          Enviar por e-mail
        </button>
        <button
          onClick={onClose}
          className="text-xs text-ink-500 hover:text-ink-900 transition-colors mt-2"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

// ─── Shared field components ────────────────────────────────────────
function Field({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.08em] text-ink-700 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-lg border bg-white text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 ${
    hasError ? "border-red-500" : "border-ink-200"
  }`;
}
