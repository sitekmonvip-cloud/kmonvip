# Briefings de conteúdo — aguardando aprovação e informações do cliente

Estas tarefas mudam texto do site, então só entram depois da aprovação. Cada briefing diz o que a página precisa ter e o que falta do cliente. Regra de público: termos de serviço com motorista, sem "aluguel" ou "locação" (ver `keyword-map.md`).

## F2.4 — Aprofundar as 6 páginas de serviço

Hoje cada uma tem cerca de 120 palavras de introdução, 5 destaques e 4 perguntas. Estrutura proposta, sem inventar nada:

1. Resposta direta nas primeiras linhas: o que é, para quem, onde, como contratar.
2. Como funciona a contratação, passo a passo (cotação, confirmação, briefing de rota, execução).
3. O que está incluso (motorista, combustível, espera, idiomas, escolta opcional).
4. Protocolo operacional (confidencialidade, planejamento de rota, contingência).
5. Frota recomendada, com link para `/frota/*`.
6. Cidades atendidas, com link para as páginas de serviço + cidade.
7. De 8 a 10 perguntas frequentes reais, tiradas do WhatsApp do comercial.

**Falta do cliente:** 1 hora de conversa com o operacional e o comercial, e as perguntas que os clientes mais fazem.

## F2.5 — Página pilar "Níveis de blindagem"

Explica as normas (ABNT NBR 15000, controle do Exército), a diferença entre níveis e o papel do motorista treinado. Linka para o serviço blindado e para a frota blindada.

**Falta do cliente:** nível real da frota e certificadora (item 2 de `pendencias-cliente.md`).

## F2.6 — Página de preço ("quanto custa")

**Decisão necessária.** Pela sua observação sobre público desqualificado, uma página de preço pode atrair quem só compara valor. Alternativa sugerida: em vez de valores, uma seção "Como é calculado o investimento" (cidade, veículo, horas, escolta, idiomas), terminando na cotação. Sem faixas de preço, a menos que o cliente queira.

## F2.7 — Transfer por aeroporto

Uma seção por aeroporto na página de transfers (BSB, GRU/CGH, GIG/SDU), com o ponto de encontro por terminal e o tempo médio até os polos corporativos. Página própria por aeroporto só se houver informação única suficiente.

**Falta do cliente:** pontos de encontro reais e o procedimento de receptivo em cada aeroporto.

## F2.8 e F1.11 — Conteúdo em inglês

O código já está pronto para liberar as páginas traduzidas: é só incluir o caminho em `src/lib/seo/i18n-status.ts`. Prioridade: diplomático, blindado, transfers, Brasília e SUV blindado.

**Falta:** tradução revisada por falante nativo. Tradução automática sem revisão não deve ser indexada.

## F2.10 — Sinais de confiança em /sobre e /clientes

Razão social e CNPJ, endereço da sede, liderança com nome e foto, tamanho real da frota, certificações, depoimentos com autorização.

**Falta do cliente:** itens 1, 2 e 4 de `pendencias-cliente.md`.

## F2.11 — Links internos (parte de texto)

Já feito sem mudar texto: os cards de serviço e de cidade agora levam às 8 páginas serviço + cidade, que estavam sem links.

**Aprovação necessária:** incluir links no menu ou rodapé para `/diplomatic-transport-brazil`, `/clientes` e `/cotacao`, as 3 páginas que ainda não recebem links internos.

## F2.12 — Conteúdo que as IAs citam

Aplicado junto com o F2.4: bloco de resposta direta no início de cada página, definições claras, tabelas comparativas (sedan × SUV blindado; hora × diária × contrato mensal) e fatos datados confirmados. O `llms.txt` já está publicado e se atualiza sozinho com essas mudanças.

## Grupo B — Títulos e H1 (refazer sem "aluguel")

Nova proposta a apresentar para aprovação, mirando as palavras P1 de `keyword-map.md` e encurtando os 6 títulos acima de 65 caracteres apontados em `auditoria.md`.
