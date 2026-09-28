import { after } from "next/server";
import { SITE_URL, INDEXNOW_KEY } from "./constants";

// Production only (Vercel or Netlify); previews and local dev must not announce URLs.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production" || process.env.CONTEXT === "production";

/** Tells Bing/Yandex/Seznam (IndexNow) that these paths changed, after the response is sent. */
export function notifyIndexNow(paths: string[]) {
  if (!IS_PRODUCTION || paths.length === 0) return;
  after(async () => {
    try {
      await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: new URL(SITE_URL).host,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: paths.map((p) => `${SITE_URL}${p}`),
        }),
      });
    } catch (err) {
      console.error("[indexnow] ping failed", err);
    }
  });
}
