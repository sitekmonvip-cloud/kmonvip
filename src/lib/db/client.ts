import postgres from "postgres";

type Row = Record<string, unknown>;
type SqlTag = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Row[]>;

let cached: postgres.Sql | null = null;

function getClient(): postgres.Sql {
  if (cached) return cached;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL (or POSTGRES_URL) is not set. Use the Supabase transaction pooler URL (port 6543) from Project Settings → Database."
    );
  }

  // prepare:false is required by Supabase's transaction pooler (PgBouncer); a small
  // pool per serverless instance keeps us under the pooler's client limit. TLS comes
  // from the URL (?sslmode=require).
  cached = postgres(connectionString, { prepare: false, max: 5, idle_timeout: 20 });
  return cached;
}

// Lazy wrapper: avoids connecting (and throwing when the env var isn't set yet) at module
// evaluation time, which would otherwise break `next build`'s page-data collection step.
export const sql: SqlTag = (strings, ...values) =>
  getClient()(strings, ...(values as postgres.ParameterOrFragment<never>[])) as unknown as Promise<Row[]>;
