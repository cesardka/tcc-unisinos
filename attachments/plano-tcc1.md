<!--
Snapshot do plano de trabalho do TCC I.
Última atualização: 2026-06-03
Fonte de verdade (working copy): ~/.windsurf/plans/tcc1-cardapio-digital-418d03.md

Este documento registra as decisões tomadas durante a fase de planejamento
do TCC I, antes da redação do pré-projeto. Sirva como referência rápida
para você, para o orientador e para o TCC II.
-->

# Plano de entrega do TCC I — Cardápios digitais em bares e restaurantes de Porto Alegre

Refinar o tema para um **estudo de caso técnico-empírico** com escopo "cardápio digital + autoatendimento via QR Code", e produzir, em menos de 1 mês, o pré-projeto (TCC I) em LaTeX já preparado para a execução em TCC II (2026/2).

---

## 1. Refinamento do tema (proposta concreta)

**Título de trabalho sugerido** (substitui o atual em `main.tex`):

> _"Cardápios digitais com autoatendimento em bares e restaurantes de Porto Alegre: um estudo de caso sobre adoção, motivações e desafios pós-2020"_

**Pergunta de pesquisa central:**

> Como bares e restaurantes de Porto Alegre que adotaram cardápios digitais com autoatendimento (via QR Code/web app) desde 2020 percebem benefícios, riscos e desafios técnicos e operacionais dessa transição, e como clientes vivenciam essa nova interação?

**Recorte (para caber em TCC):**

- **Geográfico:** Porto Alegre/RS, com no máximo 2-3 bairros (ex.: Cidade Baixa, Moinhos de Vento, Centro Histórico).
- **Temporal:** adoções/transformações ocorridas entre **mar/2020 e 2026** (mas com foco analítico em "antes/depois" da pandemia).
- **Funcional:** apenas cardápio digital + autoatendimento pelo celular do cliente (não inclui KDS, integração com iFood/delivery, ERP).
- **Sujeitos:** 1-3 estabelecimentos como estudos de caso + survey complementar com frequentadores.

**Objetivo geral:**
Analisar, por meio de estudo de caso múltiplo, como o uso de cardápios digitais com autoatendimento impacta a operação de bares e restaurantes de Porto Alegre e a experiência de seus clientes.

**Objetivos específicos (rascunho):**

- a) Caracterizar o estado da arte sobre cardápios digitais, QR menus e self-ordering em food service.
- b) Levantar, com gestores de 1-3 estabelecimentos, as motivações, custos e desafios técnicos da adoção.
- c) Coletar, via formulário, a percepção de frequentadores quanto a usabilidade, confiança e preferências.
- d) Confrontar percepção do estabelecimento × percepção do cliente, destacando convergências e tensões.
- e) Discutir aspectos técnicos transversais: UX em mobile web, LGPD, acessibilidade, dependência de conectividade.

**Justificativa "Ciência da Computação":** ainda que o método central seja empírico, o objeto é tecnológico (web app, QR Code, design de interação móvel, LGPD) e os achados podem orientar requisitos de software — o que sustenta a relação com CC.

---

## 2. Estrutura do PDF a entregar no TCC I

Estrutura **exata** do modelo UNISINOS (do sumário fornecido):

**1 INTRODUÇÃO** _(4-6 páginas)_

- **1.1 Tema** — apresentação geral do assunto (digitalização do food service pós-2020).
- **1.2 Delimitação do tema** — recortes geográfico (Porto Alegre, 2-3 bairros), temporal (2020-2026), funcional (cardápio digital + autoatendimento via QR/web, sem KDS/delivery) e de sujeitos (gestores de 1-3 estabelecimentos + frequentadores).
- **1.3 Problema** — formulado como pergunta única: _"Como bares e restaurantes de Porto Alegre que adotaram cardápios digitais com autoatendimento desde 2020 percebem os benefícios, riscos e desafios dessa transição, e como seus clientes vivenciam essa interação?"_
- **1.4 Objetivos**
  - **1.4.1 Objetivo geral** — analisar o impacto técnico, operacional e na experiência do cliente da adoção de cardápios digitais com autoatendimento.
  - **1.4.2 Objetivos específicos** — (a) caracterizar estado da arte; (b) levantar motivações/custos/desafios com gestores; (c) coletar percepção dos frequentadores; (d) confrontar percepções; (e) discutir UX mobile, LGPD, acessibilidade.
- **1.5 Justificativa** — relevância prática (setor, pós-pandemia) + relevância para Ciência da Computação (UX mobile, QR Code, LGPD, requisitos de software).

**2 FUNDAMENTAÇÃO TEÓRICA** _(8-10 páginas)_

