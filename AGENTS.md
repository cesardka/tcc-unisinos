# AGENTS.md — TCC II "Cadê o cardápio?" (César Hoffmann, Ciência da Computação, UNISINOS)

Subtítulo: Um catálogo preliminar de requisitos para cardápios digitais em bares e restaurantes de Porto Alegre.
Orientador: Prof. Dr. Guilherme Lacerda. **Entrega: 23/11/2026 (prazo fixo).**

## Regras de trabalho
- Usar apenas dados reais coletados; nunca inventar resultados ou entrevistas. Pendências vão com `\pendente{...}` (texto vermelho).
- Tom de graduação, com a cadência do César (referência: posts em `~/Projects/cesardka/jornada-do-baralho/posts/`): impessoal ("este trabalho", "o autor"), mas sem soar como cientista. Variar o tamanho das frases, ligar as ideias com conectivos ("mas", "ainda assim", "por isso", "apesar de"), explicar termos técnicos em linguagem simples e com exemplos concretos. Dizer cada limite uma vez, de forma direta, e concentrar as ressalvas em Limitações em vez de repeti-las em todo parágrafo. Sem emojis, ironia, caixa alta, termos rebuscados nem travessões. A motivação do trabalho é a curiosidade do autor como frequentador de bares e restaurantes; não usar o tempo de experiência profissional como motivação.
- Dados pessoais (CSVs do questionário, áudios, transcrições, TCLEs assinados) ficam FORA do Git, em `~/Documents/UNISINOS/TCC II - Entrevistas/`. `*.csv` e `*.xlsx` estão no `.gitignore`.
- Commits só quando o César pedir; push só quando ele pedir. Mensagens de commit em português, explicando o porquê.

