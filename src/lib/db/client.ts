import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (cached) return cached;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL (or POSTGRES_URL) is not set. Provision a Postgres database (Vercel Storage → Create Database) and connect it to this project."
    );
  }

  cached = neon(connectionString);
  return cached;
}

// Lazy wrapper: avoids connecting (and throwing when the env var isn't set yet) at module
// evaluation time, which would otherwise break `next build`'s page-data collection step.
export const sql: NeonQueryFunction<false, false> = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  getClient()(...args)) as NeonQueryFunction<false, false>;
