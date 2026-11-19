import test from 'node:test';
import assert from 'node:assert/strict';
import { addToOrder, setAvailability } from '../availability.mjs';

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
