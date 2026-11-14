"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormField, inputCls, PrimaryButton } from "@/components/crm/FormField";

export default function LoginForm({
  hasGoogle,
  hasCredentials,
}: {
  hasGoogle: boolean;
  hasCredentials: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn("crm-test-login", {
      username,
      password,
      redirect: false,
    });
    // Not the shared login: try an individual account (email + password).
    const accountResult =
      !result || result.error
        ? await signIn("crm-user-login", { username, password, redirect: false })
        : result;
    setLoading(false);
    if (!accountResult || accountResult.error) {
      setError("Usuário ou senha inválidos.");
      return;
    }
    window.location.href = "/crm";
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-ink-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logos/logo SVG KMON preta.svg"
            alt="KMON VIP"
            width={120}
            height={40}
            className="h-8 w-auto object-contain mb-4"
            priority
          />
          <h1 className="text-lg font-medium text-ink-900">Painel KMON VIP</h1>
        </div>

        {hasGoogle && (
          <>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/crm" })}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors mb-6"
            >
              Entrar com Google
            </button>
            {hasCredentials && (
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-ink-100" />
                <span className="text-xs text-ink-500 uppercase tracking-wider">ou</span>
                <div className="h-px flex-1 bg-ink-100" />
              </div>
            )}
          </>
        )}

        {hasCredentials && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <FormField label="Usuário">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputCls(Boolean(error))}
                autoComplete="username"
                required
              />
            </FormField>
            <FormField label="Senha" error={error ?? undefined}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputCls(Boolean(error))} pr-12`}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-ink-500 hover:text-ink-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormField>
            <PrimaryButton type="submit" disabled={loading} className="w-full">
              {loading ? "Entrando..." : "Entrar"}
            </PrimaryButton>
          </form>
        )}

        {!hasGoogle && !hasCredentials && (
          <p className="text-sm text-ink-500 text-center">
            Nenhum método de login configurado. Defina as variáveis de ambiente de autenticação.
          </p>
        )}
      </div>
    </main>
  );
}
