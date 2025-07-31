import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [location]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.classList.toggle('body-lock', open);
    return () => document.body.classList.remove('body-lock');
  }, [open]);

  // Sticky navbar with "scrolled" elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        {/* Home always goes to top anchor on home page */}
        <NavLink to="/#top" className="brand" aria-label="Books Archives • Home">
          <span role="img" aria-label="books">📚</span>
          <span className="brand-name">Books Archives</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/#top" end>Home</NavLink>
          <NavLink to="/books">Browse Books</NavLink>
          <NavLink to="/add" className="cta">Add Book</NavLink>
        </nav>

        <button
          className="hamburger"
          aria-label="Open menu"
          aria-controls="mobile-drawer"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <svg width="22" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="24" height="2" y="0" fill="currentColor"/>
            <rect width="24" height="2" y="8" fill="currentColor"/>
            <rect width="24" height="2" y="16" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* Scrim & Drawer (background blur) */}
      <div className={`scrim ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside id="mobile-drawer" className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-top">
          <button className="close-x" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="nav-group">
          <NavLink to="/#top" end className="nav-btn">Home</NavLink>
          <NavLink to="/books" className="nav-btn secondary">Browse Books</NavLink>
          <NavLink to="/add" className="nav-btn strong">Add Book</NavLink>
        </div>
      </aside>
    </header>
  );
}
