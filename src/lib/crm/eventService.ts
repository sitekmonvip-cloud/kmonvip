import { sql } from "@/lib/db/client";
import type { TrackingEventInput, TrackingEventRow } from "./types";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_EVENTS = 30;

export const EventService = {
  async record(input: TrackingEventInput & { ipHash?: string | null }) {
    await sql`
      INSERT INTO tracking_events (
        event_type, page_url, page_title, button_id, button_text, button_location,
        service, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
        gclid, fbclid, referrer, device_type, ip_hash, metadata
      ) VALUES (
        ${input.eventType}, ${input.pageUrl ?? null}, ${input.pageTitle ?? null},
        ${input.buttonId ?? null}, ${input.buttonText ?? null}, ${input.buttonLocation ?? null},
        ${input.service ?? null}, ${input.utmSource ?? null}, ${input.utmMedium ?? null},
        ${input.utmCampaign ?? null}, ${input.utmContent ?? null}, ${input.utmTerm ?? null},
        ${input.gclid ?? null}, ${input.fbclid ?? null}, ${input.referrer ?? null},
        ${input.deviceType ?? null}, ${input.ipHash ?? null},
        ${input.metadata ? JSON.stringify(input.metadata) : null}
      )
    `;
  },

  /** Returns false when the given ip_hash has exceeded the basic abuse threshold. */
  async isWithinRateLimit(ipHash: string): Promise<boolean> {
    const rows = (await sql`
      SELECT COUNT(*)::int AS count
      FROM tracking_events
      WHERE ip_hash = ${ipHash}
        AND created_at > now() - (${RATE_LIMIT_WINDOW_SECONDS} || ' seconds')::interval
    `) as { count: number }[];
    return (rows[0]?.count ?? 0) < RATE_LIMIT_MAX_EVENTS;
  },

  async getRecent(limit = 50): Promise<TrackingEventRow[]> {
    const rows = (await sql`
      SELECT id, event_type, page_url, page_title, button_id, button_text, button_location,
             service, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
             gclid, fbclid, referrer, device_type, created_at
      FROM tracking_events
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as TrackingEventRow[];
    return rows;
  },

  async getPaginated(limit = 25, offset = 0): Promise<{ rows: TrackingEventRow[]; total: number }> {
    const rows = (await sql`
      SELECT id, event_type, page_url, page_title, button_id, button_text, button_location,
             service, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
             gclid, fbclid, referrer, device_type, created_at
      FROM tracking_events
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as TrackingEventRow[];
    const totalRows = (await sql`SELECT COUNT(*)::int AS count FROM tracking_events`) as { count: number }[];
    return { rows, total: totalRows[0]?.count ?? 0 };
  },

  async countByTypeSince(eventType: string, since: Date): Promise<number> {
    const rows = (await sql`
      SELECT COUNT(*)::int AS count
      FROM tracking_events
      WHERE event_type = ${eventType} AND created_at >= ${since.toISOString()}
    `) as { count: number }[];
    return rows[0]?.count ?? 0;
  },

  async getDailySeries(days: 7 | 30): Promise<{ day: string; count: number }[]> {
    const rows = (await sql`
      SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
      FROM tracking_events
      WHERE created_at >= now() - (${days} || ' days')::interval
      GROUP BY 1
      ORDER BY 1
    `) as { day: string; count: number }[];
    return rows;
  },
};
