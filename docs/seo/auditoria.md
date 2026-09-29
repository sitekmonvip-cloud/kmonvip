# Auditoria SEO — kmonvip.com

Setembro de 2026. Feita sobre um build de produção local do código atual (branch `claude/youthful-albattani-TTEe5`), porque o ambiente de análise não alcança o domínio publicado. Dados de campo (Search Console, CrUX) ainda pendentes: ver "O que falta".

## Resumo

| Área | Situação | Ação |
|---|---|---|
| Indexação multilíngue | Corrigido. Variantes `/en`, `/es` etc. ainda em português saem `noindex` | Liberar só após tradução revisada (F1.11) |
| Links internos | Corrigido. As 8 páginas serviço + cidade estavam órfãs | 3 páginas ainda sem link (abaixo) |
| Dados estruturados | Corrigido. Logo PNG, cidades como Service, frota como Service, BlogPosting | — |
| llms.txt, robots para IA, 404, sitemap com imagens | Publicado | — |
| Conteúdo duplicado entre cidades | Baixo risco (nenhum par acima de 12%) | — |
| Conteúdo raso | 120 a 165 palavras próprias por página de cidade/serviço | Aprofundar com informação do cliente (F2.4) |
| Velocidade da home | Desempenho 63 (laboratório) | Ver Core Web Vitals |
| Títulos longos | 6 páginas acima de 65 caracteres | Decisão de copy (Grupo B) |

## Rastreamento (F0.2)

- 37 páginas em português alcançáveis por links, todas com status 200, nenhum link interno quebrado.
- Nenhum título duplicado. Todas as páginas têm meta description, um único H1 e canonical.
- **Páginas sem nenhum link interno** (só no sitemap): `/diplomatic-transport-brazil`, `/clientes`, `/cotacao`. Resolver exige acrescentar links no menu ou rodapé (texto novo, precisa de aprovação).
- **Títulos acima de 65 caracteres** (o Google corta): `/servicos`, `/frota`, `/atuacao`, `/sobre`, `/servicos/vans-e-onibus`, `/parcerias/pousada-inacia`.
- **Descrições acima de 160 caracteres**: `/`, `/frota/suv-blindado`, `/frota/minivan-executiva`.

### Redirecionamentos das URLs antigas (F1.12)

Todos os 15 redirecionamentos de `next.config.ts` levam ao destino certo. A versão com barra final (formato do WordPress antigo, a que aparece indexada) faz 2 saltos em vez de 1 (`/x/` → `/x` → destino). O Google segue os dois sem perder relevância; reduzir para 1 salto exigiria mudar o tratamento de barra do site inteiro, então fica como está.

Pendente: cruzar com o relatório de 404 do Search Console para achar URLs antigas ainda sem redirecionamento.

## Conteúdo duplicado entre cidades (F0.3)

Sobreposição de trigramas entre as 6 páginas `/atuacao/*` e as 8 páginas serviço + cidade, com o nome da cidade neutralizado: **nenhum par acima de 12%**. O conteúdo é específico por cidade (bairros, aeroportos, setores), então o risco de ser tratado como página de porta é baixo.

O problema é volume: 120 a 165 palavras próprias por página. Aprofundar depende de informação real da operação em cada cidade.

## Core Web Vitals, laboratório (F0.5)

Lighthouse 12, perfil móvel, build local:

| Página | Desempenho | Acessibilidade | Boas práticas | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|
| `/` | 63 | 90 | 96 | 4,9 s | 0 | 670 ms | 1,9 MB |
| `/servicos/transporte-blindado` | 91 | 94 | 96 | 3,2 s | 0 | 150 ms | 356 KB |

A home já deixou de baixar os ~5 MB de vídeo dos diferenciais no carregamento. O que ainda pesa: o vídeo do hero sobre a imagem principal, o JavaScript de cliente (TBT 670 ms) e o GTM/Clarity. Próximo passo é medir os dados de campo no PageSpeed Insights de `www.kmonvip.com` antes de otimizar mais.

Itens de acessibilidade apontados nas duas páginas: contraste de cor, ordem de títulos (pula níveis), links sem texto descritivo, `role` ARIA não permitido e alvo de toque pequeno (home). Todos mexem em visual ou texto, então ficam para decisão.

Observação: com o navegador em inglês o site redireciona para `/en/...`, que é `noindex` de propósito. O Googlebot não envia idioma e recebe a versão em português, que é indexável.

## O que falta (depende do cliente ou de acesso)

1. Exportação do Search Console, 12 meses (F0.1): consultas, páginas, relatório de indexação e 404.
2. PageSpeed Insights de campo para `www.kmonvip.com` (F0.5).
3. Respostas de `docs/seo/pendencias-cliente.md` (ano de fundação, nível de blindagem, logos, nomes citados).
4. Aprovação dos textos do Grupo B (títulos, H1, links de menu).
