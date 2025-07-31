import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks, selectCategory, setCategory } from '../features/books/booksSlice';

export default function CategoryDropdown() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const current = useSelector(selectCategory);

  const cats = useMemo(() => {
    const set = new Set(books.map(b => b.category).filter(Boolean));
    return ['All', ...Array.from(set).sort((a,b)=>a.localeCompare(b))];
  }, [books]);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Click outside
  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function choose(cat) {
    dispatch(setCategory(cat));
    setOpen(false);
  }

  return (
    <div className="dropdown" ref={wrapRef}>
      <button
        type="button"
        className="drop-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="cat-menu"
        onClick={() => setOpen(v => !v)}
      >
        Categories: <strong>{current}</strong>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
        </svg>
      </button>

      <div id="cat-menu" className={`menu ${open ? 'open' : ''}`} role="menu">
        <ul>
          {cats.map(c => (
            <li key={c}>
              <button
                onClick={() => choose(c)}
                role="menuitem"
                aria-current={current === c ? 'true' : 'false'}
              >
                {current === c ? '✓ ' : ''}{c}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
