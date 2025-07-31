export const getById = (state, id) => state.books.items.find(b => b.id === id);
