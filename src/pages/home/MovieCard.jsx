import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({ image, trailerId }) {
  return (
    <div>
      {/* картинка */}
      <Link to={`/movie/${trailerId}`}>
        <img src={image} alt="" className="image" />
      </Link>
    </div>
  );
}

export default memo(MovieCard);
