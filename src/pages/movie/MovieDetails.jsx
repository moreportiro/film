import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MOVIES } from "../home/movies.data";
import { fetchJSONP } from "../../services/fetchJSONP";

// lazy - ленивая загрузка компонентов, загружаются только когда нужны
const LazyMovieComments = lazy(() =>
  import("./MovieComments").then((c) => ({ default: c.MovieComments }))
);

export function MovieDetails() {
  const { id } = useParams();
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const url =
          "https://script.google.com/macros/s/AKfycbxoG96rnSRxfg4rOuBzXGXpMYaWaJYfpZSifG9hgrLWnXFfcQ7FkPuxQ7Rjg6fukSwU/exec";
        const data = await fetchJSONP(url, "handleMoviesData", 3); // 3 попытки
        setMoviesData(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setMoviesData(MOVIES); // Используем локальные данные в случае ошибки
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const movie = useMemo(() => {
    return moviesData.find((movie) => movie.trailerId === id);
  }, [id, moviesData]);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }
  if (error) {
    return (
      <div>
        <p>Ошибка загрузки: {error}</p>
        <p>Используются локальные данные</p>
      </div>
    );
  }
  if (!movie) {
    return <p>Фильм не найден</p>;
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
