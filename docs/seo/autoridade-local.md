# Autoridade local e reputação — checklists (Fase 3)

Tarefas feitas fora do código. Cada item diz quem executa.

## F3.1 — Google Business Profile da sede (cliente)

- [ ] Reivindicar ou verificar o perfil em business.google.com com o endereço real da sede em Brasília.
- [ ] Categoria principal: testar "Serviço de motorista" e "Serviço de transporte executivo" e manter a que aparece no mapa para "carro blindado com motorista Brasília".
- [ ] Área de atendimento: DF e cidades onde há operação real.
- [ ] Serviços cadastrados um a um (executivo, blindado, diplomático, transfer, eventos, vans), com o link da página correspondente.
- [ ] Mínimo de 20 fotos reais: frota, motoristas uniformizados, sede.
- [ ] Horário 24h, telefone e site idênticos aos do site.
- [ ] Um post a cada 15 dias (evento atendido, novidade de frota).
- [ ] Perfis em outras cidades **só** se houver endereço físico real (pendência do cliente).

## F3.2 — Avaliações (cliente)

- [ ] Gerar o link curto de avaliação no perfil do Google.
- [ ] Após cada serviço concluído, o comercial envia o link por WhatsApp, só para clientes que aceitam ser identificados. Nunca para diplomatas ou autoridades sem consentimento.
- [ ] Responder 100% das avaliações em até 48h.
- [ ] Proibido: comprar avaliações, avaliar a si mesmo, oferecer desconto em troca.

## F3.3 — Consistência de nome, endereço e telefone (você ou cliente)

Usar exatamente o mesmo nome ("KMON VIP"), endereço e telefone (+55 61 99863-0303) em:

- [ ] Bing Places (importar do Google)
- [ ] Apple Business Connect
- [ ] Waze
- [ ] LinkedIn da empresa
- [ ] Instagram e Facebook
- [ ] Cadastro no CNPJ
- [ ] Associações do setor e câmaras de comércio bilaterais que embaixadas consultam

Sem diretórios pagos de baixa qualidade.

## F3.4 — Links de autoridade (cliente + você)

- [ ] Parceiros com link natural para o site: hotéis de alto padrão, centros de convenção, organizadores de eventos, agências de turismo corporativo (modelo já existente com a Pousada Inácia).
- [ ] Pautas para imprensa de negócios e de segurança corporativa, com dados próprios e autorização.
- [ ] Menções à KMON VIP sem link: pedir a inclusão do link.
- [ ] Proibido: comprar links, redes de blogs, troca de links em massa.

## F3.5 — Entidade da marca (você)

- [ ] O mesmo nome, logo e descrição em todos os perfis oficiais.
- [ ] Todos os perfis oficiais listados no schema Organization (`sameAs` em `src/components/seo/schemas.ts`). Hoje: Instagram e LinkedIn.
- [ ] Buscar "kmon vip" no Google: se houver painel da empresa, reivindicar.

## F1.10 — Bing (você, 5 minutos)

- [ ] bing.com/webmasters → entrar → "Importar do Google Search Console".
- [ ] Enviar o sitemap `https://www.kmonvip.com/sitemap.xml`.
- O aviso automático de posts novos (IndexNow) já está no código.
