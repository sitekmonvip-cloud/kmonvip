import { ImageResponse } from "next/og";
import path from "node:path";
import sharp from "sharp";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/constants";

export const runtime = "nodejs";

// Only local photos under /public/images; the path comes from the query string.
const SAFE_IMAGE = /^\/images\/[\w\- /.]+\.(webp|png|jpe?g)$/i;

async function loadBackground(img: string | null): Promise<string | null> {
  if (!img || !SAFE_IMAGE.test(img) || img.includes("..")) return null;
  try {
    // Satori can't decode WebP (the site's photo format), so re-encode as JPEG at OG size.
    const data = await sharp(path.join(process.cwd(), "public", img))
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality: 78 })
      .toBuffer();
    return `data:image/jpeg;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || SITE_TAGLINE).slice(0, 110);
  const bg = await loadBackground(searchParams.get("img"));

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#111110" }}>
        {bg && (
          // eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser
          <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.75) 55%, rgba(10,10,9,0.35) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#C9A96E", fontSize: 28, letterSpacing: 6, fontWeight: 700 }}>
            {SITE_NAME}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
            <div style={{ width: 96, height: 3, background: "#C9A96E" }} />
            <div style={{ color: "#F5F3EE", fontSize: 64, lineHeight: 1.1, fontWeight: 700 }}>{title}</div>
          </div>
          <div style={{ color: "rgba(245,243,238,0.7)", fontSize: 24 }}>kmonvip.com · Atendimento 24h</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );

  // Photo-heavy PNGs land near 1MB, too large for WhatsApp previews; JPEG keeps it ~100KB.
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
    },
  });
}
