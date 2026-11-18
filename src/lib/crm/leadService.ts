import { sql } from "@/lib/db/client";
import type { LeadFilters, LeadInput, LeadRow, LeadStatus, SdrLeadInput, SdrLeadStatus } from "./types";

function normalizePhone(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  return digits.length > 0 ? digits : null;
}

// The SDR keeps its conversation summary inside this block of `notes`. Each sync replaces the
// block in place, so retries are idempotent and anything a human (or the quote form) wrote around
// it is left alone.
const SDR_NOTES_START = "[SDR WhatsApp]";
const SDR_NOTES_END = "[/SDR WhatsApp]";

function withSdrNotes(existing: string | null, summary: string): string {
  const clean = summary.split(SDR_NOTES_START).join("").split(SDR_NOTES_END).join("").trim();
  const stamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const block = `${SDR_NOTES_START}\nAtualizado em ${stamp}\n${clean}\n${SDR_NOTES_END}`;
  if (!existing) return block;

  const start = existing.indexOf(SDR_NOTES_START);
  const end = start === -1 ? -1 : existing.indexOf(SDR_NOTES_END, start);
  if (start !== -1 && end !== -1) {
    return existing.slice(0, start) + block + existing.slice(end + SDR_NOTES_END.length);
  }
  return `${existing}\n\n${block}`;
}

// The SDR may only move a lead forward through these stages. Anything past them
// (proposta_enviada, fechado, perdido) means a human took over, so the status is left as is.
const SDR_STATUS_RANK: Partial<Record<LeadStatus, number>> = { novo: 0, em_atendimento: 1, qualificado: 2 };

function nextSdrStatus(current: LeadStatus, requested?: SdrLeadStatus | null): LeadStatus {
  if (!requested) return current;
  const currentRank = SDR_STATUS_RANK[current];
  if (currentRank === undefined) return current;
  return (SDR_STATUS_RANK[requested] ?? 0) > currentRank ? requested : current;
}

