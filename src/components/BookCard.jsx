import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const stars = renderStars(book?.rating);
  const reviewText =
    book?.review ||
    (book?.description ? book.description.slice(0, 140) + (book.description.length > 140 ? '…' : '') : '');

  return (
    <article className="card">
      <div className="cover">
        {book?.image
          ? <img src={book.image} alt={`${book.title} cover`} />
          : <img src="/images/placeholder-3x4.jpg" alt="" />}
      </div>
      <div className="card-body">
        <h3 className="card-title line-clamp">{book?.title}</h3>
        <div className="card-meta">{book?.author}</div>
        {/* Rating & quick review */}
        {(book?.rating || reviewText) && (
          <div className="card-review">
            {book?.rating ? <span className="stars" aria-label={`Rating ${book.rating}`}>{stars}</span> : null}
            {book?.rating ? <span style={{marginLeft:6}}>({book.rating})</span> : null}
            {reviewText ? <div className="line-clamp" style={{marginTop:6}}>{reviewText}</div> : null}
          </div>
        )}
        <div className="card-actions">
          <Link className="btn" to={`/books/${book?.id}`}>View Details</Link>
          {book?.buy ? (
            <a className="btn outline" href={book.buy} target="_blank" rel="noreferrer">Buy</a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function renderStars(r) {
  if (!r) return '☆☆☆☆☆';
  const full = Math.round(Number(r));
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(full);
}
