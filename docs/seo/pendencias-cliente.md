# Pendências para o cliente (KMON VIP)

Informações que já estão publicadas no site, mas precisam de confirmação antes de virar reforço de SEO (dados estruturados, títulos, llms.txt, pautas). Nada aqui deve ser ampliado nem repetido em conteúdo novo sem resposta.

Levantado do código em setembro de 2026 (`src/lib/seo/constants.ts`, `src/components/*`, `src/app/[locale]/sobre/*`).

## 1. Dados da empresa

- [ ] **Ano de fundação.** O código usa `BRAND_FOUNDED = "1990"` marcado como `TODO: confirm` e o texto repete "35 anos" (cerca de 15 ocorrências) e "desde 1990". Confirmar o ano e se "35 anos" é a idade da empresa ou a experiência do fundador.
- [ ] **Razão social e CNPJ.** Hoje o schema usa `legalName: "KMON VIP Transporte Executivo"`. Confirmar o nome exato e informar o CNPJ para o schema (`identifier`) e para a página Sobre.
- [ ] **Endereço da sede em Brasília.** O schema LocalBusiness tem só a cidade. Sem rua e CEP, o Google Business Profile e o schema local ficam incompletos.
- [ ] **Endereço físico em outras cidades.** Hoje só Brasília é tratada como sede. Se houver base física em SP, RJ, BH, Manaus ou Belém, informar o endereço, porque isso permite perfil próprio no Google em cada cidade.

## 2. Frota e segurança

- [ ] **Nível de blindagem.** O site diz "blindagem certificada contra armamento de alta velocidade", sem nível (ex.: III-A) nem certificadora. Informar o nível real por veículo e quem certifica (registro no Exército da blindadora).
- [ ] **Tamanho da frota.** Quantos veículos por categoria e por cidade. É um dado forte de confiança e hoje não aparece.
- [ ] **Treinamento dos motoristas.** Qual curso (direção defensiva/evasiva, instituição, carga horária), para citar com precisão.

## 3. Nomes e eventos citados

Publicados em FAQs e na linha do tempo (`Authority.tsx`, `sobre/historia`). Confirmar para cada um: a operação aconteceu, a KMON pode citar publicamente, e a foto usada tem autorização.

- [ ] Barack Obama e Hillary Clinton (2011)
- [ ] Joe Biden
- [ ] Jair Bolsonaro (2019)
- [ ] Mike Tyson (2019)
- [ ] Lewis Hamilton (2022)
- [ ] Turnês The Killers e Red Hot Chili Peppers
- [ ] Copa do Mundo 2014, Olimpíadas Rio 2016, Copa América 2019, GP Brasil de F1
- [ ] G20 Brasil 2024 e COP 30 2025. Qual foi o papel da KMON (fornecedora contratada, subcontratada, atendimento a delegações específicas)?

## 4. Logos exibidos no site

- [ ] **Clientes:** ESPN, Google, Live ABA, Microsoft, Shell, XP Investimentos. Existe autorização para exibir esses logos?
- [ ] **Selos de confiança:** FIFA, G20, COP 30 e ONU. O uso desses emblemas é restrito (o da ONU em especial) e pode passar a ideia de endosso oficial. Confirmar a autorização ou trocar por texto ("Operação na COP 30, Belém 2025").

## 5. Para a próxima fase de conteúdo

- [ ] Faixas de preço "a partir de" (hora, diária, mensal), se a empresa aceitar publicar (página de preços).
- [ ] Casos publicáveis, com autorização do cliente atendido.
- [ ] Depoimentos reais com nome, cargo e empresa.
- [ ] Uma conversa de 1h com o operacional para os guias de aeroporto e de protocolo.
- [ ] Logotipo: o slogan no arquivo `logo SVG KMON preta.svg` está escrito "CARRYNG AROUND THE WORLD" (falta o "I" de "CARRYING").