## Comandos
- Protótipo (`prototype/`, publicado em https://cade-o-cardapio-tcc.vercel.app a cada push em `main`): `node --test prototype/tests/availability.test.mjs`. Implementa somente R01, R02, R06 e R09 (`prototype/spec.md`); recursos sem requisito do catálogo não entram. R06: `npx -y lighthouse@13.5.0 <url> --output=json` três vezes, relatórios em `analysis/auditoria/relatorios/prototipo_*.json`.
- Compilar: `latexmk -pdf -interaction=nonstopmode main.tex` (gera `César Hoffmann - TCC.pdf`).
- Questionário: `python3 analysis/analise_questionario.py "<csv>"` → relatório + `analysis/tabelas/*.tex` (lidas com `\inputtabela{}`).
- Auditorias Lighthouse: `python3 analysis/medianas_lighthouse.py` (relatórios em `analysis/auditoria/relatorios/`).
- Transcrição local: `whisper-cli -m ~/.cache/whisper/ggml-large-v3-turbo-q5_0.bin -f audio.wav -l pt` (converter antes com ffmpeg para 16 kHz mono).

## Estado da pesquisa (atualizado em 19/11/2026)
- Questionário encerrado em 15/11: 114 respostas (92 POA+RM; 90 expostos). 76% preferem físico; PE 2,22 (mais baixo), EE 3,53; PE×BI ρ=0,68, HB×BI 0,67.
- Casos: C = Ohana Açaí (entrevistado 15/11, nome autorizado); D = Ordinária Pub (13/11, nome autorizado). B = Atelier de Massas (aberto em 1992; entrevistado em 18/11, sócio-fundador segundo César; TCLE físico assinado com a opção de identificar a casa marcada, conforme César). Pedidos de plataforma podem ser impressos, mas o atendente anota à mão os pedidos de todos os canais e leva a anotação à cozinha. César confirmou os trechos pertinentes do caso B; a gravação inteira não foi revisada. Áudio original `~/Downloads/atelier_20261118.m4a`; transcrição e notas privadas em `~/Documents/UNISINOS/TCC II - Entrevistas/`. Não divulgar o nome pessoal do entrevistado.
  A = Bowlerama (aberto em 2013; tablets por mesa desde 2015; 24 mesas; sem delivery; pedidos dos tablets e do balcão vão a um sistema central e o pagamento é no caixa). Entrevista em 21/11 com o supervisor (~13 min); TCLE físico assinado autoriza identificar a casa. Fornecedor: Glow (citado na entrevista; César confirmou em 22/11 comparando com o site da empresa). Transcrição automática e notas em `~/Documents/UNISINOS/TCC II - Entrevistas/perfil-A_*`.
  Respostas abertas (base POA+RM) codificadas manualmente em 22/11, um único codificador: `questionario_codificacao-respostas-abertas_2026-11-22.py` na mesma pasta privada; códigos Q### = linha da resposta no CSV `Cardápios digitais ... Form Responses 1 (3).csv`. A entrevista com fornecedor não ocorreu e não integra a versão atual; as tentativas de contato não renderam entrevista.
- Auditorias de 4 cardápios (Anota AI: Ohana, Atelier; Goomer: Cortex, Armazém): LCP 8–21 s, zoom bloqueado em todos.
- Convites: `attachments/roteiro-entrevista/convite-fornecedor.pdf` e `convite-gestor.pdf`; TCLE: `attachments/termos/tcle-entrevista.pdf`.

## Orientações do orientador (respostas de 20/11/2026)
- **Ética/CEP:** o TCLE assinado é suficiente, inclusive para identificar os estabelecimentos que autorizaram. O trabalho não passou pelo Comitê de Ética porque a submissão teria de ocorrer antes do TCC I, dado o prazo de resposta do comitê. Declarar isso no texto como decisão de escopo, sem afirmar aprovação do CEP.
- **Fornecedores (Saipos, Anota AI):** a entrevista não ocorreu. Destacar como uma dificuldade e limitação importante da pesquisa, e manter como trabalho futuro.
- **Revisão do catálogo por profissionais:** pode ser feita com colegas de profissão do César (desenvolvimento de software). O objetivo é obter a percepção e uma segunda resposta, não uma validação formal. Descrever o perfil de cada revisor (área, anos de experiência, função), sem identificar o nome. O próprio César não conta como revisor.
- **Demonstração do artefato:** tanto um protótipo em link público quanto um vídeo gravado são válidos.
- **Título/subtítulo:** pode ser alterado; normalmente é a última coisa a mudar.

## Estado do artigo e próximas tarefas
- A versão anterior à conversão está preservada na branch remota `monografia` (commit `c7b65f1`). A branch `main` contém o artigo em elaboração. Push somente quando o César pedir.
- `main.tex` usa a opção `artigo` de `UNISINOSmonografia.cls`: capa, folha de rosto, sete seções corridas, referências, apêndices e anexos. O cronograma não é incluído. Os complementos teóricos, os procedimentos e a rastreabilidade estão nos Apêndices E, F e G.
- O PDF compila com `latexmk` (64 páginas em 22/11), sem `\pendente`. As referências terminam na página 30 do artigo; a meta do orientador é **25 a 30 páginas até o fim das referências**. Não ajustar a fonte só para atingir o limite: priorizar cortes editoriais e apêndices.
- O feedback do orientador foi incorporado parcialmente: pergunta e objetivo alinhados às contribuições técnicas; modalidades de cardápio delimitadas; quadro de lentes teóricas; matriz preliminar de integração; correlações tratadas como descritivas; decisões técnicas dos gestores separadas da arquitetura interna não observada. O resumo e a conclusão são explicitamente provisórios.
- Prioridade de pesquisa: concluir ou redimensionar formalmente o caso A. A entrevista com fornecedor fica para trabalho futuro. Não preencher células vazias ou atribuir às plataformas arquiteturas não verificadas. O questionário não foi aplicado especificamente aos clientes dos casos.
- Para cada requisito R01--R15, registrar fonte identificável (trecho anonimizado de entrevista, item/resposta do questionário ou relatório de auditoria), justificativa, conflito entre gestores e clientes e eventual revisão. Conferir as categorias abertas antes de consolidar a matriz das três fontes. Se viável, revisar os três artefatos com um ou dois colegas de profissão (ver orientações de 20/11); se não, declarar a ausência de revisão.
- Resolver todos os `\pendente{...}` antes da entrega, em especial resultados do caso A, rastreabilidade, eventual revisão do catálogo e conclusão. Usar apenas dados reais. PDFs de referência dos TCCs de Jorge Viegas, Daniel Ferreira e Lucas Ceschini e artigo de Vanessa Schenkel estão em `~/Downloads`.
