# Mapa de palavras-chave — KMON VIP

Uma palavra-chave principal por URL; as variantes entram no texto da mesma página. Prioridade por intenção de contratação e peso do serviço, não por volume (volumes a validar no Keyword Planner e no Search Console).

## Regra de público

**Não usar "aluguel" nem "locação" como alvo.** Esses termos atraem quem quer alugar o carro para dirigir (público de locadora), não quem contrata serviço com motorista e protocolo. Os alvos são termos de **serviço**: "com motorista", "transporte executivo", "segurança executiva", "diplomático", "para embaixadas".

Termos negativos (não perseguir, e negativar em campanhas pagas): aluguel, locação, alugar, locadora, sem motorista, barato, preço de blindagem, blindar carro, comprar blindado.

## Mapa

| Prioridade | Palavra-chave principal | Variantes | Página dona |
|---|---|---|---|
| P1 | transporte executivo blindado | transporte blindado com motorista, transporte VIP blindado | `/servicos/transporte-blindado` |
| P1 | carro blindado com motorista Brasília | transporte blindado Brasília, blindado com motorista DF | `/servicos/transporte-blindado/brasilia` |
| P1 | carro blindado com motorista São Paulo | transporte blindado SP, segurança executiva SP | `/servicos/transporte-blindado/sao-paulo` |
| P1 | carro blindado com motorista Rio de Janeiro | transporte blindado Rio | `/servicos/transporte-blindado/rio-de-janeiro` |
| P1 | transporte executivo Brasília | motorista executivo Brasília, carro executivo com motorista DF | `/servicos/transporte-executivo/brasilia` |
| P1 | transporte executivo São Paulo | motorista executivo SP | `/servicos/transporte-executivo/sao-paulo` |
| P1 | transporte executivo com motorista | chofer executivo, carro executivo com motorista | `/servicos/transporte-executivo` |
| P1 | transporte para embaixadas | transporte diplomático, frota para corpo diplomático | `/servicos/transporte-diplomatico` |
| P1 | transporte diplomático Brasília | transporte para delegações, motorista diplomático | `/servicos/transporte-diplomatico/brasilia` |
| P1 | transfer executivo aeroporto Brasília | receptivo aeroporto BSB, traslado executivo Brasília | `/servicos/transfers-executivos` |
| P1 | transporte para eventos Brasília | transporte para congressos Brasília | `/servicos/eventos-e-congressos/brasilia` |
| P1 | armored car with driver Brazil | armored car service Brasília, chauffeur Brasília | `/diplomatic-transport-brazil` e páginas EN após tradução |
| P1 | kmon vip | kmon transporte | `/` |
| P2 | segurança executiva com motorista | motorista de segurança, escolta executiva | `/servicos/transporte-blindado` |
| P2 | SUV blindado com motorista | — | `/frota/suv-blindado` |
| P2 | sedan blindado com motorista | — | `/frota/sedan-blindado` |
| P2 | transporte executivo Rio de Janeiro | motorista executivo RJ | `/servicos/transporte-executivo/rio-de-janeiro` |
| P2 | transporte corporativo Brasília | contrato mensal de motorista executivo | `/servicos/transporte-executivo/brasilia` |
| P2 | van executiva com motorista | transporte para grupos, delegações | `/servicos/vans-e-onibus` |
| P2 | transfer executivo Guarulhos / Galeão | receptivo GRU, receptivo GIG | `/servicos/transfers-executivos` |
| P2 | níveis de blindagem | blindagem III-A | página pilar a criar (F2.5) |
| P3 | transporte executivo Belo Horizonte / Manaus / Belém | — | `/atuacao/*` |

## Canibalização

| Palavra-chave | Conflito | Dono |
|---|---|---|
| transporte executivo Brasília / SP / Rio | `/atuacao/<cidade>` × `/servicos/transporte-executivo/<cidade>` | página de serviço + cidade; `/atuacao` vira resumo da cidade |
| blindado para diplomatas | blindado × frota × diplomático | `/servicos/transporte-diplomatico/brasilia` |
| ônibus para congresso | `/servicos/vans-e-onibus` × `/frota/onibus-premium` | serviço; a frota fica com o modelo |

Os títulos e H1 que resolvem esses conflitos estão pendentes de aprovação de copy (Grupo B), agora sem "aluguel".
