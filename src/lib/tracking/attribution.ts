const COOKIE_NAME = "kmon_attr";
const COOKIE_MAX_AGE_DAYS = 90;

export type Attribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landingPage: string | null;
};

const EMPTY_ATTRIBUTION: Attribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmContent: null,
  utmTerm: null,
  gclid: null,
  fbclid: null,
  referrer: null,
  landingPage: null,
};

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeDays: number) {
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** First-touch attribution capture. Call once on app mount; no-ops if a cookie already exists. */
export function captureAttributionOnce() {
  if (typeof window === "undefined") return;
  if (readCookie(COOKIE_NAME)) return;

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    utmTerm: params.get("utm_term"),
    gclid: params.get("gclid"),
    fbclid: params.get("fbclid"),
    referrer: document.referrer || null,
    landingPage: window.location.pathname,
  };

  writeCookie(COOKIE_NAME, JSON.stringify(attribution), COOKIE_MAX_AGE_DAYS);
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return EMPTY_ATTRIBUTION;
  try {
    return { ...EMPTY_ATTRIBUTION, ...JSON.parse(raw) };
  } catch {
    return EMPTY_ATTRIBUTION;
  }
}