Subcapítulos sugeridos:

- **2.1 Transformação digital no setor de food service** — conceito de TD, impacto da pandemia COVID-19 no setor.
- **2.2 Cardápios digitais e QR Code** — tipos (PDF, web app, app nativo), arquiteturas, histórico.
- **2.3 Autoatendimento e experiência do usuário em mobile** — UX, acessibilidade, fricções típicas.
- **2.4 LGPD aplicada a restaurantes** — coleta de dados via cardápio digital, consentimento.
- **2.5 Trabalhos relacionados** — 4-8 trabalhos (TCCs, dissertações, artigos) com quadro comparativo (foco, método, recorte, lacuna). _Entra aqui como subseção, já que o modelo UNISINOS não tem capítulo separado._

**3 METODOLOGIA** _(5-7 páginas)_

Subcapítulos sugeridos:

- **3.1 Caracterização da pesquisa** — qualitativa-quantitativa, descritiva-exploratória, estudo de caso múltiplo.
- **3.2 Etapas da pesquisa** — fluxograma do TCC I → TCC II.
- **3.3 Instrumentos de coleta**
  - **3.3.1 Entrevista semiestruturada com gestores** — roteiro completo no Apêndice A.
  - **3.3.2 Questionário com frequentadores** — instrumento completo no Apêndice B.
- **3.4 Critérios de seleção dos estabelecimentos** — porte, localização, tempo de adoção.
- **3.5 Plano de análise** — análise de conteúdo (Bardin) para qualitativo + estatística descritiva para quantitativo.
- **3.6 Aspectos éticos** — TCLE, LGPD, necessidade (ou não) de submissão CEP.

**4 CRONOGRAMA** _(1-2 páginas)_

- Tabela com atividades × meses de 2026/2 (piloto → coleta → transcrição → análise → escrita → revisão → defesa).

**REFERÊNCIAS** — 20+ entradas, mix nacional/internacional, ABNT via `abntex2cite`.

**APÊNDICE A — Roteiro de entrevista (gestores)**
**APÊNDICE B — Questionário (frequentadores)**
**APÊNDICE C — Termo de Consentimento Livre e Esclarecido (TCLE)**

> Meta de extensão TCC I: **18 a 25 páginas** de conteúdo (sem contar pré-textuais e refs).

---

## 3. Checklist de execução

### Fundação e limpeza do template

- [ ] Atualizar metadados em `main.tex`: título, subtítulo, palavras-chave, ano (já está 2026; revisar se TCC I é entregue em 2026/1).
- [ ] Reestruturar `main.tex` para o sumário UNISINOS: **1 Introdução** (1.1-1.5), **2 Fundamentação Teórica** (2.1-2.5), **3 Metodologia** (3.1-3.6), **4 Cronograma**, **Referências**, **Apêndices A/B/C**.
- [ ] Remover capítulos-exemplo (`Escrevendo o Texto`, `Mais um capítulo`).
- [ ] Escrever resumo (placeholder de 150 palavras com pergunta + método + entrega esperada).
- [ ] Garantir build limpo (`latexmk` ou rotina atual) sem warnings críticos.
- [ ] Levantar 15-20 referências iniciais (Google Scholar, ACM, BDTD, SciELO) — termos: "QR menu", "digital menu adoption", "self-ordering restaurant", "transformação digital restaurantes", "COVID-19 restaurant technology".

### Introdução + Fundamentação

- [ ] Redigir Introdução completa (contexto pós-2020, problema, objetivos, justificativa CC, delimitação).
- [ ] Redigir Fundamentação Teórica em 3-4 seções (transformação digital no varejo de alimentação; QR Code e mobile menus; UX e acessibilidade; LGPD aplicada).
- [ ] Encerrar a semana com 10-12 páginas escritas.

### Trabalhos relacionados + Metodologia

- [ ] Selecionar e fichar 4-8 trabalhos relacionados; produzir quadro comparativo (eixos: foco, método, recorte geográfico, lacuna).
- [ ] Redigir capítulo de Metodologia: tipo de pesquisa, fases, instrumentos, amostragem, análise, riscos éticos.
- [ ] Esboçar **roteiro de entrevista** (10-12 perguntas semiestruturadas para gestores).
- [ ] Esboçar **questionário** (Google Forms) para frequentadores — 12-18 perguntas, mix Likert + abertas.
- [ ] Incluir ambos como Apêndice.

### Cronograma, polimento e revisão

