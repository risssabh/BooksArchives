import { useDispatch, useSelector } from 'react-redux';
import { CATEGORIES } from '../data/categories';
import { setCategory, selectCategory } from '../features/books/booksSlice';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function CategoryPills() {
  const dispatch = useDispatch();
  const active = useSelector(selectCategory);
  const { category } = useParams();

  // sync Redux with route param
  useEffect(() => {
    if (category) dispatch(setCategory(decodeURIComponent(category)));
    else dispatch(setCategory('All'));
  }, [category, dispatch]);

  return (
    <div className="pills">
      <Link to="/books" className={active === 'All' ? 'pill active' : 'pill'}>All</Link>
      {CATEGORIES.map(cat => (
        <Link
          key={cat}
          to={`/books/${encodeURIComponent(cat)}`}
          className={active === cat ? 'pill active' : 'pill'}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
