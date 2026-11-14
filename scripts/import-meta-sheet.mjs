// One-off import of the Meta leads sheet into the CRM, through the same endpoint Make uses.
//
//   node scripts/import-meta-sheet.mjs --file leads.csv --url https://kmonvip.com/api/meta/leads --secret <META_LEADS_SECRET>
//   node scripts/import-meta-sheet.mjs --file https://docs.google.com/.../export?format=csv --dry-run
//
// The secret can also come from the META_LEADS_SECRET environment variable. Re-running is safe:
// the endpoint ignores leads whose Meta id it already has. Accents that were already corrupted in
// the sheet ("�") cannot be recovered — leads arriving through Make are not affected.

import fs from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, all) => {
    if (arg.startsWith("--")) acc.push([arg.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]);
    return acc;
  }, [])
);

if (!args.file) {
  console.error("Usage: node scripts/import-meta-sheet.mjs --file <csv path or url> [--url <endpoint>] [--secret <key>] [--dry-run]");
  process.exit(1);
}
const endpoint = args.url || "http://localhost:4000/api/meta/leads";
const secret = args.secret || process.env.META_LEADS_SECRET;
const dryRun = Boolean(args["dry-run"]);
if (!dryRun && !secret) {
  console.error("Missing secret: pass --secret or set META_LEADS_SECRET.");
  process.exit(1);
}

/** Minimal CSV parser: quoted fields, escaped quotes, newlines inside quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); if (row.some((v) => v !== "")) rows.push(row); }
  return rows;
}

const source = String(args.file);
const text = /^https?:\/\//.test(source)
  ? await (await fetch(source)).text()
  : fs.readFileSync(source, "utf8");
const [header, ...records] = parseCsv(text.replace(/^﻿/, ""));

const DIRECT = new Set(["id", "created_time", "ad_id", "ad_name", "adset_id", "adset_name", "campaign_id", "campaign_name",
  "form_id", "form_name", "is_organic", "platform", "email", "nome_completo", "telefone", "cargo", "nome_da_empresa"]);

function toPayload(values) {
  const payload = { respostas: {} };
  header.forEach((name, i) => {
    const value = (values[i] ?? "").trim();
    if (!value || name === "lead_status") return;
    if (DIRECT.has(name)) payload[name] = value;
    else if (/^pa.s$/i.test(name)) payload.pais = value; // "país", even when the accent was corrupted
    else payload.respostas[name] = value;
  });
  return payload;
}

const totals = { created: 0, duplicate: 0, ignored: 0, failed: 0 };
for (const values of records) {
  const payload = toPayload(values);
  if (dryRun) { console.log(payload.id, "->", Object.keys(payload.respostas).length, "answers"); continue; }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", "X-Make-Secret": secret },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { totals.failed++; console.error(`${payload.id}: HTTP ${res.status} ${json.error ?? ""}`); }
    else totals[json.status] = (totals[json.status] ?? 0) + 1;
  } catch (error) {
    totals.failed++;
    console.error(`${payload.id}: ${error.message}`);
  }
}
console.log(dryRun ? `Dry run: ${records.length} rows read.` : `Done: ${JSON.stringify(totals)}`);
