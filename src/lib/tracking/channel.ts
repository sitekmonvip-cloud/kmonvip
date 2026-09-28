const AI_SOURCES: [RegExp, string][] = [
  [/chatgpt\.com|chat\.openai\.com/, "ChatGPT"],
  [/perplexity\.ai/, "Perplexity"],
  [/gemini\.google\.com|bard\.google\.com/, "Gemini"],
  [/copilot\.microsoft\.com/, "Copilot"],
  [/claude\.ai/, "Claude"],
];

const SEARCH_ENGINES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google"],
  [/(^|\.)bing\.com/, "Bing"],
  [/duckduckgo\.com/, "DuckDuckGo"],
  [/search\.yahoo\.com/, "Yahoo"],
  [/(^|\.)yandex\./, "Yandex"],
];

type Source = {
  utm_source: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer: string | null;
};

/** Human-readable acquisition channel, e.g. "Orgânico · Google", "IA · ChatGPT", "Direto". */
export function classifyChannel({ utm_source, gclid, fbclid, referrer }: Source): string {
  if (gclid) return "Google Ads";
  if (fbclid) return "Meta Ads";

  const utm = utm_source?.toLowerCase() ?? "";
  for (const [re, name] of AI_SOURCES) if (re.test(utm)) return `IA · ${name}`;
  if (utm_source) return `Campanha · ${utm_source}`;

  if (!referrer) return "Direto";
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Direto";
  }
  if (host.endsWith("kmonvip.com")) return "Direto";
  for (const [re, name] of AI_SOURCES) if (re.test(host)) return `IA · ${name}`;
  for (const [re, name] of SEARCH_ENGINES) if (re.test(host)) return `Orgânico · ${name}`;
  return `Referência · ${host}`;
}
