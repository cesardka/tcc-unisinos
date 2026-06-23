# TCC — Cadê o cardápio?

> **Entendendo o impacto da digitalização de bares e restaurantes entre 2020 e 2026 em Porto Alegre**

Repositório do Trabalho de Conclusão de Curso (TCC) de **César Hoffmann**, aluno de **Ciência da Computação** na **UNISINOS**.

## Sobre o projeto

Este repositório contém o arquivo-fonte em LaTeX, imagens, referências bibliográficas e demais arquivos relacionados ao TCC. O objetivo do trabalho é investigar como a digitalização — em especial a substituição de cardápios físicos por versões digitais (QR code, apps, etc.) — afetou a experiência em bares e restaurantes de Porto Alegre no período entre 2020 e 2026.

- **Autor:** César Hoffmann
- **Orientador:** PhD Guilherme Lacerda
- **Instituição:** Universidade do Vale do Rio dos Sinos (UNISINOS)
- **Curso:** Ciência da Computação
- **Disciplina:** TCC I — 2024/2

## Estrutura do repositório

- `main.tex` — arquivo-fonte principal (preâmbulo, pré-textuais e `\include` de capítulos e apêndices)
- `chapters/` — capítulos numerados, um arquivo por capítulo (`01-introducao.tex`, `02-fundamentacao.tex`, `03-metodologia.tex`, `04-cronograma.tex`)
- `appendices/` — apêndices (`A-roteiro.tex`, `B-questionario.tex`, `C-termos.tex`)
- `UNISINOSmonografia.cls` — classe LaTeX oficial da UNISINOS para monografias
- `referencias.bib` — base de referências bibliográficas do trabalho (BibTeX); entradas geradas a partir do fichamento em `attachments/fichamento.md`
- `exemplo.bib` — entradas de exemplo do template UNISINOS (mantidas apenas para referência de sintaxe)
- `bibliography/` — arquivos PDF das referências, organizados por eixo temático
- `images/` — figuras utilizadas no documento
- `attachments/` — documentos de apoio e referência
  - `attachments/plano-tcc1.md` — plano de trabalho do TCC I (escopo, metodologia, instrumentos e decisões)
  - `attachments/fichamento.md` — fichamento das referências (resumo, tipo, recorte, relevância)
  - `attachments/bibliografia-triagem.md` — triagem automatizada dos PDFs (status de extração de texto)
  - `attachments/autorizações/` — modelos UNISINOS de termos de confidencialidade e autorização de uso de imagem para a coleta de dados
- `main.pdf` — versão compilada mais recente do trabalho

## Como compilar

Requisitos: uma distribuição LaTeX instalada (TeX Live, MacTeX ou MiKTeX) com `pdflatex` e `bibtex`.

