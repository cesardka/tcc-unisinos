# Prova de conceito do TCC: R01, R02, R06 e R09

Esta pasta acompanha o artigo do TCC. A pagina implementa parcialmente quatro
requisitos do catalogo, descritos em `spec.md`. Os itens, os precos e a
operacao sao ficticios; o aviso expansivel no inicio da pagina deixa isso
explicito. O demonstrador nao foi usado por nenhum estabelecimento estudado.
As imagens em `assets/` sao ilustracoes, nao fotografias dos pratos nem dos
restaurantes pesquisados, e nao correspondem a um requisito.

Endereco publico: https://cade-o-cardapio-tcc.vercel.app

## Reproduzir

Na raiz do projeto:

```sh
node --test prototype/tests/availability.test.mjs
python3 -m http.server 8766 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8766/prototype/`. O servidor local e necessario para
importar os modulos ES no navegador.

## O que experimentar

- **R02:** em "Controle do operador", marque um item como esgotado. Ele exibe
  "Esgotado" e nao pode ser adicionado; o outro item continua disponivel.
  A inclusao de itens novos e a propagacao entre aparelhos, que tambem fazem
  parte de R02 no catalogo atual, nao foram implementadas.
- **R01:** adicione itens, abra "Ver cesta", ajuste as unidades com "+" e "-"
  e toque "Enviar para cozinha". A cesta fica vazia e "Seus pedidos" mostra o
  numero e o estado "Recebido". Com um item esgotado na cesta, o envio fica
  bloqueado.
- **R09:** escolha 150% ou 200% em "Tamanho do texto" ou use o zoom do navegador.
- **R06:** os relatorios estao em `analysis/auditoria/relatorios/prototipo_*.json`.

## Resultados da verificacao (20/11/2026)

- Oito testes automatizados passaram: quatro de R02 e quatro de R01.
- **R01 e R02**, inspecao manual no Chrome: o fluxo descrito acima funcionou com
  mouse e teclado (Tab, Enter, Espaco e Esc para fechar a cesta).
- **R09**, inspecao manual no Chrome em 320 CSS px: sem rolagem horizontal com
  texto a 100%, 150% e 200%, inclusive na cesta. O Lighthouse nao apontou falhas
  automaticas de acessibilidade (pontuacao 100), e as auditorias `meta-viewport`
  e `color-contrast` passaram. O gesto de pinca, leitores de tela e o uso por
  participantes nao foram testados.
- **R06**, Lighthouse 13.5.0 em servidor local, perfil movel com limitacao
  simulada: LCP de 1,28 s nas tres execucoes (meta de ate 2,5 s), FCP de 0,98 s
  e 31 KB transferidos. A primeira execucao registrou TBT de 724 ms; as outras,
  0 ms. O servidor local elimina a latencia real do servidor.

O prototipo nao valida a relevancia ou a completude do catalogo, nao comprova
a arquitetura dos fornecedores e nao envia pedidos a um restaurante. O estado
existe apenas na memoria da aba aberta.
