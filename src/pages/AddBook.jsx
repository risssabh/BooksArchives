import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../features/books/booksSlice';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Fiction / Literary Fiction',
    year: '',
    publisher: '',
    language: 'English',
    description: '',
    review: '',
    rating: '',
    ratingsCount: '',
    image: '',
    buy: '',
    isNew: false,
    isTop: false
  });

  const [errors, setErrors] = useState({});

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    if (form.rating && (Number(form.rating) < 0 || Number(form.rating) > 5)) e.rating = 'Rating must be 0–5';
    if (form.year && (Number(form.year) < 0 || Number(form.year) > 2100)) e.year = 'Enter a valid year';
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    const payload = {
      ...form,
      year: form.year ? Number(form.year) : undefined,
      rating: form.rating ? Number(form.rating) : undefined
    };

    dispatch(addBook(payload));
    navigate('/books');
  }

  function FieldError({ name }) {
    return errors[name] ? (
      <div className="help" role="alert" style={{ color: '#532c2e' }}>
        {errors[name]}
      </div>
    ) : null;
  }

  return (
    <section className="container">
      <h1>Add a Book</h1>
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" className="input" value={form.title} onChange={onChange} placeholder="Book title" />
            <FieldError name="title" />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input id="author" name="author" className="input" value={form.author} onChange={onChange} placeholder="Author name" />
            <FieldError name="author" />
          </div>
        </div>

        <div className="form-row-3" style={{ marginTop: 12 }}>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="select" value={form.category} onChange={onChange}>
              <option>Fiction / Literary Fiction</option>
              <option>Mystery / Thriller</option>
              <option>Science Fiction</option>
              <option>Fantasy</option>
              <option>Horror</option>
              <option>Historical Fiction</option>
              <option>Romance / Contemporary Romance</option>
              <option>Science & Nature</option>
              <option>Manga / Manhwa</option>
              <option>Self‑Help / Personal Development</option>
              <option>Non‑Fiction</option>
            </select>
          </div>
          <div>
            <label htmlFor="year">Publish Year</label>
            <input id="year" name="year" type="number" className="input" value={form.year} onChange={onChange} placeholder="e.g., 2018" />
            <FieldError name="year" />
          </div>
          <div>
            <label htmlFor="publisher">Publisher</label>
            <input id="publisher" name="publisher" className="input" value={form.publisher} onChange={onChange} placeholder="Publisher" />
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 12 }}>
          <div>
            <label htmlFor="language">Language</label>
            <input id="language" name="language" className="input" value={form.language} onChange={onChange} placeholder="English" />
          </div>
          <div>
            <label htmlFor="image">Cover Image URL</label>
            <input id="image" name="image" className="input" value={form.image} onChange={onChange} placeholder="https://…" />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="buy">Buy / Publisher Link</label>
          <input id="buy" name="buy" className="input" value={form.buy} onChange={onChange} placeholder="https://…" />
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" className="textarea" value={form.description} onChange={onChange} placeholder="Short synopsis…" />
        </div>

        <div style={{ marginTop: 12 }}>
          <label htmlFor="review">Review (optional)</label>
          <textarea id="review" name="review" className="textarea" value={form.review} onChange={onChange} placeholder="Your short review or pull‑quote…" />
        </div>

        <div className="form-row" style={{ marginTop: 12 }}>
          <div>
            <label htmlFor="rating">Rating (0–5)</label>
            <input id="rating" name="rating" type="number" step="0.1" min="0" max="5" className="input" value={form.rating} onChange={onChange} placeholder="e.g., 4.3" />
            <FieldError name="rating" />
          </div>
          <div>
            <label htmlFor="ratingsCount">Ratings Count (text)</label>
            <input id="ratingsCount" name="ratingsCount" className="input" value={form.ratingsCount} onChange={onChange} placeholder="e.g., 1.2M" />
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 12 }}>
          <label className="switch">
            <input type="checkbox" name="isNew" checked={form.isNew} onChange={onChange} />
            <span>Mark as New Launch</span>
          </label>
          <label className="switch">
            <input type="checkbox" name="isTop" checked={form.isTop} onChange={onChange} />
            <span>Mark as Top Read</span>
          </label>
        </div>

        <div className="form-actions">
          <button className="btn" type="submit">Add Book</button>
          <button className="btn outline" type="button" onClick={() => navigate('/books')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
