import { sql } from "@/lib/db/client";
import type { TrackingEventInput, TrackingEventRow } from "./types";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_EVENTS = 30;

export const EventService = {
  async record(input: TrackingEventInput & { ipHash?: string | null }) {
    // metadata goes through ::text::jsonb: a bare string bound to a jsonb column is JSON-encoded a
    // second time by the postgres driver and stored as a string instead of an object.
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
        ${input.metadata ? JSON.stringify(input.metadata) : null}::text::jsonb
      )
    `;
  },

  /**
   * Links an inbound WhatsApp message to the click that carried the same Ref code.
   * Only clicks from the last 7 days and without a phone yet are matched, so replays are no-ops.
   */
  async attachInboundContact(ref: string, contact: { phone: string; name: string | null }): Promise<boolean> {
    // The jsonb patch is built in SQL on purpose: binding a JSON *string* to a ::jsonb cast gets
    // encoded a second time by the postgres driver and ends up as a string inside an array.
    const rows = (await sql`
      UPDATE tracking_events
      SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object(
        'phone', ${contact.phone}::text,
        'contact_name', ${contact.name}::text,
        'contacted_at', ${new Date().toISOString()}::text
      )
      WHERE event_type = 'whatsapp_click'
        AND metadata->>'ref' = ${ref}
        AND metadata->>'phone' IS NULL
        AND created_at > now() - interval '7 days'
      RETURNING id
    `) as { id: number }[];
    return rows.length > 0;
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
             gclid, fbclid, referrer, device_type, metadata, created_at
      FROM tracking_events
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as TrackingEventRow[];
    return rows;
  },

  /**
   * `search` matches the protocol code or the phone number (digits as stored).
   * `pendingPhone` keeps only WhatsApp clicks that carry a protocol but no phone yet.
   */
  async getPaginated(
    limit = 25,
    offset = 0,
    filters: { search?: string; type?: string; pendingPhone?: boolean } = {}
  ): Promise<{ rows: TrackingEventRow[]; total: number }> {
    const term = filters.search?.trim();
    const like = term ? `%${term}%` : null;
    const type = filters.type ?? null;
    const pending = filters.pendingPhone ? "yes" : "no";
    const rows = (await sql`
      SELECT id, event_type, page_url, page_title, button_id, button_text, button_location,
             service, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
             gclid, fbclid, referrer, device_type, metadata, created_at
      FROM tracking_events
      WHERE (${like}::text IS NULL OR metadata->>'ref' ILIKE ${like} OR metadata->>'phone' ILIKE ${like})
        AND (${type}::text IS NULL OR event_type = ${type})
        AND (${pending}::text = 'no' OR (event_type = 'whatsapp_click' AND metadata->>'ref' IS NOT NULL AND metadata->>'phone' IS NULL))
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as TrackingEventRow[];
    const totalRows = (await sql`
      SELECT COUNT(*)::int AS count
      FROM tracking_events
      WHERE (${like}::text IS NULL OR metadata->>'ref' ILIKE ${like} OR metadata->>'phone' ILIKE ${like})
        AND (${type}::text IS NULL OR event_type = ${type})
        AND (${pending}::text = 'no' OR (event_type = 'whatsapp_click' AND metadata->>'ref' IS NOT NULL AND metadata->>'phone' IS NULL))
    `) as { count: number }[];
    return { rows, total: totalRows[0]?.count ?? 0 };
  },

  /**
   * Lets the sales team record, by hand, who sent the message behind a WhatsApp click.
   * Pass null to clear it. Only whatsapp_click rows are editable.
   */
  async setManualPhone(id: number, phone: string | null): Promise<TrackingEventRow["metadata"] | undefined> {
    if (phone === null) {
      const rows = (await sql`
        UPDATE tracking_events
        SET metadata = COALESCE(metadata, '{}'::jsonb) - 'phone' - 'phone_source' - 'contacted_at' - 'contact_name'
        WHERE id = ${id} AND event_type = 'whatsapp_click'
        RETURNING metadata
      `) as { metadata: TrackingEventRow["metadata"] }[];
      return rows[0]?.metadata ?? undefined;
    }
    const rows = (await sql`
      UPDATE tracking_events
      SET metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object(
        'phone', ${phone}::text,
        'phone_source', 'manual',
        'contacted_at', ${new Date().toISOString()}::text
      )
      WHERE id = ${id} AND event_type = 'whatsapp_click'
      RETURNING metadata
    `) as { metadata: TrackingEventRow["metadata"] }[];
    return rows[0]?.metadata ?? undefined;
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
