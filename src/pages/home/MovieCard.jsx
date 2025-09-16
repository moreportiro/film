import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { image, name } = movie;
  return (
    <div>
      {/* картинка */}
      <Link to={`/movie/${movie.kinopoisk}`}>
        <img
          src={
            image ||
            "https://img.icons8.com/?size=100&id=kPZyzOd83PP0&format=png&color=59168b"
          }
          alt={name}
          className="image"
        />
      </Link>
    </div>
  );
}

export default memo(MovieCard);
