import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { image, name } = movie;
  const continuation = movie.continuation || "";
  const isCompleted =
    typeof continuation === "string" && continuation.includes("Завершён");
  return (
    <div className="image w-full max-w-[200px]">
      {/* картинка */}
      <Link to={`/movie/${movie.kinopoisk}`}>
        <div className="flex justify-end">
          <div className="absolute opacity-30">{isCompleted ? "🔴" : "🟢"}</div>
          <img src={image || "/placeholder-image.jpg"} alt={name} />
        </div>
      </Link>
    </div>
  );
}

export default memo(MovieCard);
