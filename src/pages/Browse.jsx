// src/pages/Browse.jsx
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredBooks,
  selectCategories,
  selectCategory,
  selectQuery,
  setCategory,
  setQuery
} from '../features/books/booksSlice';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

export default function Browse() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Redux state
  const books = useSelector(selectFilteredBooks);
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectCategory);
  const query = useSelector(selectQuery);

  // Local dropdown state/refs
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  // Query param to optionally focus the search input: /books?focus=search
  const focusSearch = new URLSearchParams(location.search).get('focus') === 'search';

  // Close dropdown on outside click or Esc
  useEffect(() => {
    function handleDocClick(e) {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Ensure dropdown sits above the grid
  useEffect(() => {
    document.documentElement.style.setProperty('--z-dropdown', 1050);
  }, []);

  return (
    <section className="container">
      {/* Toolbar with Category dropdown + Search */}
      <header className="toolbar" style={{ rowGap: 10 }}>
        {/* Category Dropdown */}
        <div className="dropdown" ref={ddRef}>
          <button
            className="drop-btn"
            type="button"
            id="catBtn"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {activeCategory === 'all' ? 'All Categories' : activeCategory}
            <svg width="18" height="18" style={{ marginInlineStart: 6 }} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#fff" d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          <div className={`menu ${open ? 'open' : ''}`} role="listbox" aria-labelledby="catBtn">
            <ul>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    role="option"
                    aria-selected={activeCategory === cat}
                    onClick={() => {
                      dispatch(setCategory(cat));
                      setOpen(false); // close after selecting
                    }}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fancy Search (keeps your theme) */}
        <SearchBar focusOnMount={focusSearch} />

        {/* Clear filters button appears only when needed */}
        {(activeCategory !== 'all' || query) && (
          <button
            className="btn outline"
            onClick={() => {
              dispatch(setCategory('all'));
              dispatch(setQuery(''));
            }}
          >
            Clear
          </button>
        )}
      </header>

      {/* Books grid */}
      <div className="grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Empty state */}
      {!books.length && (
        <p className="muted" style={{ marginTop: 16 }}>
          No books match your search. Try another title/author or reset filters.
        </p>
      )}
    </section>
  );
}
