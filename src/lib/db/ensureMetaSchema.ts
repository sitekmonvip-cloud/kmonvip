import { sql } from "@/lib/db/client";

// The Meta leads feature needs two extra columns on `leads`. Rather than require someone to run a
// migration by hand on whichever database production points at, the first Meta request makes sure
// they exist. Every statement is idempotent, and the work runs once per server instance.
let ready: Promise<void> | null = null;

async function apply() {
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS external_id TEXT`;
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS extra JSONB`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_external_id ON leads (external_id) WHERE external_id IS NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source)`;
}

export function ensureMetaSchema(): Promise<void> {
  if (!ready) {
    ready = apply().catch(async (firstError) => {
      // Two instances starting together can race on the same DDL; a second pass sees the result.
      try {
        await apply();
      } catch {
        ready = null; // let the next request try again
        throw firstError;
      }
    });
  }
  return ready;
}