- [ ] Montar **cronograma de TCC II** em tabela LaTeX (meses × atividades: piloto, coleta, transcrição, análise, escrita, revisão, defesa).
- [ ] Revisar coerência geral, objetivos × metodologia × cronograma.
- [ ] Revisar normas ABNT (citações, figuras, tabelas).
- [ ] Reescrever o resumo definitivo.
- [ ] Gerar PDF final e fazer leitura cega de revisão (idealmente com 1-2 dias de descanso entre revisão e submissão).
- [ ] Postar no Moodle até a 18ª semana.

---

## 4. Critérios de seleção dos casos

**Amostragem intencional (não probabilística) de 2 a 3 estabelecimentos**, estratificada por perfil:

| Perfil                            | Descrição                                                              | Por que incluir                                      |
| --------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| **A. Pré-2020 que adotou**        | Aberto antes de mar/2020 e fez transição para cardápio digital         | Eixo central: comparação antes/depois real           |
| **B. Pré-2020 que resistiu**      | Aberto antes de mar/2020 e mantém cardápio físico (ou adoção parcial)  | Contraponto: barreiras e razões para NÃO digitalizar |
| **C. Pós-2020 "nascido digital"** | Aberto após mar/2020 e já operando com cardápio digital desde o início | Perspectiva de quem nunca conheceu outro modelo      |

**Composição recomendada:** 1×A + 1×B **ou** 1×A + 1×C. Se 3 casos: um de cada perfil.

**Critérios de inclusão:**

- (i) bar, restaurante ou híbrido em operação regular em Porto Alegre;
- (ii) porte pequeno ou médio (até ~50 mesas / até 30 funcionários);
- (iii) tomador de decisão (proprietário/sócio/gerente sênior) acessível para entrevista de 45-60 min;
- (iv) ao menos 1 caso de perfil A entre os selecionados.

**Critérios de exclusão:**

- redes franqueadas grandes (decisão é da matriz);
- alta gastronomia / fine dining (raramente usa cardápio digital);
- operações exclusivamente delivery / dark kitchens (sem experiência presencial).

**Implicação para o instrumento:** o roteiro de entrevista será **modular**, com blocos comuns (caracterização, percepção do cliente) e blocos específicos por perfil (trajetória de transição, resistência, operação digital). Isso permite análise _cross-case_ sem perder profundidade.

---

## 5. Onde buscar os casos e contatos

**Associações setoriais (prioridade alta):**

- **ABRASEL-RS** (`abrasel.com.br/rs`) — principal entidade do setor, pode indicar associados e fornece dados secundários (Panorama do Setor).
- **SindHA-RS** — sindicato patronal de hotéis, restaurantes e bares.
- **Fecomércio-RS / SESC-SENAC-RS** — relatórios setoriais e capacitações.

**Outras fontes de contato:**

- **SEBRAE-RS** — programas como ALI (Agente Local de Inovação) com bares e restaurantes; fonte rica para perfis B e C.
- **Fornecedores de cardápio digital** (Goomer, Menew, QRPedido, Abrahão, Anota AI) — pedir indicação de cases em POA; topam por interesse de marketing.
- **Coletivos gastronômicos de bairro** — Cidade Baixa, Moinhos de Vento, 4º Distrito.
- **Mídia local** (GZH, Jornal NH, Bom Gourmet) — mapear cases já noticiados de digitalização pós-pandemia.
- **LinkedIn** — busca por "proprietário/sócio + restaurante + Porto Alegre".
- **Rede do orientador** — perguntar diretamente ao Prof. Lacerda; ajuda a engajá-lo.

**Estratégia de abordagem (a executar logo no início do TCC II):**

1. E-mail formal à ABRASEL-RS apresentando a pesquisa + carta da universidade, pedindo (a) acesso a relatórios, (b) indicação de 5-8 estabelecimentos receptivos.
2. Em paralelo: contato com 2-3 fornecedores de cardápio digital para indicações de cases.
3. Fallback: abordagem direta presencial em bairros-alvo se não houver retorno em 2 semanas.

> **Ação ainda no TCC I:** registrar nominalmente uma **lista inicial de 5-8 estabelecimentos-alvo** (mesmo que ainda não confirmados) e, idealmente, ter **1 contato pré-validado por escrito** — isso mitiga muito o risco de travamento na coleta em 2026/2.

---

## 6. Instrumentos de coleta (rascunhos)

> Os textos completos abaixo serão incorporados aos **Apêndices A, B e C** do `main.tex`.

### 6.1 Roteiro de entrevista — gestores (Apêndice A)

Estrutura **modular**, 45-60 min, gravado mediante TCLE. Cada bloco tem 2-4 perguntas-âncora; entrevistador aprofunda com "por quê?" e "me dá um exemplo".

