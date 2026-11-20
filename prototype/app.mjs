import { addToOrder, closeOrder, removeFromOrder, setAvailability } from './availability.mjs';

const cards = new Map(
  [...document.querySelectorAll('[data-item-id]')].map((card) => [
    card.dataset.itemId,
    card,
  ])
);
const items = new Map(
  [...cards].map(([id, card]) => [
    id,
    {
      name: card.querySelector('h3').textContent,
      priceCents: Number(card.dataset.priceCents),
    },
  ])
);
const catalog = document.querySelector('[data-catalog]');
const orderCount = document.querySelector('[data-order-count]');
const announcement = document.querySelector('[data-announcement]');
const textSize = document.querySelector('[data-text-size]');
const cart = document.querySelector('[data-cart]');
const cartItems = cart.querySelector('[data-cart-items]');
const cartEmpty = cart.querySelector('[data-cart-empty]');
const cartTotal = cart.querySelector('[data-cart-total]');
const cartHelp = cart.querySelector('[data-cart-help]');
const cartFeedback = cart.querySelector('[data-cart-feedback]');
const closeOrderButton = cart.querySelector('[data-close-order]');
const kitchen = document.querySelector('[data-kitchen]');
const kitchenOrders = kitchen.querySelector('[data-kitchen-orders]');
const kitchenTitle = kitchen.querySelector('h2');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

let state = {
  items: [...cards.keys()].map((id) => ({ id, available: true })),
  order: [],
};
let nextOrderNumber = 1;

function formatPrice(cents) {
  return currency.format(cents / 100);
}

function textElement(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function orderLines(order) {
  const quantities = new Map();
  for (const id of order) {
    quantities.set(id, (quantities.get(id) ?? 0) + 1);
  }
  return [...quantities].map(([id, quantity]) => ({ id, quantity, ...items.get(id) }));
}

function renderCart() {
  const lines = orderLines(state.order);
  const unavailable = lines.some(({ id }) =>
    !state.items.find((item) => item.id === id).available
  );

  cartItems.replaceChildren(...lines.map(({ id, name, priceCents, quantity }) => {
    const available = state.items.find((item) => item.id === id).available;
    const row = document.createElement('li');
    row.className = 'cart-item';
    const details = document.createElement('div');
    details.className = 'cart-details';
    details.append(
      textElement('strong', name),
      textElement('small', `${formatPrice(priceCents)} cada`)
    );
    if (!available) details.append(textElement('span', 'Esgotado: retire da cesta para finalizar.', 'cart-unavailable'));

    const controls = document.createElement('div');
    controls.className = 'cart-quantity';
    for (const [action, label] of [['remove', 'Menos'], ['add', 'Mais']]) {
      const button = textElement('button', label);
      button.type = 'button';
      button.dataset.cartAction = action;
      button.dataset.itemId = id;
      button.setAttribute('aria-label', `${label}: ${name}`);
      button.disabled = action === 'add' && !available;
      if (action === 'add') controls.append(textElement('span', `${quantity} un.`));
      controls.append(button);
    }

    row.append(details, controls, textElement('strong', formatPrice(priceCents * quantity), 'cart-subtotal'));
    return row;
  }));

  cartEmpty.hidden = lines.length > 0;
  cartTotal.textContent = formatPrice(lines.reduce(
    (total, { priceCents, quantity }) => total + priceCents * quantity, 0
  ));
  const instruction = !lines.length
    ? 'Adicione itens à cesta pelo cardápio antes de finalizar. '
    : unavailable
      ? 'Retire os itens esgotados da cesta antes de finalizar. '
      : '';
  cartHelp.textContent = `${instruction}Simulação: o pedido aparece somente nesta aba; nenhuma cozinha real o recebe.`;
  closeOrderButton.disabled = !lines.length || unavailable;
}

function render() {
  for (const item of state.items) {
    const card = cards.get(item.id);
    const name = items.get(item.id).name;
    const addButton = card.querySelector('[data-order]');
    const toggleButton = card.querySelector('[data-toggle]');
    card.querySelector('.price').textContent = formatPrice(items.get(item.id).priceCents);
    card.dataset.available = String(item.available);
    card.querySelector('[data-status]').textContent = item.available
      ? 'Disponível'
      : 'Esgotado';
    addButton.disabled = !item.available;
    addButton.setAttribute('aria-label', `Adicionar ${name}`);
    toggleButton.textContent = item.available
      ? 'Marcar como esgotado'
      : 'Voltar a disponibilizar';
    toggleButton.setAttribute('aria-label', `${toggleButton.textContent}: ${name}`);
  }

  orderCount.textContent = String(state.order.length);
  renderCart();
}

function showKitchenOrder(order) {
  const lines = orderLines(order);
  const receipt = document.createElement('li');
  receipt.className = 'kitchen-order';
  receipt.append(textElement('h3', `Pedido ${nextOrderNumber++}`));

  const list = document.createElement('ul');
  for (const { name, quantity, priceCents } of lines) {
    list.append(textElement('li', `${quantity} × ${name} — ${formatPrice(priceCents * quantity)}`));
  }
  receipt.append(list, textElement('p', `Total: ${formatPrice(lines.reduce(
    (total, { priceCents, quantity }) => total + priceCents * quantity, 0
  ))}`));

  kitchen.hidden = false;
  kitchenOrders.append(receipt);
}

textSize.addEventListener('change', () => {
  document.documentElement.style.fontSize = `${textSize.value}%`;
});

document.querySelector('[data-open-cart]').addEventListener('click', () => {
  cartFeedback.textContent = '';
  cart.showModal();
});

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-cart-action]');
  if (!button) return;

  const { itemId: id, cartAction: action } = button.dataset;
  const name = items.get(id).name;
  if (action === 'add') {
    const result = addToOrder(state, id);
    state = result.state;
    cartFeedback.textContent = result.accepted
      ? `Mais uma unidade de ${name} na cesta.`
      : `${name} está esgotado.`;
  } else {
    state = removeFromOrder(state, id);
    cartFeedback.textContent = `Uma unidade de ${name} retirada da cesta.`;
  }

  render();
  const nextButton = [...cartItems.querySelectorAll('button[data-cart-action]')]
    .find((entry) => entry.dataset.itemId === id && entry.dataset.cartAction === action && !entry.disabled);
  (nextButton ?? cart.querySelector('.cart-back')).focus();
});

closeOrderButton.addEventListener('click', () => {
  const result = closeOrder(state);
  if (!result.accepted) return;

  state = result.state;
  showKitchenOrder(result.order);
  render();
  cart.close();
  announcement.textContent = 'Pedido registrado na cozinha de demonstração nesta aba; nenhum envio real foi feito.';
  kitchenTitle.focus();
});

catalog.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const card = button.closest('[data-item-id]');
  const id = card.dataset.itemId;
  const name = items.get(id).name;

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
      ? `Uma unidade de ${name} entrou na cesta.`
      : `${name} está esgotado.`;
  }

  render();
});

render();
