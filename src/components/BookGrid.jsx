import BookCard from './BookCard';

export default function BookGrid({ books }) {
  if (!books.length) return <p className="muted">No books match your filters.</p>;
  return (
    <section className="grid">
      {books.map(b => <BookCard key={b.id} book={b} />)}
    </section>
  );
}
