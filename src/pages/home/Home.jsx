import { useEffect, useMemo, useState } from "react";
import { MOVIES } from "./movies.data";
import { useDebounce } from "../../hooks/useDebounce";
import { useTheme } from "../../hooks/useTheme";
import MovieCard from "./MovieCard";
import { AdminPanel } from "../../components/AdminPanel";
import { Modal } from "../../components/Modal";
import { fetchJSONP } from "../../services/fetchJSONP";

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searhTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([MOVIES]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searhTerm, 500);
  const [isAdmin, setAdmin] = useState();
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
      {/* поиск (надо вынести+фильтр) */}
      <div className="flex justify-center items-center">
        <input
          type="search"
          value={searhTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Поиск..."
        />
      </div>
      {/* смена темы */}
      <div className="flex justify-end items-center">
        <button onClick={toggleTheme} className="btn">
          {theme === "dark" ? "🌑" : "☀️"}
        </button>
      </div>
      {/* админ панель */}
      <div>
        {isAdmin && (
          <Modal onClose={() => setAdmin(false)}>
            <AdminPanel
              onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
            />
          </Modal>
        )}
        <button
          className="btn2"
          onClick={() => {
            setAdmin(true);
          }}
        >
          +
        </button>
      </div>
      {/* вывод платформ с их фильмами */}
      {platforms.map((platform) => (
        <div key={platform}>
          <h2 className="text-3xl font-extrabold flex justify-center mb-10 mt-10">
            {platform}
          </h2>

          {/* фильмы текущей платформы */}
          <div className="flex justify-center gap-6">
            {moviesByPlatform[platform].map((movie) => (
              <MovieCard key={movie.name || Math.random()} movie={movie} />
            ))}
          </div>
        </div>
      ))}
      {movies.length === 0 && <p>Пусто</p>}
    </div>
  );
}

export default Home;
