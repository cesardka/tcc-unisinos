# Prova de conceito documental e tecnica - R02 e R09

Esta pasta acompanha o artigo do TCC. Os itens, os precos e a operacao sao
ficticios; um aviso no inicio da pagina deixa isso explicito. O demonstrador
nao foi usado por nenhum estabelecimento estudado.

## Reproduzir

Na raiz do projeto:

```sh
node --test prototype/tests/availability.test.mjs
python3 -m http.server 8766 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8766/prototype/` e marque um item como esgotado.
Confirme que ele exibe "Esgotado", nao pode ser adicionado e que outro item
ainda pode ser adicionado. Depois disponibilize o primeiro item novamente.
O servidor local e necessario para importar os modulos ES no navegador.

## Experimentar a extensao R09

No mesmo cardapio, selecione "200%" em "Tamanho do texto". Os itens, os
precos, os estados e os botoes devem continuar visiveis e operaveis em tela
estreita. Confira tambem o zoom do navegador e percorra os controles usando
Tab, Enter e Espaco. Na arvore de acessibilidade, os nomes dos botoes
devem incluir o nome do item.

Essa extensao foi feita depois da versao do PDF que descreve somente os
testes de R02. Ela nao representa verificacao completa das WCAG, nem teste
com participantes. O seletor nao salva preferencias entre visitas.

Em verificacao local no Chrome, a viewport movel de 320 CSS px nao apresentou
rolagem horizontal nas opcoes 100%, 150% e 200%. Tab, Enter e Espaco
permitiram adicionar e esgotar um item; ao esgotar, o botao "Adicionar"
ficou desabilitado. Uma auditoria Lighthouse movel nao apontou falhas
automaticas de acessibilidade (pontuacao 100). Isso nao substitui uma
avaliacao manual com leitor de tela: o zoom nativo do navegador e o uso
por participantes ainda nao foram testados.

## Rastreabilidade

| Etapa | Artefato |
| --- | --- |
| Necessidade empirica e limite | Tabela R02 e matriz do Apendice G do TCC |
| Especificacao, plano e tarefas | `spec.md` (R02 e extensao R09) |
| Implementacao da regra | `availability.mjs` |
| Demonstracao visual de R02 e ampliacao de R09 | `index.html`, `app.mjs`, `styles.css` |
| Verificacao automatizada de R02 | `tests/availability.test.mjs` |

Os testes de Node.js verificam a regra de negocio. A verificacao visual e
manual, no navegador. R06 continua sem medicao nesta prova de conceito.
O prototipo nao valida a relevancia ou a completude do catalogo de
requisitos, nem comprova a arquitetura dos fornecedores.
