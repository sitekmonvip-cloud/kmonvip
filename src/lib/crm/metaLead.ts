import type { LeadExtra } from "./types";

/** A Meta Lead Ads submission, normalised into what the CRM stores. */
export type MetaLeadInput = {
  externalId: string;
  createdAt: string; // ISO, in UTC
  name: string;
  companyName: string | null;
  phone: string | null;
  email: string | null;
  serviceInterest: string | null;
  serviceCity: string | null;
  source: "meta";
  medium: string | null;
  campaign: string | null;
  adName: string | null;
  adsetName: string | null;
  formName: string | null;
  extra: LeadExtra;
};

export type ParsedMetaLead =
  | { kind: "lead"; lead: MetaLeadInput }
  | { kind: "ignored"; reason: string }
  | { kind: "invalid"; reason: string };

// Top-level keys the payload uses for lead data. Anything else is treated as a form answer, so a
// flat payload (one key per question) works as well as one that nests answers under "respostas".
const KNOWN_KEYS = new Set([
  "id", "created_time", "lead_status",
  "ad_id", "ad_name", "adset_id", "adset_name", "campaign_id", "campaign_name",
  "form_id", "form_name", "is_organic", "platform",
  "nome_completo", "full_name", "name", "first_name", "last_name",
  "email", "telefone", "phone_number", "phone",
  "pais", "país", "country", "cargo", "job_title",
  "nome_da_empresa", "company_name", "respostas",
]);

function str(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

/** "sedã_executivo" -> "Sedã executivo". Text that already has spaces is left alone. */
export function prettifyAnswer(value: string): string {
  const text = value.trim();
  if (!text || /\s/.test(text) || !text.includes("_")) return text;
  const spaced = text.replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** "qual_é_a_sua_necessidade?" -> "Qual é a sua necessidade?" */
export function prettifyQuestion(key: string): string {
  const spaced = key.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Meta joins multiple-choice answers with "|". Returns one string, or a list for several. */
function normalizeAnswer(raw: unknown): string | string[] | null {
  if (Array.isArray(raw)) {
    const items = raw.map((v) => str(v)).filter((v): v is string => v !== null).map(prettifyAnswer);
    return items.length ? items : null;
  }
  const text = str(raw);
  if (text === null) return null;
  if (text.includes("|")) {
    const items = text.split("|").map((p) => prettifyAnswer(p)).filter(Boolean);
    return items.length > 1 ? items : (items[0] ?? null);
  }
  return prettifyAnswer(text);
}

function joinAnswer(answer: string | string[] | undefined): string | null {
  if (answer === undefined) return null;
  return Array.isArray(answer) ? answer.join(", ") : answer;
}

/** Meta test leads carry placeholder text like "<test lead: dummy data for ...>". */
function looksLikeTestLead(values: unknown[]): boolean {
  return values.some((v) => typeof v === "string" && (v.includes("<test lead") || v.trim().toLowerCase() === "test@meta.com"));
}

function toIso(value: unknown): string {
  const text = str(value);
  const date = text ? new Date(text) : new Date(NaN);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function platformLabel(platform: string | null): string | null {
  if (!platform) return null;
  const p = platform.toLowerCase();
  if (p === "fb") return "facebook";
  if (p === "ig") return "instagram";
  return p;
}

export function parseMetaLead(body: unknown): ParsedMetaLead {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { kind: "invalid", reason: "Body must be a JSON object" };
  }
  const data = body as Record<string, unknown>;

  const externalId = str(data.id);
  if (!externalId) return { kind: "invalid", reason: "Missing lead id" };

  // Answers: the nested "respostas" object plus any extra top-level keys.
  const answers: Record<string, string | string[]> = {};
  const nested = typeof data.respostas === "object" && data.respostas !== null ? (data.respostas as Record<string, unknown>) : {};
  const flat = Object.fromEntries(Object.entries(data).filter(([k]) => !KNOWN_KEYS.has(k)));
  for (const [key, raw] of Object.entries({ ...nested, ...flat })) {
    const answer = normalizeAnswer(raw);
    if (answer !== null) answers[prettifyQuestion(key)] = answer;
  }

  const name =
    str(data.nome_completo) ??
    str(data.full_name) ??
    str(data.name) ??
    ([str(data.first_name), str(data.last_name)].filter(Boolean).join(" ") || null);
  const email = str(data.email);
  const rawPhone = str(data.telefone) ?? str(data.phone_number) ?? str(data.phone);

  if (looksLikeTestLead([name, email, rawPhone, ...Object.values(answers).flat()])) {
    return { kind: "ignored", reason: "Meta test lead" };
  }

  // Meta prefixes phone numbers with "p:" in exports.
  const phone = rawPhone ? rawPhone.replace(/^p:\s*/i, "").trim() || null : null;

  const findAnswer = (pattern: RegExp) => {
    const key = Object.keys(answers).find((k) => pattern.test(k));
    return key ? joinAnswer(answers[key]) : null;
  };

  const platform = str(data.platform);
  const organic = data.is_organic;

  return {
    kind: "lead",
    lead: {
      externalId,
      createdAt: toIso(data.created_time),
      name: name ?? email ?? phone ?? `Lead Meta ${externalId.slice(-6)}`,
      companyName: str(data.nome_da_empresa) ?? str(data.company_name),
      phone,
      email,
      serviceInterest: findAnswer(/necessidade/i),
      serviceCity: findAnswer(/cidade/i),
      source: "meta",
      medium: platformLabel(platform),
      campaign: str(data.campaign_name),
      adName: str(data.ad_name),
      adsetName: str(data.adset_name),
      formName: str(data.form_name),
      extra: {
        respostas: answers,
        pais: str(data.pais) ?? str(data["país"]) ?? str(data.country),
        cargo: str(data.cargo) ?? str(data.job_title),
        platform,
        is_organic: organic === undefined || organic === null ? null : String(organic).toLowerCase() === "true",
        form_id: str(data.form_id),
        ad_id: str(data.ad_id),
        adset_id: str(data.adset_id),
        campaign_id: str(data.campaign_id),
      },
    },
  };
}
