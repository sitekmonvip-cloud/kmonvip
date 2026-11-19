import type { LeadRow } from "./types";

export type MetaLeadEmail = {
  subject: string;
  html: string;
  text: string;
  /** Lead's own e-mail, so "Reply" in the inbox answers the lead. Only set when it looks valid. */
  replyTo: string | undefined;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One line, no control characters (a name with line breaks must not leak into the subject header). */
function oneLine(value: string, max: number): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function isPlausibleEmail(value: string): boolean {
  return /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]{2,}$/.test(value);
}

function formatDate(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

function platformLabel(platform: string | null | undefined): string | null {
  if (!platform) return null;
  const p = platform.toLowerCase();
  if (p === "fb" || p === "facebook") return "Facebook";
  if (p === "ig" || p === "instagram") return "Instagram";
  return platform;
}

/** Builds the "new Meta lead" e-mail from a stored lead row. Pure: no I/O, safe to unit test. */
export function buildMetaLeadEmail(lead: LeadRow): MetaLeadEmail {
  const extra = lead.extra ?? {};
  const name = oneLine(lead.name, 120) || "Lead Meta";

  const details: [string, string | null | undefined][] = [
    ["Telefone", lead.phone],
    ["E-mail", lead.email],
    ["Empresa", lead.company_name],
    ["Cargo", extra.cargo],
    ["País", extra.pais],
    ["Interesse", lead.service_interest],
    ["Cidade", lead.service_city],
    ["Campanha", lead.campaign],
    ["Plataforma", platformLabel(extra.platform ?? lead.medium)],
    ["Recebido em", formatDate(lead.created_at)],
  ];
  const answers = Object.entries(extra.respostas ?? {}).map(
    ([question, answer]): [string, string] => [question, Array.isArray(answer) ? answer.join(", ") : answer]
  );

  const rows = details.filter((row): row is [string, string] => Boolean(row[1] && row[1].trim()));

  const renderRows = (items: [string, string][]) =>
    items
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;border-bottom:1px solid #E8E6DC;color:#6B6B66;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E8E6DC;color:#0A0A0A;font-size:14px;font-weight:500;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
      )
      .join("");

  const answersHtml = answers.length
    ? `<p style="margin:28px 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#6B6B66;">Respostas do formulário</p>
        <table role="presentation" width="100%" style="border-collapse:collapse;">${renderRows(answers)}
        </table>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Novo lead (Meta) — KMON VIP</title>
</head>
<body style="margin:0;padding:0;background:#F4F2EC;">
<div style="background:#F4F2EC;padding:32px 16px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E8E6DC;">
    <tr>
      <td style="background:#0A0A0A;padding:24px 32px;">
        <span style="color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:0.02em;">KMON <span style="color:#BFB08A;">VIP</span></span>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#BFB08A;">Novo lead — Meta</p>
        <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#0A0A0A;line-height:1.3;">${escapeHtml(name)}</h1>
        <table role="presentation" width="100%" style="border-collapse:collapse;">${renderRows(rows)}
        </table>
        ${answersHtml}
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px;background:#F4F2EC;text-align:center;">
        <span style="font-size:11px;color:#B0AEA5;">Lead recebido via formulário de anúncio da Meta · já está no CRM</span>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;

  const text = [
    `Novo lead (Meta) — ${name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(answers.length ? ["", "Respostas do formulário:", ...answers.map(([q, a]) => `- ${q}: ${a}`)] : []),
  ].join("\n");

  const email = lead.email?.trim();
  return {
    subject: `Novo lead (Meta) — ${name}`,
    html,
    text,
    replyTo: email && isPlausibleEmail(email) ? email : undefined,
  };
}
