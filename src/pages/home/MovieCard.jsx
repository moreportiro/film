import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { image, trailerId, name } = movie;
  return (
    <div>
      {/* картинка */}
      <Link to={`/movie/${trailerId}`}>
        <img
          src={image || "/placeholder-image.jpg"}
          alt={name}
          className="image"
        />
      </Link>
    </div>
  );
}

export default memo(MovieCard);
