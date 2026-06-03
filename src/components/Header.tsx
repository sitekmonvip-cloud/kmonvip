"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Início", href: "#" },
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Frota", href: "#frota" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-5 pt-4">
        <nav className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white/80 backdrop-blur-xl px-6 py-3.5 shadow-sm">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/logo SVG KMON preta.svg"
              alt="KMON VIP"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm text-ink-700 transition-colors hover:text-ink-900 after:absolute after:left-0 after:right-full after:bottom-[-4px] after:h-px after:bg-ink-900 after:transition-all hover:after:right-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#cotacao"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-paper transition-all hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Solicitar cotação
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1 w-4">
              <span
                className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 bg-ink-900 text-paper z-40 flex flex-col transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Image
            src="/images/logos/logo SVG KMON preta.svg"
            alt="KMON VIP"
            width={100}
            height={33}
            className="h-7 w-auto object-contain invert"
          />
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 border border-white/10"
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-6 pt-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/[0.08] text-2xl font-medium tracking-tight hover:translate-x-1 transition-transform"
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              {link.label}
              <span className="opacity-40 text-lg">&rarr;</span>
            </a>
          ))}
        </div>
        <div className="px-6 pb-8">
          <a
            href="#cotacao"
            onClick={() => setOpen(false)}
            className="block w-full text-center rounded-full bg-paper text-ink-900 py-4 font-medium text-sm"
          >
            Solicitar cotação
          </a>
        </div>
      </div>
    </header>
  );
}
