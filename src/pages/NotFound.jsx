import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="center">
      <h1>404 — Page Not Found</h1>
      <p className="muted">The page you’re looking for doesn’t exist.</p>
      <Link className="btn" to="/">Back to Home</Link>
    </section>
  );
}