```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

Ou, se preferir usar `latexmk`:

```bash
latexmk -pdf main.tex
```

O PDF gerado estará em `main.pdf`.

## Template e créditos

A formatação deste trabalho parte do **template LaTeX oficial da UNISINOS para monografias**, distribuído pela própria universidade aos alunos de graduação. O núcleo do template — classe `UNISINOSmonografia.cls`, estrutura de pré-textuais (capa, folha de rosto, dedicatória, epígrafe, resumos, sumário) e configuração ABNT via `abntex2` — é mantido o mais próximo possível do original; as adaptações feitas neste repositório dizem respeito apenas ao conteúdo do trabalho (texto, referências, figuras e ajustes pontuais de estilo).

## Convenções editoriais e diretrizes para colaboração com agentes

Esta seção registra decisões editoriais ativas e diretrizes destinadas a futuros agentes de IA (ou a colaboradores humanos) que venham a editar este trabalho. O objetivo é evitar retrabalho, manter consistência entre revisões e reduzir marcas estilísticas que poderiam levantar suspeita de geração automatizada por parte da banca.

### Escopo e referencial fixados

- **Recorte funcional.** O objeto de estudo são cardápios digitais com autoatendimento em **todas as modalidades de hardware**: dispositivo do próprio cliente (QR Code apontando para web menu ou self-ordering) e dispositivo disponibilizado pelo estabelecimento (tablet na mesa, totem em quiosque). O critério unificador é o cliente realizar por conta própria, em interface digital, etapas tradicionalmente intermediadas por um funcionário. Estão fora do escopo: KDS, ERP, plataformas de delivery (iFood, Rappi, Uber Eats) e aplicativos nativos próprios que exigem instalação em loja, ainda que possam aparecer como contexto.
- **Casos.** Meta firme de **3 casos**, distribuídos em três perfis: pré-2020 que adotou, pré-2020 que resistiu, pós-2020 nascido digital. Cenários com menos de 3 casos só aparecem no plano de risco do cronograma.
- **Referencial teórico.** **UTAUT2** (Venkatesh et al., 2012) para a perspectiva do consumidor; **UTAUT original** (Venkatesh et al., 2003) para a perspectiva do gestor. Três lentes de Ciência da Computação estruturam a análise: Engenharia de Requisitos, UX/IHC e Arquitetura de Software.

### Estilo de escrita

- **Travessões longos (em-dash).** Não usar `---` como recurso de pausa em texto corrido. Avaliadores acadêmicos têm desenvolvido sensibilidade ao uso de travessões para inserir apostos explicativos como marcador de texto gerado por LLM. Preferir vírgulas; usar parênteses quando o aposto contiver vírgulas internas que tornariam a leitura ambígua. **Exceção única:** assinatura de epígrafe (convenção tipográfica universal, não estilo de escrita).
- **Itálico em estrangeirismos.** Estrangeirismos já assimilados ao português brasileiro técnico (software, hardware, web, online, smartphone, food service, delivery, marketing, design, etc.) ficam em redondo. Itálico fica reservado a termos verdadeiramente não assimilados ou usados em sentido técnico específico.
- **Pontuação.** Vírgula antes de conjunção adversativa (mas, porém, contudo). Em listas com último item longo, é aceitável usar vírgula antes do "e" final (vírgula serial) quando isso melhora a leitura.
- **Demonstrativos em texto formal.** Usar **este** trabalho (não "esse trabalho") quando o referente é o próprio TCC em mãos do leitor.
- **Dedicatória e agradecimentos.** Manter tom pessoal e respeitar coloquialismos intencionais do autor; não "corrigir" o estilo afetivo do paratexto para um registro mais formal. Em contrapartida, corrigir incorreções gramaticais e idiomáticas mesmo nesses trechos (exemplo já tratado: "parceria de crime" → "parceira de crime").

### Higiene do repositório

- **Rascunhos pessoais não vão para o repositório.** Cadernos de pesquisa, listas de tarefas privadas e notas de trabalho cuja informação útil já está incorporada no texto principal ou nas notas das entradas do `referencias.bib` devem ser apagados após uso, ou mantidos fora do controle de versão. O repositório é lido por terceiros e a presença de notas auxiliares com estrutura excessivamente didática (cabeçalhos em sequência, blocos "sugestão de uso", etc.) pode soar como artefato de geração automatizada mesmo quando não é.
- **Plano vivo em `.windsurf/plans/`.** O plano de revisão do TCC é mantido em arquivo dedicado dentro de `.windsurf/plans/` (fora do controle de versão do trabalho), com status feito/pendente atualizado a cada sessão de edição. Antes de iniciar nova rodada de revisão, consultar esse plano.
- **Memórias do agente.** Preferências persistentes do autor que afetem múltiplas sessões (tratamento de pessoas específicas, decisões de estilo recorrentes, modelos mentais sobre o trabalho) devem ser registradas como memória do agente, não como arquivo no repositório.

### Build e infraestrutura

- **Build padrão.** Usar `latexmk -pdf main.tex` para compilar. O arquivo gera o PDF principal `César Hoffmann - TCC.pdf` na raiz do projeto.
- **Pacotes adicionados ao template original.** `tikz` (com bibliotecas `positioning`, `arrows.meta`, `shapes.geometric`, `fit`, `calc`) para o desenho metodológico em `chapters/03-metodologia.tex`; `hyperref` com `hidelinks` para navegação interativa no PDF sem destaque colorido.
- **Compilação após cada edição substantiva.** Sempre rodar `latexmk` após edições estruturais e confirmar que o exit code é zero antes de commitar. Isso evita commits que quebrem o build.

### Bibliografia já incorporada

Para evitar buscas redundantes, segue o que já está no `referencias.bib`:

- **Cânone de CC.** Sommerville 2016 (Engenharia de Software), ISO/IEC 25010 (qualidade de software), Nielsen 1994 (heurísticas + Usability Engineering), ISO 9241-11 e ISO 9241-210 (ergonomia e design centrado no usuário), WCAG 2.2 (acessibilidade web), Bass, Clements & Kazman 2021 (arquitetura), Richards & Ford 2020 (fundamentos de arquitetura), Creswell & Plano Clark 2017 (métodos mistos).
- **Aceitação de tecnologia.** Venkatesh et al. 2003 (UTAUT), Venkatesh, Thong & Xu 2012 (UTAUT2), Dwivedi et al. 2019 (UTAUT revisado), Bagozzi 2007 (crítica ao TAM), Brito 2019 e Batista 2023 (revisões em português), Marikyan 2024 e Marikyan 2023 (TheoryHub).
- **Dados de mercado e setoriais.** ABRASEL 2022, 2023, 2024, 2025 e ABRASEL-SC 2025; ABRASEL+FGV 2024; SEBRAE+ABDI 2024; Cetic.br/TIC Domicílios; ABIA; ABRASEL+Harmo 2025.
- **Transformação digital.** Verhoef et al. 2021 (definição); Westerman, Bonnet & McAfee 2014 (maturidade digital).
- **Escalas Likert.** Dalmoro & Vieira 2013 (justificativa para 5 vs. 7 pontos no contexto brasileiro).

### Padrões de commit

Mensagens de commit descritivas e em parágrafos completos, explicando **o que mudou** e **por quê**, não apenas o quê. Cada mudança lógica recebe um commit dedicado, mesmo quando o diff é pequeno. Exemplos do histórico recente fornecem o tom esperado.
