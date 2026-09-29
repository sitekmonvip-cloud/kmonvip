import {
  SITE_URL,
  SITE_NAME,
  BRAND_PHONE,
  BRAND_EMAIL,
  services,
  cities,
  fleet,
  crossPages,
} from "./constants";
import type { BlogPostRow } from "@/lib/crm/blogTypes";

// Built from the same constants that render the pages, so llms.txt never drifts from the site.
const url = (path: string) => `${SITE_URL}${path}`;

type PostLink = Pick<BlogPostRow, "slug" | "title" | "excerpt">;

export function buildLlmsTxt({ full, posts }: { full: boolean; posts: PostLink[] }): string {
  const out: string[] = [];

  out.push(`# ${SITE_NAME}`);
  out.push("");
  out.push(
    "> Empresa brasileira de transporte executivo, blindado e diplomático com motorista, sediada em Brasília (DF). " +
      "Atende executivos, autoridades, embaixadas, delegações estrangeiras e grandes eventos em Brasília, São Paulo, Rio de Janeiro, Belo Horizonte, Manaus e Belém.",
  );
  out.push("");
  out.push(
    "A KMON VIP opera 24 horas, com motoristas treinados em protocolo executivo e atendimento em português, inglês e espanhol. " +
      "A contratação é por hora, diária, evento ou contrato mensal, com cotação personalizada.",
  );
  out.push("");

  out.push("## Serviços");
  out.push("");
  for (const s of services) {
    out.push(`- [${s.name}](${url(`/servicos/${s.slug}`)}): ${s.meta.description}`);
  }
  out.push("");

  out.push("## Serviços por cidade");
  out.push("");
  for (const c of crossPages) {
    out.push(`- [${c.meta.title}](${url(`/servicos/${c.serviceSlug}/${c.citySlug}`)}): ${c.meta.description}`);
  }
  out.push("");

  out.push("## Cidades atendidas");
  out.push("");
  for (const c of cities) {
    out.push(`- [${c.name} (${c.region})](${url(`/atuacao/${c.slug}`)}): ${c.meta.description}`);
  }
  out.push("");

  out.push("## Frota");
  out.push("");
  for (const f of fleet) {
    out.push(`- [${f.name}](${url(`/frota/${f.slug}`)}): ${f.specs.model}, ${f.specs.passengers}.`);
  }
  out.push("");

  if (posts.length) {
    out.push("## Blog");
    out.push("");
    for (const p of posts) {
      out.push(`- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`);
    }
    out.push("");
  }

  out.push("## Empresa e contato");
  out.push("");
  out.push(`- [Sobre a KMON VIP](${url("/sobre")})`);
  out.push(`- [Clientes](${url("/clientes")})`);
  out.push(`- [Diplomatic transport in Brazil (English)](${url("/en/diplomatic-transport-brazil")})`);
  out.push(`- [Contato](${url("/contato")}): WhatsApp e telefone ${BRAND_PHONE}, e-mail ${BRAND_EMAIL}, atendimento 24h.`);
  out.push(`- [Solicitar cotação](${url("/cotacao")})`);

  if (full) {
    for (const s of services) {
      out.push("");
      out.push(`## ${s.name}`);
      out.push("");
      out.push(`Página: ${url(`/servicos/${s.slug}`)}`);
      out.push("");
      out.push(s.intro);
      out.push("");
      for (const f of s.features) out.push(`- **${f.title}:** ${f.desc}`);
      out.push("");
      out.push("### Perguntas frequentes");
      for (const q of s.faqs) {
        out.push("");
        out.push(`**${q.q}**`);
        out.push(q.a);
      }
    }
  }

  return out.join("\n") + "\n";
}

export function llmsResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
