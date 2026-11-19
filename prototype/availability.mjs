export function setAvailability(state, id, available) {
  if (!state.items.some((item) => item.id === id)) {
    throw new RangeError(`Item desconhecido: ${id}`);
  }

  return {
    ...state,
    items: state.items.map((item) =>
      item.id === id ? { ...item, available } : item
    ),
  };
}

export function addToOrder(state, id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) {
    throw new RangeError(`Item desconhecido: ${id}`);
  }

  if (!item.available) {
    return { state, accepted: false };
  }

  return {
    state: { ...state, order: [...state.order, id] },
    accepted: true,
  };
}
