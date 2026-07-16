import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { timingSafeEqual } from "crypto";

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
