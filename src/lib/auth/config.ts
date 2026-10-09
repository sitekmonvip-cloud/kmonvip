import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { timingSafeEqual } from "crypto";
import { sql } from "@/lib/db/client";
import { verifyPassword } from "./password";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

const providers = [];

// Temporary shared-credential login — active only while CRM_TEST_LOGIN_ENABLED="true".
// Disable later by flipping that env var, no code change needed.
if (process.env.CRM_TEST_LOGIN_ENABLED === "true") {
  providers.push(
    Credentials({
      id: "crm-test-login",
      name: "Login temporário",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        const expectedUsername = process.env.CRM_TEST_USERNAME;
        const expectedPassword = process.env.CRM_TEST_PASSWORD;

        if (!expectedUsername || !expectedPassword) return null;
        if (typeof username !== "string" || typeof password !== "string") return null;
        if (!safeCompare(username, expectedUsername) || !safeCompare(password, expectedPassword)) {
          return null;
        }

        return { id: "crm-test-user", name: "TRACK-KMONVIP", email: "track@kmonvip.local" };
      },
    })
  );
}

// Individual accounts: email + password stored hashed in crm_users. Added alongside the
// shared login above, which is untouched; the login form tries that one first.
providers.push(
  Credentials({
    id: "crm-user-login",
    name: "Conta individual",
    credentials: {
      username: { label: "E-mail", type: "text" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.username;
      const password = credentials?.password;
      if (typeof email !== "string" || typeof password !== "string") return null;
      try {
        const rows = (await sql`
          SELECT id, name, email, password_hash FROM crm_users
          WHERE lower(email) = ${email.trim().toLowerCase()} AND active = true AND password_hash IS NOT NULL
          LIMIT 1
        `) as { id: number | string; name: string | null; email: string; password_hash: string }[];
        const user = rows[0];
        if (user && verifyPassword(password, user.password_hash)) {
          return { id: String(user.id), name: user.name ?? user.email, email: user.email };
        }
      } catch (err) {
        console.error("[auth] crm_users lookup failed", err);
      }
      return null;
    },
  })
);

// Google provider is only registered once real credentials exist — the "Entrar com Google"
// button is hidden on the login page until then. No code change needed to activate later.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const providerIds = {
  hasCredentials: process.env.CRM_TEST_LOGIN_ENABLED === "true",
  hasGoogle: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/crm/login" },
  trustHost: true,
});
