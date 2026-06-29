#!/usr/bin/env node
/**
 * Translates messages/pt.json into all target locales using MyMemory free API.
 *
 * MyMemory: https://mymemory.translated.net/doc/spec.php
 * - Free, no API key for ≤50k chars/day anonymous
 * - To raise to 1M chars/day, register and pass MYMEMORY_EMAIL env var
 *
 * Usage:
 *   node scripts/translate.mjs              # translate all locales
 *   node scripts/translate.mjs en es        # only specific locales
 *
 * Heuristics:
 * - Preserves brand names (KMON VIP, FIFA, G20, COP30, ONU)
 * - Preserves placeholders like {current}, {total}
 * - Caches translations to avoid re-hitting API
 * - Skips strings that are pure digits / emails / URLs
 * - Throttles requests (300ms) to be polite
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, "..");
const MSG_DIR    = path.join(ROOT, "messages");
const PT_FILE    = path.join(MSG_DIR, "pt.json");
const CACHE_FILE = path.join(MSG_DIR, ".translation-cache.json");

const ALL_LOCALES = ["en", "es", "zh", "ja", "fr", "de"];
const SOURCE_LANG = "pt-BR";

// MyMemory language codes
const TO_MY_MEMORY = {
  en: "en-US",
  es: "es-ES",
  zh: "zh-CN",
  ja: "ja-JP",
  fr: "fr-FR",
  de: "de-DE",
};

// Strings to NEVER translate
const PROTECTED_TERMS = [
  "KMON VIP", "KMON", "FIFA", "G20", "COP 30", "COP30", "ONU", "ESPN", "OECD",
  "Mercedes-Benz", "Sprinter", "Cadillac Escalade", "Jeep Commander", "Marcopolo Paradiso",
  "Brasília", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Manaus", "Belém",
  "Lula", "Bolsonaro", "Obama", "Hillary Clinton", "Biden", "Mike Pompeo", "Lewis Hamilton",
  "WhatsApp", "B6",
];

const MY_EMAIL = process.env.MYMEMORY_EMAIL || "";
const REQ_DELAY_MS = 350;

// ─── Helpers ─────────────────────────────────────────────────────────
async function loadJson(filepath, fallback = null) {
  if (!existsSync(filepath)) return fallback;
  return JSON.parse(await readFile(filepath, "utf-8"));
}

async function saveJson(filepath, data) {
  await mkdir(path.dirname(filepath), { recursive: true });
  await writeFile(filepath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function shouldSkip(str) {
  if (typeof str !== "string") return true;
  if (!str.trim()) return true;
  if (/^[\d\s+\-().,:%]+$/.test(str)) return true;     // pure numbers/symbols
  if (/^[a-z]+@[a-z]+\./.test(str)) return true;        // email
  if (/^https?:\/\//.test(str)) return true;            // url
  if (str.length > 1500) return true;                   // too long for free tier
  return false;
}

function maskProtected(str) {
  // Replace protected terms with placeholders {{P0}}, {{P1}} ...
  const map = [];
  let masked = str;
  PROTECTED_TERMS.forEach((term) => {
    const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    masked = masked.replace(re, (m) => {
      const i = map.length;
      map.push(m);
      return `{{P${i}}}`;
    });
  });
  return { masked, map };
}

function unmask(str, map) {
  let out = str;
  map.forEach((orig, i) => {
    out = out.split(`{{P${i}}}`).join(orig);
    out = out.split(`{{ P${i} }}`).join(orig); // some translators add spaces
    out = out.split(`{{ P ${i} }}`).join(orig);
  });
  return out;
}

async function myMemoryTranslate(text, targetLang) {
  const { masked, map } = maskProtected(text);
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", masked);
  url.searchParams.set("langpair", `${SOURCE_LANG}|${TO_MY_MEMORY[targetLang]}`);
  if (MY_EMAIL) url.searchParams.set("de", MY_EMAIL);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const json = await res.json();

  if (json.responseStatus !== 200 && json.responseStatus !== "200") {
    throw new Error(`MyMemory error: ${json.responseDetails || "unknown"}`);
  }

  const translated = json.responseData?.translatedText || masked;
  return unmask(translated, map);
}

// ─── Walk nested JSON ────────────────────────────────────────────────
async function translateValue(value, targetLang, cache) {
  if (Array.isArray(value)) {
    const out = [];
    for (const v of value) out.push(await translateValue(v, targetLang, cache));
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await translateValue(v, targetLang, cache);
    }
    return out;
  }
  if (typeof value !== "string") return value;

  if (shouldSkip(value)) return value;

  // Cache key
  const cacheKey = `${targetLang}|${value}`;
  if (cache[cacheKey] !== undefined) return cache[cacheKey];

  try {
    process.stdout.write(`  [${targetLang}] "${value.slice(0, 50)}${value.length > 50 ? "…" : ""}" → `);
    const translated = await myMemoryTranslate(value, targetLang);
    process.stdout.write(`"${translated.slice(0, 50)}${translated.length > 50 ? "…" : ""}"\n`);
    cache[cacheKey] = translated;
    await new Promise((r) => setTimeout(r, REQ_DELAY_MS));
    return translated;
  } catch (err) {
    console.warn(`\n    !! failed (${err.message}) — keeping PT`);
    return value;
  }
}

// ─── Main ────────────────────────────────────────────────────────────
async function main() {
  const requested = process.argv.slice(2);
  const targets = requested.length ? requested : ALL_LOCALES;

  const ptData = await loadJson(PT_FILE);
  if (!ptData) {
    console.error(`Missing ${PT_FILE}`);
    process.exit(1);
  }

  const cache = (await loadJson(CACHE_FILE)) || {};

  for (const locale of targets) {
    if (!TO_MY_MEMORY[locale]) {
      console.warn(`Unknown locale ${locale}, skipping`);
      continue;
    }
    console.log(`\n→ Translating to ${locale}...`);
    const translated = await translateValue(ptData, locale, cache);

    const outPath = path.join(MSG_DIR, `${locale}.json`);
    await saveJson(outPath, translated);
    console.log(`✓ ${outPath}`);

    // Persist cache after each locale (resume-safe)
    await saveJson(CACHE_FILE, cache);
  }

  console.log("\n✓ All done.");
}

main().catch((e) => {
  console.error("\nFATAL:", e);
  process.exit(1);
});
