import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

const DISALLOW = ["/api/", "/_next/", "/admin/", "/crm", "/crm/"];

// Named explicitly because a crawler that matches its own group ignores the "*" group.
// Search/answer bots cite the site in AI results; training bots are allowed by client decision.
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
