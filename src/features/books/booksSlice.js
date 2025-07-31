// src/features/books/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import booksData from '../../data/books.seed.json';

// Normalize a few common fields that might be missing in some entries
const books = booksData.map((b) => ({
  id: b.id,
  title: b.title,
  author: b.author,
  category: b.category || 'Uncategorized',
  year: b.year ?? b.published ?? null,
  publisher: b.publisher || '',
  language: b.language || 'English',
  description: b.description || '',
  rating: typeof b.rating === 'number' ? b.rating : (b.goodreads_rating ? Number(b.goodreads_rating) : null),
  ratingsCount: b.ratingsCount || b.goodreads_count || '',
  bestseller: Boolean(b.bestseller),
  image: b.image || b.cover_image || '',
  buy: b.buy || b.buy_link || '',
  isNew: Boolean(b.isNew),
  isTop: Boolean(b.isTop),
  review: b.review || ''
}));

const initialState = {
  books,
  query: '',
  category: 'all'
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    addBook(state, action) {
      const nextId = state.books.length ? Math.max(...state.books.map((b) => b.id)) + 1 : 1;
      state.books.unshift({ id: nextId, ...action.payload });
    }
  }
});

export const { setQuery, setCategory, addBook } = booksSlice.actions;

/* Base selectors */
export const selectBooks = (state) => state.books.books;
export const selectQuery = (state) => state.books.query;
export const selectCategory = (state) => state.books.category;

/* Derived selectors */
export const selectCategories = (state) => {
  const set = new Set(state.books.books.map((b) => b.category || 'Uncategorized'));
  return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
};

export const selectFilteredBooks = (state) => {
  const q = (state.books.query || '').trim().toLowerCase();
  const cat = state.books.category;

  let list = state.books.books;

  if (cat && cat !== 'all') {
    list = list.filter((b) => (b.category || '').toLowerCase() === cat.toLowerCase());
  }

  if (q) {
    list = list.filter((b) => {
      const title = (b.title || '').toLowerCase();
      const author = (b.author || '').toLowerCase();
      return title.includes(q) || author.includes(q);
    });
  }

  // Optional: sort by isTop, then rating desc, then title
  list = [...list].sort((a, b) => {
    if (a.isTop !== b.isTop) return b.isTop - a.isTop;
    const ra = a.rating ?? 0, rb = b.rating ?? 0;
    if (rb !== ra) return rb - ra;
    return a.title.localeCompare(b.title);
  });

  return list;
};

export const selectBookById = (state, id) =>
  state.books.books.find((b) => String(b.id) === String(id));

export default booksSlice.reducer;
