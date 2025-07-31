import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBooks } from '../features/books/booksSlice';
import BookCard from '../components/BookCard';

export default function Home() {
  const all = useSelector(selectBooks);

  const popular = all.slice(0, 6);
  const newLaunches = all.filter(b => b.isNew).slice(0, 6);
  const topReads = (all.filter(b => b.isTop).length
    ? all.filter(b => b.isTop)
    : [...all].sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0))).slice(0, 6);

  return (
    <section className="home">
      {/* TOP ANCHOR */}
      <div id="top"></div>

      <div className="container">
        <div className="hero fade-in">
          <h1>Welcome to <span className="brand-emph">Books Archives</span></h1>
          <p>Explore a living, library‑inspired collection. Browse by category, search by title or author, and add your picks.</p>

          {/* chips scroll to sections */}
          <div className="hero-badges">
            <a href="#new-launches" className="chip-btn">📚 New Launches</a>
            <a href="#top-reads" className="chip-btn">⭐ Top Reads</a>
            <Link to="/books?focus=search" className="chip-btn">🔎 Search &amp; Filter</Link>
          </div>

          <div className="hero-actions" style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
            <Link className="btn" to="/books">Browse Books</Link>
            <Link className="btn outline" to="/add">Add Book</Link>
          </div>
        </div>

        <h2 className="section-title">Popular Books</h2>
        <div className="grid">
          {popular.map(b => <BookCard key={b.id} book={b} />)}
        </div>

        <h2 id="new-launches" className="section-title">New Launches</h2>
        <div className="grid">
          {newLaunches.map(b => <BookCard key={b.id} book={b} />)}
          {!newLaunches.length && <p className="muted">No new launches flagged yet.</p>}
        </div>

        <h2 id="top-reads" className="section-title">Top Reads</h2>
        <div className="grid">
          {topReads.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      </div>
    </section>
  );
}
