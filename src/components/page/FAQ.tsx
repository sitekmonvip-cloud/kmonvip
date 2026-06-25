"use client";

import { useState } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/components/seo/schemas";

type Props = {
  faqs: { q: string; a: string }[];
  heading?: string;
};

export default function FAQ({ faqs, heading = "Perguntas Frequentes" }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-10 text-center">
            {heading}
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const open = openIdx === i;
              return (
                <article
                  key={i}
                  className={`rounded-xl border transition-all ${
                    open
                      ? "border-ink-900 bg-ink-900 text-paper"
                      : "border-ink-100 bg-paper hover:border-ink-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                    aria-expanded={open}
                  >
                    <h3 className={`text-base font-medium tracking-tight ${open ? "text-paper" : "text-ink-900"}`}>
                      {f.q}
                    </h3>
                    <span
                      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-brand-champagne" : "text-ink-500"}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-400 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`px-5 pb-5 text-sm leading-relaxed ${open ? "text-white/75" : "text-ink-500"}`}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
