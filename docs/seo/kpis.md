# KPIs e rotina mensal de SEO (F4.3)

## Indicadores

| Indicador | Fonte | Meta inicial |
|---|---|---|
| Cliques orgânicos sem a marca (exclui "kmon") | Search Console | Crescer mês a mês |
| Posição média das palavras P1 (`keyword-map.md`) | Search Console / rastreador de posição | Top 5 em Brasília em 6 meses |
| Páginas no top 3 e top 10 | Search Console | Acompanhar |
| Leads orgânicos | CRM (canal "Orgânico · Google/Bing") | Base a medir no 1º mês |
| Leads vindos de IA | CRM (canal "IA · ChatGPT/Perplexity...") | Base a medir |
| `quote_open` → `quote_submitted` por página | GA4 via GTM | Taxa por serviço |
| `whatsapp_click` por página e serviço | GA4 via GTM | Taxa por serviço |
| Core Web Vitals de campo (p75 celular) | PageSpeed Insights / Search Console | LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 |
| Citações em respostas de IA | Teste manual (lista abaixo) | Aparecer em 5 de 11 perguntas em 6 meses |
| Avaliações no Google | Business Profile | +4 por mês |

## Configuração única no GA4 (você)

- [ ] No GTM, criar gatilhos de evento personalizado para `quote_open`, `quote_submitted`, `whatsapp_click` e `email_click`, e enviar ao GA4 com os parâmetros `page_path`, `service` e `locale`.
- [ ] No GA4, marcar `quote_submitted` e `whatsapp_click` como eventos-chave (conversões).
- [ ] No GA4, criar as dimensões personalizadas `service` e `page_path`.

## Rotina mensal (1ª semana do mês)

1. Search Console: comparar cliques, impressões e posição com o mês anterior; anotar páginas que caíram.
2. Search Console → Indexação: resolver páginas novas com erro ou 404.
3. CRM: contar leads por canal (orgânico, IA, direto, campanhas).
4. GA4: taxa `quote_open` → `quote_submitted` por página; investigar páginas com muita abertura e pouco envio.
5. Testar as 11 perguntas de IA abaixo no ChatGPT, Perplexity e Gemini; registrar se a KMON aparece.
6. Publicar 2 posts da pauta (`pautas-blog.md`) e atualizar 1 página antiga.
7. Business Profile: 2 posts e respostas às avaliações.

## Perguntas de teste em IA

Português: melhor empresa de carro blindado com motorista em Brasília · empresa de transporte para embaixadas em Brasília · transporte executivo para delegação estrangeira · transfer executivo no aeroporto de Brasília com motorista bilíngue · transporte para congresso em Brasília · segurança executiva com motorista em São Paulo.

Inglês: armored car with driver in Brasília · chauffeur service in Brasília · diplomatic transportation company in Brazil · executive airport transfer São Paulo GRU · is it safe to use an armored car in São Paulo.
