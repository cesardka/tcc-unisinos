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
