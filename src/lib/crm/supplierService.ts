import { sql } from "@/lib/db/client";
import { LeadService } from "./leadService";
import type { SupplierInput, SupplierRow } from "./types";

export const SupplierService = {
  /** Registers a contact the SDR identified as a supplier (one row per phone; repeated contact just
   * refreshes it). If the SDR had already opened a lead card for the same phone and nobody worked on it,
   * that card is removed so the contact does not stay in the sales funnel. */
  async upsertFromSdr(
    input: SupplierInput
  ): Promise<{ supplier: SupplierRow; created: boolean; leadRemoved: boolean }> {
    const phone = input.phone.replace(/\D/g, "");
    if (!phone) throw new Error("upsertFromSdr: phone has no digits");

    const rows = (await sql`
      INSERT INTO suppliers (name, company_name, phone, phone_normalized, email, offering, notes)
      VALUES (
        ${input.name ?? `WhatsApp +${phone}`}, ${input.companyName ?? null}, ${phone}, ${phone},
        ${input.email ?? null}, ${input.offering ?? null}, ${input.notes ?? null}
      )
      ON CONFLICT (phone_normalized) DO UPDATE SET
        name = COALESCE(${input.name ?? null}::text, suppliers.name),
        company_name = COALESCE(${input.companyName ?? null}::text, suppliers.company_name),
        email = COALESCE(${input.email ?? null}::text, suppliers.email),
        offering = COALESCE(${input.offering ?? null}::text, suppliers.offering),
        notes = COALESCE(${input.notes ?? null}::text, suppliers.notes),
        updated_at = now()
      RETURNING *, (xmax = 0) AS created
    `) as (SupplierRow & { created: boolean })[];

    const { created, ...supplier } = rows[0];
    const leadRemoved = await LeadService.removeUntouchedSdrLead(phone);
    return { supplier, created, leadRemoved };
  },

  async list(filters: { search?: string; limit?: number; offset?: number }): Promise<{ rows: SupplierRow[]; total: number }> {
    const limit = filters.limit ?? 50;
    const offset = filters.offset ?? 0;
    const search = filters.search ? `%${filters.search}%` : null;

    const rows = (await sql`
      SELECT * FROM suppliers
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search}
             OR company_name ILIKE ${search} OR offering ILIKE ${search})
      ORDER BY updated_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as SupplierRow[];

    const totalRows = (await sql`
      SELECT COUNT(*)::int AS count FROM suppliers
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search}
             OR company_name ILIKE ${search} OR offering ILIKE ${search})
    `) as { count: number }[];

    return { rows, total: totalRows[0]?.count ?? 0 };
  },
};