- **Bloco 0 — Caracterização** _(todos)_ — história, papel, porte, formato atual de cardápio.
- **Bloco 1 — Trajetória de adoção** _(perfis A e B)_ — como era antes de 2020; o que mudou; motivação; processo de transição; razões de adoção/resistência.
- **Bloco 2 — Operação atual com digital** _(perfis A e C)_ — ferramenta/fornecedor, atualização de itens, custos, problemas técnicos, impacto operacional.
- **Bloco 3 — Resistência / barreiras** _(perfil B)_ — receios, expectativa de reação do cliente, gatilhos para futura adoção.
- **Bloco 4 — Percepção do cliente** _(todos)_ — feedback recebido, diferenças entre grupos, uso de dados de cardápio digital.
- **Bloco 5 — Olhar para frente** _(todos)_ — projeção 5 anos, o que mudaria hoje, ponto livre.

> **Aplicar piloto** com 1 entrevistado antes da coleta oficial — revela perguntas ambíguas ou redundantes.

### 6.2 Questionário — frequentadores (Apêndice B)

- **Distribuição:** redes sociais, grupos de WhatsApp/Telegram, lista do orientador/universidade, opcionalmente QR Code nos estabelecimentos do estudo de caso.
- **Não amarrar aos casos:** o survey pesquisa frequentadores de bares/restaurantes de POA em geral.
- **Meta:** mínimo 80 respostas, ideal 150+. Tempo-alvo de resposta: 3-5 min, 15-20 perguntas (maioria fechada).

Seções do formulário:

- **Seção 1 — Perfil** (5 perguntas): faixa etária, moradia em POA, frequência, tipo de estabelecimento, acessibilidade.
- **Seção 2 — Experiência com cardápios digitais** (7 perguntas): frequência de exposição, preferência, escala Likert (praticidade, dificuldade, interação com garçom, confiança, dados/privacidade, gasto, experiência social), incidentes de frustração.
- **Seção 3 — Aspectos técnicos** (3 perguntas): problemas técnicos comuns, contextos em que funciona melhor/pior.
- **Seção 4 — Visão geral** (3 perguntas): permanência da tendência, decisão hipotética como dono, comentário livre.

### 6.3 Termos de autorização e confidencialidade (Apêndice C)

Modelos oficiais fornecidos pela UNISINOS estão em `attachments/autorizações/`:

- **`TermoConfidencialidade.doc`** — termo de confidencialidade entre pesquisador e participante (proteção de dados sensíveis do estabelecimento, como custos, fornecedores, métricas internas). **Aplicar com gestores nas entrevistas.**
- **`TermoAutorizacaoUsoImagem.doc`** — autorização de uso de imagem (adulto). Aplicar caso haja fotos do estabelecimento, da operação, ou do entrevistado no trabalho final.
- **`AutorizacaoUsoObraFotografica.doc`** — autorização para uso de obras fotográficas de terceiros (ex.: fotos do site/Instagram do estabelecimento).
- **`AutorizacaoUsoImagemMenor.doc`** — só aplicável se houver imagem de menor de idade (improvável neste TCC; descartar se não usar).

**O que ainda falta produzir (não tem modelo UNISINOS direto):**

- **TCLE — Termo de Consentimento Livre e Esclarecido** propriamente dito, que cobre a participação na pesquisa (entrevista/formulário) e o tratamento de dados pessoais sob a LGPD. Estrutura mínima:
  - Identificação do pesquisador, orientador, instituição, contato;
  - Objetivo da pesquisa, procedimentos, duração estimada;
  - Riscos mínimos (constrangimento) e benefícios (contribuição à área);
  - Garantias: anonimato, sigilo, direito de retirar consentimento sem ônus;
  - Aderência à LGPD: dados pessoais coletados, finalidade, prazo de retenção, descarte;
  - Assinatura do participante + pesquisador.

**Mapeamento por instrumento:**

| Instrumento                     | Documentos necessários                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Entrevista com gestor           | TCLE + Termo de Confidencialidade (+ Autorização de Uso de Imagem, se for fotografar) |
| Questionário com frequentadores | Consentimento embutido como 1ª pergunta do Google Forms (versão resumida do TCLE)     |
| Uso de fotos de terceiros       | Autorização de Uso de Obra Fotográfica                                                |

> **No `main.tex`,** anexar os termos como **Apêndice C** (versões finais que serão efetivamente aplicadas em campo). Os arquivos `.doc` da UNISINOS podem ser convertidos para LaTeX ou incluídos como imagens/PDFs anexos.

### 6.4 Ferramenta para o questionário — decisão: **Google Forms**

