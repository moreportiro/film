import { useEffect, useMemo, useState } from "react";
import { MOVIES } from "./movies.data";
import { useDebounce } from "../../hooks/useDebounce";
import MovieCard from "./MovieCard";
import { fetchJSONP } from "../../services/fetchJSONP";
import { NavBar } from "./NavBar";
import { Loading } from "../../components/Loading";

export function Home() {
  const [searhTerm, setSearchTerm] = useState("");
  const [moviesData, setMoviesData] = useState([MOVIES]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searhTerm, 500);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // фильтры
  const [filters, setFilters] = useState({
    platform: "",
    country: "",
    status: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // загрузка данных после добавления фильма
  const refreshMovies = async () => {
    try {
      setLoading(true);
      const url =
        "https://script.google.com/macros/s/AKfycbxoG96rnSRxfg4rOuBzXGXpMYaWaJYfpZSifG9hgrLWnXFfcQ7FkPuxQ7Rjg6fukSwU/exec";
      const data = await fetchJSONP(url, "handleMoviesData", 3); // 3 попытки
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

  // уникальные платформы и страны для фильтров
  const { platformsList, countriesList } = useMemo(() => {
    const platforms = new Set();
    const countries = new Set();

    moviesData.forEach((movie) => {
      if (movie.platform) platforms.add(movie.platform);
      if (movie.country) {
        movie.country.split(", ").forEach((country) => countries.add(country));
      }
    });

    return {
      platformsList: Array.from(platforms).sort(),
      countriesList: Array.from(countries).sort(),
    };
  }, [moviesData]);

  // useMemo убирает лишние перерисовки(оптимизация)
  const movies = useMemo(() => {
    return moviesData.filter((movie) => {
      // Поиск по названию
      const movieName = movie.name || "";
      const matchesSearch = movieName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      // Фильтр по платформе
      const matchesPlatform =
        !filters.platform || movie.platform === filters.platform;

      // Фильтр по стране
      const movieCountry = movie.country || "";
      const matchesCountry =
        !filters.country || movieCountry.includes(filters.country);

      // Фильтр по статусу
      let matchesStatus = true;
      if (filters.status !== "all") {
        const continuation = String(movie.continuation || "");
        const isCompleted = continuation.includes("Завершён");
        matchesStatus =
          filters.status === "completed" ? isCompleted : !isCompleted;
      }

      return (
        matchesSearch && matchesPlatform && matchesCountry && matchesStatus
      );
    });
  }, [debouncedSearch, moviesData, filters]);

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
    return <Loading />;
  }

  return (
    <div>
      <NavBar
        onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
        searchTerm={searhTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        platformsList={platformsList}
        countriesList={countriesList}
      />
      {/* вывод платформ с их фильмами */}
      {platforms.map((platform) => (
        <div key={platform} className="mb-10">
          <h2 className="text-3xl font-extrabold flex justify-center mb-5 mt-10">
            {platform}
          </h2>

          {/* фильмы текущей платформы */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {moviesByPlatform[platform].map((movie) => (
              <div key={movie.kinopoisk} className="flex justify-center">
                <MovieCard movie={movie} />
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
