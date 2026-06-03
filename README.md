# TCC — Não tem mais cardápio?

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

- `main.tex` — arquivo-fonte principal do trabalho
- `UNISINOSmonografia.cls` — classe LaTeX oficial da UNISINOS para monografias
- `exemplo.bib` — base de referências bibliográficas (BibTeX)
- `images/` — figuras utilizadas no documento
- `attachments/` — documentos de apoio e referência
  - `attachments/plano-tcc1.md` — plano de trabalho do TCC I (escopo, metodologia, instrumentos e decisões)
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
