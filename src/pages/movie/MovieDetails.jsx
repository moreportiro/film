import { lazy, Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MOVIES } from "../home/movies.data";

// lazy - ленивая загрузка компонентов, загружаются только когда нужны
const LazyMovieComments = lazy(() =>
  import("./MovieComments").then((c) => ({ default: c.MovieComments }))
);

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
      <div className="flex justify-center">
        <img src={movie.image} alt={movie.name} className="imaged" />
        <div>
          {/*Suspense - пока грузится компонент, можно отобразить что-то*/}
          <Suspense fallback={<div>⏳</div>}>
            <LazyMovieComments
              season={movie.season}
              episode={movie.episode}
              continuation={movie.continuation}
              country={movie.country}
              style={movie.style}
              yers={movie.yers}
              yers2={movie.yers2}
              platform={movie.platform}
              name={movie.name}
              rating={movie.rating}
              trailerId={movie.trailerId}
              nameorig={movie.nameorig}
              rating2={movie.rating2}
              kinopoisk={movie.kinopoisk}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
