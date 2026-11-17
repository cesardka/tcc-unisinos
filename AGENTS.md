# AGENTS.md — TCC II "Cadê o cardápio?" (César Hoffmann, Ciência da Computação, UNISINOS)

Subtítulo: Adoção, experiência do usuário e arquitetura de cardápios digitais em bares e restaurantes de Porto Alegre.
Orientador: Prof. Dr. Guilherme Lacerda. **Entrega: 23/11/2026 (prazo fixo).**

## Regras de trabalho
- Usar apenas dados reais coletados; nunca inventar resultados ou entrevistas. Pendências vão com `\pendente{...}` (texto vermelho).
- Tom de graduação: impessoal ("este trabalho"), frases curtas, uma ideia por frase, exemplos concretos, sem termos rebuscados nem travessões.
- Dados pessoais (CSVs do questionário, áudios, transcrições, TCLEs assinados) ficam FORA do Git, em `~/Documents/UNISINOS/TCC II - Entrevistas/`. `*.csv` e `*.xlsx` estão no `.gitignore`.
- Commits só quando o César pedir; push só quando ele pedir. Mensagens de commit em português, explicando o porquê.

## Comandos
- Compilar: `latexmk -pdf -interaction=nonstopmode main.tex` (gera `César Hoffmann - TCC.pdf`).
- Questionário: `python3 analysis/analise_questionario.py "<csv>"` → relatório + `analysis/tabelas/*.tex` (lidas com `\inputtabela{}`).
- Auditorias Lighthouse: `python3 analysis/medianas_lighthouse.py` (relatórios em `analysis/auditoria/relatorios/`).
- Transcrição local: `whisper-cli -m ~/.cache/whisper/ggml-large-v3-turbo-q5_0.bin -f audio.wav -l pt` (converter antes com ffmpeg para 16 kHz mono).

## Estado da pesquisa (16/11/2026)
- Questionário encerrado em 15/11: 114 respostas (92 POA+RM; 90 expostos). 76% preferem físico; PE 2,22 (mais baixo), EE 3,53; PE×BI ρ=0,68, HB×BI 0,67.
- Casos: C = Ohana Açaí (entrevistado 15/11, nome autorizado); D = Ordinária Pub (13/11, nome autorizado).
  Pendentes: A (candidatos Bowlerama, Mambembe, Du Magu), B (Atelier de Massas, contato com a Túlia), fornecedor (Saipos aguardando supervisão; Anota AI contatado via LinkedIn).
- Auditorias de 4 cardápios (Anota AI: Ohana, Atelier; Goomer: Cortex, Armazém): LCP 8–21 s, zoom bloqueado em todos.
- Convites: `attachments/roteiro-entrevista/convite-fornecedor.pdf` e `convite-gestor.pdf`; TCLE: `attachments/termos/tcle-entrevista.pdf`.

## PRÓXIMA TAREFA: converter a monografia em artigo
Feedback do orientador: o TCC II é em **formato de artigo, 25 a 30 páginas até as referências**; o restante vai para apêndices (sem limite). O cronograma sai.
- Antes de começar, criar o branch `monografia` para preservar a versão atual.
- Modelo de referência: TCCs de CC da UNISINOS (capa simples + artigo em uma coluna, 6–7 seções numeradas, "Trabalhos relacionados" como seção própria). O mais parecido com este trabalho é o de Jorge Matheus Gomes Viegas (separa resultados e discussão). PDFs de referência no `~/Downloads`. Perguntar ao César se o orientador tem template de artigo; senão, adaptar `UNISINOSmonografia.cls`.
- Estrutura-alvo (~27 p.): 1 Introdução (2–3) · 2 Fundamentação (5) · 3 Trabalhos relacionados (2) · 4 Metodologia (3–4) · 5 Resultados (7–8) · 6 Discussão (5) · 7 Conclusão (1–2). Apêndices: casos completos, catálogo de requisitos, taxonomia, tabelas detalhadas, roteiros, questionário, termos.
