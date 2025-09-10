import { useMemo, useState } from "react";
import { MOVIES } from "./movies.data";
import { useDebounce } from "../../hooks/useDebounce";
import { useTheme } from "../../hooks/useTheme";
import MovieCard from "./MovieCard";

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searhTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searhTerm, 500);

  // useMemo убирает лишние перерисовки(оптимизация)
  const movies = useMemo(() => {
    return MOVIES.filter((movie) =>
      movie.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  // группировка фильмов по платформам
  const moviesByPlatform = useMemo(() => {
    const grouped = {};
    movies.forEach((movie) => {
      if (!grouped[movie.platform]) {
        grouped[movie.platform] = [];
      }
      grouped[movie.platform].push(movie);
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

  return (
    <div>
      {/* поиск */}
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
      <div className="flex justify-end items-center">
        {/* смена темы */}
        <button onClick={toggleTheme} className="btn">
          {theme === "dark" ? "🌑" : "☀️"}
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
              <MovieCard
                key={movie.name}
                image={movie.image}
                trailerId={movie.trailerId}
              />
            ))}
          </div>
        </div>
      ))}
      {movies.length === 0 && <p>Пусто</p>}
    </div>
  );
}

export default Home;
