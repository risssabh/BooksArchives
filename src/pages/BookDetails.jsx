// src/pages/BookDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../features/books/booksSlice';

export default function BookDetails() {
  const { id } = useParams();
  const book = useSelector((state) => selectBookById(state, id));

  if (!book) {
    return (
      <section className="container">
        <p>Book not found.</p>
        <Link className="btn outline" to="/books">Back to Browse</Link>
      </section>
    );
  }

  const stars = renderStars(book.rating);

  return (
    <section className="container">
      <div className="details">
        <div className="details-hero">
          <div className="cover">
            {book.image ? <img src={book.image} alt={`${book.title} cover`} /> : <img src="/images/placeholder-3x4.jpg" alt="" />}
          </div>
          <div>
            <h1>{book.title}</h1>
            <div className="card-meta">{book.author}</div>

            <div className="card-review" style={{ marginTop: 8 }}>
              {book.rating ? <span className="stars">{stars}</span> : null}
              {book.rating ? <span style={{ marginLeft: 6 }}>({book.rating})</span> : null}
              {book.ratingsCount ? <span style={{ marginLeft: 8, opacity: .85 }}>{book.ratingsCount}</span> : null}
              {book.bestseller ? <span style={{ marginLeft: 10 }}>• Bestseller</span> : null}
            </div>

            <p style={{ marginTop: 12 }}>{book.description}</p>

            <div className="meta-grid">
              <div className="meta-item"><strong>Category:</strong> {book.category}</div>
              <div className="meta-item"><strong>Year:</strong> {book.year || '—'}</div>
              <div className="meta-item"><strong>Publisher:</strong> {book.publisher || '—'}</div>
              <div className="meta-item"><strong>Language:</strong> {book.language || '—'}</div>
            </div>

            <div className="details-actions">
              <Link className="btn outline" to="/books">Back to Browse</Link>
              {book.buy ? (
                <a className="btn" href={book.buy} target="_blank" rel="noreferrer">Buy / Publisher</a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderStars(r) {
  if (!r) return '☆☆☆☆☆';
  const full = Math.round(Number(r));
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(full);
}
