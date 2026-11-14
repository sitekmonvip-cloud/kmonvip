import { sql } from "@/lib/db/client";

export type CountRow = { label: string; count: number };

export type MetaStats = {
  days: number;
  totals: { total: number; today: number; campaigns: number; countries: number };
  byCampaign: CountRow[];
  byAdset: CountRow[];
  byAd: CountRow[];
  byForm: CountRow[];
  byCountry: CountRow[];
  byStatus: CountRow[];
  daily: { day: string; count: number }[];
};

const NONE = "(não informado)";

export const MetaStatsService = {
  /** Aggregates of the leads that came from Meta Lead Ads, over the last `days` days. */
  async get(days: 7 | 30 | 90): Promise<MetaStats> {
    const span = String(days);

    const totalsRows = (await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('day', now()))::int AS today,
        COUNT(DISTINCT campaign)::int AS campaigns,
        COUNT(DISTINCT extra->>'pais')::int AS countries
      FROM leads
      WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval
    `) as MetaStats["totals"][];

    const group = async (column: "campaign" | "utm_term" | "utm_content" | "conversion_page" | "country" | "status") => {
      // Column names can't be bound as parameters, so each one is spelled out below.
      const rows =
        column === "campaign"
          ? await sql`SELECT COALESCE(NULLIF(campaign, ''), ${NONE}) AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`
          : column === "utm_term"
            ? await sql`SELECT COALESCE(NULLIF(utm_term, ''), ${NONE}) AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`
            : column === "utm_content"
              ? await sql`SELECT COALESCE(NULLIF(utm_content, ''), ${NONE}) AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`
              : column === "conversion_page"
                ? await sql`SELECT COALESCE(NULLIF(conversion_page, ''), ${NONE}) AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`
                : column === "country"
                  ? await sql`SELECT COALESCE(NULLIF(extra->>'pais', ''), ${NONE}) AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`
                  : await sql`SELECT status AS label, COUNT(*)::int AS count FROM leads WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval GROUP BY 1 ORDER BY 2 DESC, 1`;
      return rows as unknown as CountRow[];
    };

    const [byCampaign, byAdset, byAd, byForm, byCountry, byStatus] = await Promise.all([
      group("campaign"),
      group("utm_term"),
      group("utm_content"),
      group("conversion_page"),
      group("country"),
      group("status"),
    ]);

    const daily = (await sql`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
      FROM leads
      WHERE source = 'meta' AND created_at >= now() - (${span} || ' days')::interval
      GROUP BY 1
      ORDER BY 1
    `) as unknown as { day: string; count: number }[];

    return {
      days,
      totals: totalsRows[0] ?? { total: 0, today: 0, campaigns: 0, countries: 0 },
      byCampaign,
      byAdset,
      byAd,
      byForm,
      byCountry,
      byStatus,
      daily,
    };
  },
};
