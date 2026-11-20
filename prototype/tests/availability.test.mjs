import test from 'node:test';
import assert from 'node:assert/strict';
import { addToOrder, closeOrder, removeFromOrder, setAvailability } from '../availability.mjs';

const initialState = () => ({
  items: [
    { id: 'entrada', available: true },
    { id: 'bebida', available: true },
  ],
  order: [],
});

test('R02: esgotar um item impede novas adicoes, mesmo fora do botao', () => {
  const unavailable = setAvailability(initialState(), 'entrada', false);
  const result = addToOrder(unavailable, 'entrada');

  assert.equal(unavailable.items[0].available, false);
  assert.equal(result.accepted, false);
  assert.equal(result.state.order.length, 0);
});

test('R02: esgotar um item nao altera a disponibilidade de outro', () => {
  const unavailable = setAvailability(initialState(), 'entrada', false);
  const result = addToOrder(unavailable, 'bebida');

  assert.equal(unavailable.items[1].available, true);
  assert.equal(result.accepted, true);
  assert.deepEqual(result.state.order, ['bebida']);
});

test('R02: apos voltar a disponibilizar, item pode ser adicionado', () => {
  const unavailable = setAvailability(initialState(), 'entrada', false);
  const restored = setAvailability(unavailable, 'entrada', true);
  const result = addToOrder(restored, 'entrada');

  assert.equal(result.accepted, true);
  assert.deepEqual(result.state.order, ['entrada']);
});

test('R02: item inexistente nao pode entrar no pedido', () => {
  assert.throws(() => addToOrder(initialState(), 'outro'), RangeError);
});

test('cesta: retirar uma unidade preserva as demais', () => {
  const first = addToOrder(initialState(), 'entrada').state;
  const second = addToOrder(first, 'entrada').state;
  const updated = removeFromOrder(second, 'entrada');

  assert.deepEqual(updated.order, ['entrada']);
  assert.deepEqual(second.order, ['entrada', 'entrada']);
});

test('cesta: nao finaliza vazia ou com item esgotado apos a adicao', () => {
  const empty = initialState();
  assert.equal(closeOrder(empty).accepted, false);

  const withEntry = addToOrder(empty, 'entrada').state;
  const unavailable = setAvailability(withEntry, 'entrada', false);
  const result = closeOrder(unavailable);

  assert.equal(result.accepted, false);
  assert.deepEqual(result.state.order, ['entrada']);
});

test('cesta: apos retirar o item esgotado, finaliza e limpa somente o pedido atual', () => {
  const withEntry = addToOrder(initialState(), 'entrada').state;
  const withDrink = addToOrder(withEntry, 'bebida').state;
  const unavailable = setAvailability(withDrink, 'entrada', false);
  const ready = removeFromOrder(unavailable, 'entrada');
  const result = closeOrder(ready);

  assert.equal(result.accepted, true);
  assert.deepEqual(result.order, ['bebida']);
  assert.deepEqual(result.state.order, []);
  assert.equal(result.state.items[0].available, false);
  assert.equal(closeOrder(result.state).accepted, false);
});
