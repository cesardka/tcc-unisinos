# Prova de conceito documental e tecnica - R02

Esta pasta acompanha o artigo do TCC. Os itens, os precos e a operacao sao
ficticios; o demonstrador nao foi usado por nenhum estabelecimento estudado.

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

## Rastreabilidade

| Etapa | Artefato |
| --- | --- |
| Necessidade empirica e limite | Tabela R02 e matriz do Apendice G do TCC |
| Especificacao, plano e tarefas | `spec.md` |
| Implementacao da regra | `availability.mjs` |
| Demonstracao visual da regra | `index.html`, `app.mjs`, `styles.css` |
| Verificacao automatizada | `tests/availability.test.mjs` |

Os testes de Node.js verificam a regra de negocio. A verificacao visual e
manual, no navegador. O prototipo nao valida a relevancia ou a completude
do catalogo de requisitos, nem comprova a arquitetura dos fornecedores.
