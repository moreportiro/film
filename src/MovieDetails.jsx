import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { MOVIES } from "./movies.data";

export function MovieDetails() {
  const { id } = useParams();

  const movie = useMemo(() => {
    return MOVIES.find((movie) => movie.trailerId === id);
  }, [id]);

  if (!movie) {
    return <p>Не найдено</p>;
  }

  return (
    <div>
      <img
        src={movie.image}
        alt={movie.name}
        className="w-1/3 h-auto object-cover"
      />
      <div className="flex justify-center items-center">
        <h1>{movie.name}</h1>
      </div>
    </div>
  );
}