| Critério             | Google Forms            | Site custom                |
| -------------------- | ----------------------- | -------------------------- |
| Tempo de setup       | ~2h                     | dias a semanas             |
| Lógica condicional   | sim (seções)            | sim                        |
| Export CSV/Sheets    | nativa                  | precisa codar              |
| Anti-spam            | razoável                | precisa implementar        |
| LGPD / armazenamento | Google assume parte     | você assume tudo           |
| Acessibilidade       | razoável out-of-the-box | precisa garantir           |
| Custo                | zero                    | hospedagem + tempo         |
| Valor para a banca   | igual                   | igual (não é contribuição) |

**Decisão:** Google Forms + (opcional) landing page HTML simples com link encurtado para divulgação mais profissional.

Custom só faria sentido se o site fosse parte da contribuição computacional do TCC — fica como possibilidade futura, _se_ houver folga de tempo no TCC II.

---

## 7. Estratégia de busca bibliográfica

**Bases:** Google Scholar, Scopus, ACM DL, IEEE Xplore, ScienceDirect, **BDTD** (teses BR), SciELO.

**Eixos e termos:**

| Eixo                                   | Termos PT                                                      | Termos EN                                                                                      |
| -------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Transformação digital food service     | transformação digital restaurantes; digitalização food service | digital transformation restaurants; restaurant technology adoption; foodservice digitalization |
| Cardápios digitais / QR menus          | cardápio digital; cardápio QR code; menu digital               | digital menu; QR code menu; contactless menu; e-menu                                           |
| Autoatendimento                        | autoatendimento restaurante; pedido por celular                | self-ordering; mobile ordering restaurant; tabletop ordering                                   |
| Adoção tecnológica em PMEs (TAM/UTAUT) | adoção de tecnologia PME                                       | TAM restaurant; UTAUT food service; technology acceptance                                      |
| UX / usabilidade mobile                | usabilidade mobile; acessibilidade web                         | mobile UX restaurant; menu design; WCAG accessibility                                          |
| Impacto da COVID-19 no setor           | impacto pandemia bares restaurantes                            | COVID-19 restaurant industry; post-pandemic dining; contactless dining                         |
| Comportamento do consumidor            | comportamento consumidor cardápio digital                      | consumer behavior digital menu; menu engineering; purchase intention                           |
| LGPD / privacidade                     | LGPD restaurantes; proteção de dados varejo                    | GDPR restaurant; data privacy retail                                                           |
| Metodologia                            | estudo de caso; análise de conteúdo Bardin                     | case study Yin; mixed methods; qualitative research                                            |

**Autores/obras quase obrigatórios:** Davis (TAM), Venkatesh (UTAUT), Yin (estudo de caso), Bardin (análise de conteúdo), Nielsen (heurísticas de usabilidade), W3C (WCAG).

**Estratégia prática:**

- Strings combinadas, ex.: `("digital menu" OR "QR menu") AND (adoption OR acceptance) AND restaurant`.
- Filtrar **2018-2026** para o tema central; clássicos (TAM/Yin/Bardin) sem limite.
- _Snowball_: 3-5 artigos centrais → ler refs → ler quem os cita ("Citado por" no Scholar).
- **Meta TCC I:** 20-25 referências fichadas, 12-15 efetivamente citadas no texto.
- **Gestão:** instalar **Zotero** (gratuito, exporta BibTeX compatível com `abntex2cite`).

---

## 8. Decisões-chave para destravar agora

- **Quantos estabelecimentos?** Recomendo **2 ou 3** (1 é frágil pra banca, >3 inviabiliza a coleta em um semestre).
- **Comitê de Ética (CEP):** confirmar com o orientador se a pesquisa precisa de submissão CEP/Plataforma Brasil. Entrevistas + dados pessoais geralmente requerem ao menos TCLE — incluir TCLE no apêndice.

---

## 9. Riscos e mitigações

- **Orientador:** marcar reuniões formais a cada 2 semanas com pauta escrita; enviar entregáveis parciais em PDF para forçar feedback assíncrono.
- **Coleta de dados travar em TCC II:** já no TCC I, listar nominalmente estabelecimentos-alvo e ter 1 contato confirmado por escrito.
- **Escopo inflar:** sempre que aparecer "também seria legal estudar X" → mover para "Trabalhos Futuros".

---

## 10. Próximos passos

1. Reorganizar `main.tex`: atualizar metadados, remover capítulos-exemplo e criar os capítulos novos como esqueleto com TODOs por seção.
2. Preencher os Apêndices A, B e C com os rascunhos do roteiro, questionário e TCLE.
3. Iterar a redação seção a seção, validando incrementalmente com o orientador.
