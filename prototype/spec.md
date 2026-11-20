# R02: disponibilidade de itens (demonstracao) e extensao R09

O catalogo do TCC registra relatos sobre a vantagem de retirar itens esgotados
e sobre informacoes desatualizadas. A regra abaixo e uma **proposta de projeto**
derivada de R02, nao uma funcionalidade verificada nos estabelecimentos.

## Escopo e criterio de aceitacao

Em um cardapio ficticio, uma pessoa com acesso ao controle demonstrativo marca
um item como esgotado. Na **mesma pagina aberta**, sem recarregar:

1. O item passa a exibir o texto "Esgotado" e o botao "Adicionar" fica desabilitado.
2. Mesmo se a acao de adicionar for chamada diretamente, a quantidade no
   pedido nao aumenta para um item esgotado.
3. Os demais itens continuam disponiveis.
4. Ao voltar a disponibilizar o item, ele pode ser adicionado novamente.

O primeiro e o quarto pontos verificam a apresentacao; o segundo verifica a
regra de negocio independentemente da interface. Os cenarios usam a estrutura
Dado-Quando-Entao documentada pelo Cucumber, mas **nao** sao executados pelo
Cucumber: os testes automatizados usam o executor nativo do Node.js.

```text
Dado que um item esta disponivel no cardapio ficticio
Quando o operador o marca como esgotado
Entao a pagina mostra "Esgotado" e desabilita "Adicionar"
E nenhuma nova adicao desse item entra no pedido
```

## Plano e tarefas

1. Representar a disponibilidade e o pedido em memoria, sem servidor.
2. Exibir os itens e um controle de esgotamento na mesma pagina.
3. Impedir a adicao tanto no controle visual quanto na regra de negocio.
4. Testar transicoes disponivel/esgotado/disponivel e isolamento dos itens.

O codigo fica em `availability.mjs` (regra) e `app.mjs` (interface); a evidencia
de teste reproduzivel fica em `tests/availability.test.mjs`.

## Limites

O controle do operador e visivel na mesma pagina do cliente; nao ha login.
O estado existe somente na memoria desta aba. Nao ha estoque real, API,
sincronizacao entre aparelhos, persistencia, pagamento nem medicao de atraso
em producao. Assim, este demonstrador verifica **parte** do comportamento R02,
nao a atualizacao em tempo real em um sistema de restaurante.

## R09: ampliacao do texto (extensao do prototipo)

Esta extensao nao constava da demonstracao documentada no PDF anterior.
Ela permite experimentar parte do requisito de acessibilidade com dados
ficticios, sem afirmar conformidade completa com as WCAG.

**Criterio proposto:** dado o cardapio aberto no celular, quando o usuario
selecionar texto a 200% ou ampliar a pagina no navegador, os itens, precos,
estados e controles devem continuar legiveis e operaveis, sem corte de conteudo.
Os controles de itens distintos devem ter nomes acessiveis que incluam o item.

**Plano:** incluir um seletor nativo de tamanho de texto, usar unidades
relativas e permitir que cabecalhos, precos e controles se rearranjem em
telas estreitas. Preservar o zoom do navegador e a navegacao por teclado.

**Verificacao:** testar manualmente as opcoes 100%, 150% e 200% e o zoom do
navegador, com viewport de 320 CSS px, navegando so com teclado. Executar
uma auditoria automatica para apontar problemas que a inspecao manual nao
captura. A auditoria nao substitui testes com usuarios ou leitores de tela.
