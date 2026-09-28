// One-off data migration: copies every row from the old Neon database into Supabase.
// Usage (credentials stay in your shell, never in the repo):
//   SOURCE_DATABASE_URL="postgresql://...neon.tech/...?sslmode=require" \
//   TARGET_DATABASE_URL="postgresql://...supabase.com:5432/postgres?sslmode=require" \
//   node scripts/copy-neon-to-supabase.mjs
// Safe to re-run: existing rows (same primary key) are skipped, never overwritten.
import postgres from "postgres";

// Parents before children isn't needed (no FKs), but this order copies the small tables first.
const TABLES = [
  { name: "crm_users", key: "id", serial: true },
  { name: "site_settings", key: "key", serial: false },
  { name: "blog_posts", key: "id", serial: true },
  { name: "leads", key: "id", serial: true },
  { name: "tracking_events", key: "id", serial: true },
];
const BATCH = 500;

const sourceUrl = process.env.SOURCE_DATABASE_URL;
const targetUrl = process.env.TARGET_DATABASE_URL;
if (!sourceUrl || !targetUrl) {
  console.error("Defina SOURCE_DATABASE_URL (Neon) e TARGET_DATABASE_URL (Supabase).");
  process.exit(1);
}

const source = postgres(sourceUrl, { max: 1, prepare: false });
const target = postgres(targetUrl, { max: 1, prepare: false });

try {
  for (const { name, key, serial } of TABLES) {
    const [{ exists }] = await source`SELECT to_regclass(${`public.${name}`}) IS NOT NULL AS exists`;
    if (!exists) {
      console.log(`${name}: não existe na origem, pulando`);
      continue;
    }

    const [{ total }] = await source`SELECT COUNT(*)::int AS total FROM ${source(name)}`;
    let copied = 0;
    for (let offset = 0; offset < total; offset += BATCH) {
      const rows = await source`SELECT * FROM ${source(name)} ORDER BY ${source(key)} LIMIT ${BATCH} OFFSET ${offset}`;
      if (rows.length === 0) break;
      const result = await target`
        INSERT INTO ${target(name)} ${target(rows)}
        ON CONFLICT (${target(key)}) DO NOTHING
      `;
      copied += result.count;
    }

    if (serial) {
      // Keep new inserts from colliding with the copied ids.
      await target`
        SELECT setval(pg_get_serial_sequence(${name}, 'id'), GREATEST((SELECT COALESCE(MAX(id), 0) FROM ${target(name)}), 1))
      `;
    }

    const [{ now }] = await target`SELECT COUNT(*)::int AS now FROM ${target(name)}`;
    console.log(`${name}: ${total} na origem, ${copied} copiadas agora, ${now} no destino`);
  }
  console.log("Concluído.");
} catch (err) {
  console.error("Falhou:", err.message);
  process.exitCode = 1;
} finally {
  await source.end();
  await target.end();
}
