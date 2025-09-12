import { useEffect, useMemo, useState } from "react";
import { MOVIES } from "./movies.data";
import { useDebounce } from "../../hooks/useDebounce";
import MovieCard from "./MovieCard";
import { fetchJSONP } from "../../services/fetchJSONP";
import { NavBar } from "./NavBar";

export function Home() {
  const [searhTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([MOVIES]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searhTerm, 500);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // загрузка данных после добавления фильма
  const refreshMovies = async () => {
    try {
      setLoading(true);
      const url =
        "https://script.google.com/macros/s/AKfycbxoG96rnSRxfg4rOuBzXGXpMYaWaJYfpZSifG9hgrLWnXFfcQ7FkPuxQ7Rjg6fukSwU/exec";
      const data = await fetchJSONP(url, "handleMoviesData");
      setMoviesData(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setMoviesData(MOVIES);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshMovies();
  }, [refreshTrigger]);

  // useMemo убирает лишние перерисовки(оптимизация)
  const movies = useMemo(() => {
    return moviesData.filter(
      (movie) =>
        movie.name &&
        movie.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, moviesData]);

  // группировка фильмов по платформам
  const moviesByPlatform = useMemo(() => {
    const grouped = {};
    movies.forEach((movie) => {
      if (movie.platform) {
        if (!grouped[movie.platform]) {
          grouped[movie.platform] = [];
        }
        grouped[movie.platform].push(movie);
      }
    });
    // сортировка фильмов по алфавиту
    Object.keys(grouped).forEach((platform) => {
      grouped[platform].sort((a, b) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [movies]);

  // уникальные платформы +сортировка по алфавиту
  const platforms = useMemo(
    () => Object.keys(moviesByPlatform).sort((a, b) => a.localeCompare(b)),
    [moviesByPlatform]
  );
  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      <NavBar
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
        searchTerm={searhTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* вывод платформ с их фильмами */}
      {platforms.map((platform) => (
        <div key={platform}>
          <h2 className="text-3xl font-extrabold flex justify-center mb-5 mt-10">
            {platform}
          </h2>

          {/* фильмы текущей платформы */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {moviesByPlatform[platform].map((movie) => (
              <div className="flex justify-center">
                <MovieCard key={movie.kinopoisk} movie={movie} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {movies.length === 0 && <p>Пусто</p>}
    </div>
  );
}

export default Home;
