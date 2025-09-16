import { lazy, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MOVIES } from "../home/movies.data";
import { fetchJSONP } from "../../services/fetchJSONP";
import { Loading } from "../../components/Loading";
import { MovieComments } from "./MovieComments";

export function MovieDetails() {
  const { kinopoiskId } = useParams();
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

  const formatRating = (rating) => {
    if (typeof rating === "string") {
      return rating.replace(",", ".");
    }
    return rating;
  };

  const movie = useMemo(() => {
    if (!moviesData.length) return null;

    const searchId = parseInt(kinopoiskId, 10);
    const foundMovie = moviesData.find((movie) => {
      const movieId = parseInt(movie.kinopoisk, 10);
      return movieId === searchId;
    });

    if (foundMovie) {
      return {
        ...foundMovie,
        rating: formatRating(foundMovie.rating),
        rating2: formatRating(foundMovie.rating2),
      };
    }

    return null;
  }, [kinopoiskId, moviesData]);

  if (loading) {
    return <Loading />;
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
      <Link to="/">
        <button
          className=" text-center w-48 rounded-2xl h-14 relative text-[#fdf4e3] text-xl font-semibold group cursor-pointer m-5"
          type="button"
        >
          <div className="bg-[#59168b] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#fdf4e3"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#fdf4e3"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Назад</p>
        </button>
      </Link>
      <div className="flex justify-center">
        <img src={movie.image} alt={movie.name} className="imaged" />
        <div>
          <MovieComments
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
        </div>
      </div>
    </div>
  );
}
