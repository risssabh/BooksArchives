export default function BookCover({ coverUrl, title }) {
    if (coverUrl) {
      return (
        <div className="cover">
          <img src={coverUrl} alt={`Cover of ${title}`} loading="lazy" />
        </div>
      );
    }
    return (
      <div className="cover placeholder" aria-label={`${title} cover placeholder`}>
        <span role="img" aria-label="books">📚</span>
      </div>
    );
  }
  