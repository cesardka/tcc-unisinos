import { addToOrder, setAvailability } from './availability.mjs';

const cards = new Map(
  [...document.querySelectorAll('[data-item-id]')].map((card) => [
    card.dataset.itemId,
    card,
  ])
);
const catalog = document.querySelector('[data-catalog]');
const orderCount = document.querySelector('[data-order-count]');
const announcement = document.querySelector('[data-announcement]');

let state = {
  items: [...cards.keys()].map((id) => ({ id, available: true })),
  order: [],
};

function render() {
  for (const item of state.items) {
    const card = cards.get(item.id);
    card.dataset.available = String(item.available);
    card.querySelector('[data-status]').textContent = item.available
      ? 'Disponível'
      : 'Esgotado';
    card.querySelector('[data-order]').disabled = !item.available;
    card.querySelector('[data-toggle]').textContent = item.available
      ? 'Marcar como esgotado'
      : 'Voltar a disponibilizar';
  }

  orderCount.textContent = String(state.order.length);
}

catalog.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const card = button.closest('[data-item-id]');
  const id = card.dataset.itemId;
  const name = card.querySelector('h3').textContent;

  if (button.dataset.action === 'toggle') {
    const item = state.items.find((entry) => entry.id === id);
    state = setAvailability(state, id, !item.available);
    announcement.textContent = state.items.find((entry) => entry.id === id).available
      ? `${name} voltou ao cardápio.`
      : `${name} está esgotado e não pode ser pedido.`;
  } else if (button.dataset.action === 'add') {
    const result = addToOrder(state, id);
    state = result.state;
    announcement.textContent = result.accepted
      ? `${name} adicionado ao pedido.`
      : `${name} está esgotado.`;
  }

  render();
});

render();
