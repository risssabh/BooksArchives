import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuery, setQuery } from '../features/books/booksSlice';

export default function SearchBar({ focusOnMount = false }) {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [focusOnMount]);

  return (
    <div className="search-wrap" role="search">
      <svg className="search-ico" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>

      <input
        ref={inputRef}
        className="search"
        placeholder="Search by title or author…"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        aria-label="Search books by title or author"
      />

      {query ? (
        <button
          type="button"
          className="clear-btn"
          aria-label="Clear search"
          onClick={() => dispatch(setQuery(''))}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
