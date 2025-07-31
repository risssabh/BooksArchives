export default function RatingStars({ value = 0 }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const total = 5;
    return (
      <div aria-label={`Rating ${value} out of 5`} className="stars">
        {[...Array(full)].map((_, i) => <span key={`f${i}`}>★</span>)}
        {half && <span>☆</span>}
        {[...Array(total - full - (half ? 1 : 0))].map((_, i) => <span key={`e${i}`}>☆</span>)}
        <span className="muted small">&nbsp;{value.toFixed(2)}</span>
      </div>
    );
  }
  