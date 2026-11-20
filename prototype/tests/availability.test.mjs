import test from 'node:test';
import assert from 'node:assert/strict';
import { addToOrder, closeOrder, removeFromOrder, setAvailability } from '../availability.mjs';

const initialState = () => ({
  items: [
    { id: 'entrada', available: true },
    { id: 'bebida', available: true },
  ],
  order: [],
  orders: [],
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

test('R01: retirar uma unidade da cesta preserva as demais', () => {
  const first = addToOrder(initialState(), 'entrada').state;
  const second = addToOrder(first, 'entrada').state;
  const updated = removeFromOrder(second, 'entrada');

  assert.deepEqual(updated.order, ['entrada']);
  assert.deepEqual(second.order, ['entrada', 'entrada']);
});

test('R01: cesta vazia ou com item esgotado nao gera pedido', () => {
  const empty = initialState();
  assert.equal(closeOrder(empty).accepted, false);

  const withEntry = addToOrder(empty, 'entrada').state;
  const unavailable = setAvailability(withEntry, 'entrada', false);
  const result = closeOrder(unavailable);

  assert.equal(result.accepted, false);
  assert.deepEqual(result.state.order, ['entrada']);
  assert.deepEqual(result.state.orders, []);
});

test('R01: enviar registra o pedido como recebido e esvazia a cesta', () => {
  const withEntry = addToOrder(initialState(), 'entrada').state;
  const withDrink = addToOrder(withEntry, 'bebida').state;
  const unavailable = setAvailability(withDrink, 'entrada', false);
  const ready = removeFromOrder(unavailable, 'entrada');
  const result = closeOrder(ready);

  assert.equal(result.accepted, true);
  assert.deepEqual(result.order, { number: 1, items: ['bebida'], status: 'recebido' });
  assert.deepEqual(result.state.order, []);
  assert.deepEqual(result.state.orders, [result.order]);
  assert.equal(result.state.items[0].available, false);
  assert.equal(closeOrder(result.state).accepted, false);
});

test('R01: pedidos seguintes recebem numeros sequenciais', () => {
  const first = closeOrder(addToOrder(initialState(), 'bebida').state).state;
  const second = closeOrder(addToOrder(first, 'entrada').state);

  assert.deepEqual(second.state.orders.map(({ number }) => number), [1, 2]);
});
