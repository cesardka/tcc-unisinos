# Especificacao da prova de conceito: R01, R02, R06 e R09

Cada secao abaixo refina um requisito do catalogo do TCC (Tabela de requisitos
e Apendice G). Os criterios sao **propostas do autor**, nao requisitos aceitos
pelos participantes. Os itens, os precos e a operacao sao ficticios. A pagina
implementa somente o que esta descrito aqui; ilustracoes e textos de apoio nao
correspondem a requisitos.

Os cenarios usam a estrutura Dado-Quando-Entao documentada pelo Cucumber, mas
**nao** sao executados pelo Cucumber: os testes usam o executor nativo do Node.js.

## R01: confirmacao do pedido (parcial)

Requisito do catalogo: ao enviar o pedido, mostrar ao cliente a confirmacao de
recebimento, com numero e estado. Fontes (Apendice G): o caso A valoriza que o
sistema "so informa quando o pedido e feito"; tres relatos de frustracao
descrevem duvida sobre a conclusao do pedido (Q010, Q040, Q075); heuristica de
visibilidade do estado do sistema (Nielsen).

**Criterio:**

1. Na cesta, o cliente confere quantidade, preco unitario, subtotal e total
   antes de enviar. Os botoes "+" e "-" alteram uma unidade por vez.
2. Cesta vazia ou com item esgotado nao gera pedido; o botao "Enviar para
   cozinha" fica desabilitado e a cesta explica o motivo.
3. Ao enviar, a cesta e esvaziada e o pedido recebe um numero sequencial e o
   estado "Recebido".
4. A pagina mostra o numero e o estado em "Seus pedidos", move o foco para essa
   area e anuncia a confirmacao a leitores de tela.

```text
Dado uma cesta com itens disponiveis
Quando o cliente toca "Enviar para cozinha"
Entao a cesta fica vazia
E "Seus pedidos" mostra "Pedido 1" com o estado "Recebido"
```

**Limites:** nao ha envio a um restaurante, servidor nem persistencia. O estado
nao evolui depois de "Recebido" (por exemplo, "Em preparo"), porque nao existe
cozinha real para informa-lo.

## R02: disponibilidade de itens (parcial)

Requisito do catalogo: ao esgotar ou incluir um item, refletir a mudanca em todos
os aparelhos de consulta e pedido, sem atualizar cada um, e recusar pedidos de
itens esgotados. Esta prova de conceito cobre apenas o esgotamento de itens na
mesma aba; a inclusao de itens novos e a propagacao entre aparelhos nao foram
implementadas.

**Criterio:** quando o operador marca um item como esgotado, na **mesma pagina
aberta** e sem recarregar:

1. O item exibe "Esgotado" e o botao "Adicionar" fica desabilitado.
2. Mesmo se a acao de adicionar for chamada diretamente, o item nao entra na cesta.
3. Os demais itens continuam disponiveis.
4. Ao voltar a disponibilizar o item, ele pode ser adicionado novamente.
5. Se o item ja estava na cesta, ele continua visivel, mas impede o envio (R01).

```text
Dado que um item esta disponivel no cardapio ficticio
Quando o operador o marca como esgotado
Entao a pagina mostra "Esgotado" e desabilita "Adicionar"
E nenhuma nova adicao desse item entra na cesta
```

**Limites:** o controle do operador fica na mesma pagina do cliente, sem login.
Nao ha estoque real nem sincronizacao entre aparelhos; a "atualizacao em tempo
real" foi verificada apenas dentro da mesma aba.

## R06: carregamento em conexoes lentas

Requisito do catalogo: exibir o conteudo principal (LCP) em ate 2,5 s em perfil
movel com rede 4G lenta simulada, sem depender de PDF.

**Criterio:** com o Lighthouse 13.5.0 em perfil movel e limitacao simulada
(RTT de 150 ms, 1,6 Mbps e CPU quatro vezes mais lenta), a mediana do LCP em
tres execucoes deve ser de ate 2,5 s. Sao as mesmas condicoes das auditorias
das quatro paginas analisadas no TCC.

**Plano:** pagina estatica, sem bibliotecas, fontes do sistema e ilustracoes
SVG pequenas com carregamento adiado.

**Limites:** a medicao foi feita em servidor local, o que elimina a latencia
real do servidor. Ela nao representa uso em rede real nem em aparelhos lentos.

## R09: ampliacao do texto (parcial)

Requisito do catalogo: permitir ampliar o texto ate 200% sem perda de conteudo
ou funcao, sem bloquear o zoom, com contraste minimo de 4,5:1.

**Criterio:** no celular, com texto a 100%, 150% e 200%, itens, precos, estados
e controles continuam legiveis e operaveis, sem rolagem horizontal em 320 CSS px.
O `meta-viewport` nao bloqueia o zoom. Controles de itens distintos tem nomes
acessiveis que incluem o item. O texto tem contraste minimo de 4,5:1, conferido
pela auditoria `color-contrast` do Lighthouse.

**Verificacao:** inspecao manual em 320 CSS px, navegacao por teclado e
auditoria automatica do Lighthouse. Isso nao demonstra conformidade completa
com as WCAG, nao substitui teste com leitor de tela nem com participantes.
O gesto de pinca nao foi testado manualmente.

## Plano e arquivos

| Requisito | Regra | Interface | Verificacao |
| --- | --- | --- | --- |
| R01 | `closeOrder`, `removeFromOrder` em `availability.mjs` | cesta e "Seus pedidos" em `index.html`, `app.mjs` | testes `R01` e inspecao manual |
| R02 | `setAvailability`, `addToOrder` em `availability.mjs` | controle do operador em `index.html`, `app.mjs` | testes `R02` e inspecao manual |
| R06 | nao se aplica | `index.html`, `styles.css`, `assets/` | Lighthouse, tres execucoes |
| R09 | nao se aplica | seletor de texto e CSS em unidades relativas | inspecao manual e Lighthouse |
