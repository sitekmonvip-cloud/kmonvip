// Cookie consent + Google Consent Mode v2.
// Default state ("denied") is set by an inline script in the root layout, BEFORE GTM loads.

export const CONSENT_STORAGE_KEY = "kmonvip-consent-v2";
export const CONSENT_CHANGE_EVENT = "kmon-consent-change";
export const OPEN_CONSENT_EVENT = "kmon-open-consent";
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

export type Consent = { analytics: boolean; ads: boolean; ts: number };

type GtagWindow = Window & { dataLayer?: unknown[] };

/** Inline script (runs before GTM): everything denied until the visitor chooses. */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}')||'null');
if(c&&Date.now()-c.ts<${CONSENT_TTL_MS}){var a=c.ads?'granted':'denied',n=c.analytics?'granted':'denied';
gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:n})}}catch(e){}
`.trim();

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (typeof c.ts !== "number" || Date.now() - c.ts > CONSENT_TTL_MS) return null;
    return { analytics: !!c.analytics, ads: !!c.ads, ts: c.ts };
  } catch {
    return null;
  }
}

function gtagUpdate(c: Pick<Consent, "analytics" | "ads">) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  const ads = c.ads ? "granted" : "denied";
  // Consent Mode requires the `arguments` object form, hence a function (not an arrow).
  (function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  })("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? "granted" : "denied",
  });
}

export function saveConsent(choice: Pick<Consent, "analytics" | "ads">): Consent {
  const c: Consent = { ...choice, ts: Date.now() };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(c));
  } catch {
    // storage blocked: choice applies for this page view only
  }
  gtagUpdate(c);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: c }));
  return c;
}