export const LeadService = {
  /** Creates a lead, or — if a lead with the same phone was created in the last 30 days —
   * updates that existing lead instead (avoids duplicate leads from repeat form submissions). */
  async createOrMerge(input: LeadInput): Promise<LeadRow> {
    const phoneNormalized = normalizePhone(input.phone);

    if (phoneNormalized) {
      const existing = (await sql`
        SELECT * FROM leads
        WHERE phone_normalized = ${phoneNormalized}
          AND created_at > now() - interval '30 days'
        ORDER BY created_at DESC
        LIMIT 1
      `) as LeadRow[];

      if (existing[0]) {
        const noteAddition = `Nova solicitação em ${new Date().toLocaleString("pt-BR")}${
          input.serviceInterest ? ` — serviço: ${input.serviceInterest}` : ""
        }${input.serviceCity ? ` — cidade: ${input.serviceCity}` : ""}`;
        const mergedNotes = existing[0].notes ? `${existing[0].notes}\n${noteAddition}` : noteAddition;
        // Keep first-touch gclid/fbclid/utm_term/utm_content if the lead already has one
        // (matches the 90-day first-touch cookie in tracking/attribution.ts) — only
        // backfill when the existing record doesn't have a value yet.
        const gclid = existing[0].gclid ?? input.gclid ?? null;
        const fbclid = existing[0].fbclid ?? input.fbclid ?? null;
        const utmTerm = existing[0].utm_term ?? input.utmTerm ?? null;
        const utmContent = existing[0].utm_content ?? input.utmContent ?? null;
        // Service city reflects the latest request, not first-touch attribution.
        const serviceCity = input.serviceCity ?? existing[0].service_city ?? null;
        const updated = (await sql`
          UPDATE leads
          SET updated_at = now(), notes = ${mergedNotes}, gclid = ${gclid}, fbclid = ${fbclid},
              utm_term = ${utmTerm}, utm_content = ${utmContent}, service_city = ${serviceCity}
          WHERE id = ${existing[0].id}
          RETURNING *
        `) as LeadRow[];
        return updated[0];
      }
    }

    const inserted = (await sql`
      INSERT INTO leads (
        name, company_name, phone, phone_normalized, email, service_interest, service_city,
        source, medium, campaign, conversion_page, gclid, fbclid, utm_term, utm_content, status, notes
      ) VALUES (
        ${input.name}, ${input.companyName ?? null}, ${input.phone ?? null}, ${phoneNormalized},
        ${input.email ?? null}, ${input.serviceInterest ?? null}, ${input.serviceCity ?? null}, ${input.source ?? null},
        ${input.medium ?? null}, ${input.campaign ?? null}, ${input.conversionPage ?? null},
        ${input.gclid ?? null}, ${input.fbclid ?? null}, ${input.utmTerm ?? null}, ${input.utmContent ?? null},
        'novo', ${input.notes ?? null}
      )
      RETURNING *
    `) as LeadRow[];
    return inserted[0];
  },

  async create(input: LeadInput): Promise<LeadRow> {
    const phoneNormalized = normalizePhone(input.phone);
    const inserted = (await sql`
      INSERT INTO leads (
        name, company_name, phone, phone_normalized, email, service_interest, service_city,
        source, medium, campaign, conversion_page, gclid, fbclid, utm_term, utm_content, status, notes
      ) VALUES (
        ${input.name}, ${input.companyName ?? null}, ${input.phone ?? null}, ${phoneNormalized},
        ${input.email ?? null}, ${input.serviceInterest ?? null}, ${input.serviceCity ?? null}, ${input.source ?? null},
        ${input.medium ?? null}, ${input.campaign ?? null}, ${input.conversionPage ?? null},
        ${input.gclid ?? null}, ${input.fbclid ?? null}, ${input.utmTerm ?? null}, ${input.utmContent ?? null},
        'novo', ${input.notes ?? null}
      )
      RETURNING *
    `) as LeadRow[];
    return inserted[0];
  },

  /** Upsert used by the WhatsApp SDR. Matches an open lead (not fechado/perdido) with the same phone
   * that was touched in the last 30 days; otherwise creates one. Never touches gclid/fbclid/utm_*,
   * never overwrites a name/company/email that is already filled, and never moves status backwards. */
  async upsertFromSdr(input: SdrLeadInput): Promise<{ lead: LeadRow; created: boolean }> {
    const phoneNormalized = normalizePhone(input.phone);
    if (!phoneNormalized) throw new Error("upsertFromSdr: phone has no digits");

    const placeholderName = `WhatsApp +${phoneNormalized}`;

    const existing = (await sql`
      SELECT * FROM leads
      WHERE phone_normalized = ${phoneNormalized}
        AND status NOT IN ('fechado', 'perdido')
        AND updated_at > now() - interval '30 days'
      ORDER BY updated_at DESC
      LIMIT 1
    `) as LeadRow[];
    const current = existing[0];

    if (!current) {
      const inserted = (await sql`
        INSERT INTO leads (
          name, company_name, phone, phone_normalized, email, service_interest, service_city,
          source, medium, campaign, conversion_page, status, notes
        ) VALUES (
          ${input.name ?? placeholderName}, ${input.companyName ?? null}, ${phoneNormalized}, ${phoneNormalized},
          ${input.email ?? null}, ${input.serviceInterest ?? null}, ${input.serviceCity ?? null},
          ${input.source ?? "whatsapp"}, ${input.medium ?? "sdr"}, ${input.campaign ?? null}, ${input.conversionPage ?? null},
          ${nextSdrStatus("novo", input.status)},
          ${input.notes ? withSdrNotes(null, input.notes) : null}
        )
        RETURNING *
      `) as LeadRow[];
      return { lead: inserted[0], created: true };
    }

    // Name from the quote form wins; a WhatsApp-only placeholder is replaced once the real name is known.
    const name = input.name && current.name === `WhatsApp +${current.phone_normalized}` ? input.name : current.name;
    const notes = input.notes ? withSdrNotes(current.notes, input.notes) : current.notes;

    const updated = (await sql`
      UPDATE leads SET
        name = ${name},
        company_name = ${current.company_name ?? input.companyName ?? null},
        email = ${current.email ?? input.email ?? null},
        service_interest = ${input.serviceInterest ?? current.service_interest},
        service_city = ${input.serviceCity ?? current.service_city},
        source = ${current.source ?? input.source ?? null},
        medium = ${current.medium ?? input.medium ?? null},
        campaign = ${current.campaign ?? input.campaign ?? null},
        conversion_page = ${current.conversion_page ?? input.conversionPage ?? null},
        status = ${nextSdrStatus(current.status, input.status)},
        notes = ${notes},
        updated_at = now()
      WHERE id = ${current.id}
      RETURNING *
    `) as LeadRow[];
    return { lead: updated[0], created: false };
  },

  async getById(id: number): Promise<LeadRow | null> {
    const rows = (await sql`SELECT * FROM leads WHERE id = ${id}`) as LeadRow[];
    return rows[0] ?? null;
  },

  async update(
    id: number,
    patch: Partial<{ status: LeadStatus; notes: string; name: string; companyName: string; email: string; phone: string; serviceInterest: string; serviceCity: string }>
  ): Promise<LeadRow | null> {
    const current = await this.getById(id);
    if (!current) return null;

    const next = {
      name: patch.name ?? current.name,
      company_name: patch.companyName ?? current.company_name,
      email: patch.email ?? current.email,
      phone: patch.phone ?? current.phone,
      phone_normalized: patch.phone ? normalizePhone(patch.phone) : current.phone_normalized,
      service_interest: patch.serviceInterest ?? current.service_interest,
      service_city: patch.serviceCity ?? current.service_city,
      status: patch.status ?? current.status,
      notes: patch.notes ?? current.notes,
    };

    const rows = (await sql`
      UPDATE leads SET
        name = ${next.name}, company_name = ${next.company_name}, email = ${next.email},
        phone = ${next.phone}, phone_normalized = ${next.phone_normalized},
        service_interest = ${next.service_interest}, service_city = ${next.service_city},
        status = ${next.status}, notes = ${next.notes},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as LeadRow[];
    return rows[0] ?? null;
  },

  async list(filters: LeadFilters): Promise<{ rows: LeadRow[]; total: number }> {
    const limit = filters.limit ?? 25;
    const offset = filters.offset ?? 0;
    const search = filters.search ? `%${filters.search}%` : null;

    const rows = (await sql`
      SELECT * FROM leads
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search} OR company_name ILIKE ${search})
        AND (${filters.status ?? null}::text IS NULL OR status = ${filters.status ?? null})
        AND (${filters.source ?? null}::text IS NULL OR source = ${filters.source ?? null})
        AND (${filters.from ?? null}::text IS NULL OR created_at >= ${filters.from ?? null}::timestamptz)
        AND (${filters.to ?? null}::text IS NULL OR created_at <= ${filters.to ?? null}::timestamptz)
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as LeadRow[];

    const totalRows = (await sql`
      SELECT COUNT(*)::int AS count FROM leads
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search} OR company_name ILIKE ${search})
        AND (${filters.status ?? null}::text IS NULL OR status = ${filters.status ?? null})
        AND (${filters.source ?? null}::text IS NULL OR source = ${filters.source ?? null})
        AND (${filters.from ?? null}::text IS NULL OR created_at >= ${filters.from ?? null}::timestamptz)
        AND (${filters.to ?? null}::text IS NULL OR created_at <= ${filters.to ?? null}::timestamptz)
    `) as { count: number }[];

    return { rows, total: totalRows[0]?.count ?? 0 };
  },

  async countTotal(): Promise<number> {
    const rows = (await sql`SELECT COUNT(*)::int AS count FROM leads`) as { count: number }[];
    return rows[0]?.count ?? 0;
  },

  async countByStatus(status: LeadStatus): Promise<number> {
    const rows = (await sql`SELECT COUNT(*)::int AS count FROM leads WHERE status = ${status}`) as { count: number }[];
    return rows[0]?.count ?? 0;
  },

  async topSource(sinceDays = 30): Promise<string | null> {
    const rows = (await sql`
      SELECT source, COUNT(*)::int AS count
      FROM leads
      WHERE created_at >= now() - (${sinceDays} || ' days')::interval AND source IS NOT NULL
      GROUP BY source
      ORDER BY count DESC
      LIMIT 1
    `) as { source: string; count: number }[];
    return rows[0]?.source ?? null;
  },
};
