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

## Estado do artigo e próximas tarefas
- A versão anterior à conversão está preservada na branch remota `monografia` (commit `c7b65f1`). A branch `main` contém o artigo em elaboração. Push somente quando o César pedir.
- `main.tex` usa a opção `artigo` de `UNISINOSmonografia.cls`: capa, folha de rosto, sete seções corridas, referências, apêndices e anexos. O cronograma não é incluído. Os complementos teóricos e os procedimentos estão nos Apêndices E e F.
- O PDF compila com `latexmk`. As referências começam aproximadamente na página 32 do artigo; a meta do orientador continua sendo **25 a 30 páginas até as referências**. Não ajustar a fonte só para atingir o limite: priorizar cortes editoriais e apêndices.
- O feedback do orientador foi incorporado parcialmente: pergunta e objetivo alinhados às contribuições técnicas; modalidades de cardápio delimitadas; quadro de lentes teóricas; matriz preliminar de integração; correlações tratadas como descritivas; decisões técnicas dos gestores separadas da arquitetura interna não observada. O resumo e a conclusão são explicitamente provisórios.
- Prioridade de pesquisa: concluir ou redimensionar formalmente os casos A e B e confirmar a entrevista do fornecedor. Não preencher células vazias ou atribuir às plataformas arquiteturas não verificadas. O questionário não foi aplicado especificamente aos clientes dos casos.
- Para cada requisito R01--R15, registrar fonte identificável (trecho anonimizado de entrevista, item/resposta do questionário ou relatório de auditoria), justificativa, conflito entre gestores e clientes e eventual revisão. Conferir as categorias abertas antes de consolidar a matriz das três fontes. Se viável, revisar os três artefatos com um ou dois profissionais; se não, declarar a ausência de validação.
- Resolver todos os `\pendente{...}` antes da entrega, em especial ética/CEP, resultados A/B/fornecedor, rastreabilidade, validação dos artefatos e conclusão. Usar apenas dados reais. PDFs de referência dos TCCs de Jorge Viegas, Daniel Ferreira e Lucas Ceschini e artigo de Vanessa Schenkel estão em `~/Downloads`.
