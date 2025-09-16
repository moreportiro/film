import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export function MovieFilter({
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  platformsList,
  countriesList,
}) {
  const filtersRef = useRef(null);

  useClickOutside(filtersRef, () => {
    if (showFilters) setShowFilters(false);
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      platform: "",
      country: "",
      status: "all",
    });
  };
  return (
    <div className="relative" ref={filtersRef}>
      <button
        className="relative group hover:cursor-pointer hover:bg-purple-400 opacity-50 p-2 rounded-full transition-all duration-500 w-10"
        onClick={() => setShowFilters(!showFilters)}
      >
        <img
          src="https://img.icons8.com/?size=100&id=LALXQcDwgx8U&format=png&color=59168b"
          alt=""
        />
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
          Сортировать
        </div>
      </button>
      {/* Выпадающее меню фильтров */}
      {showFilters && (
        <div className="absolute right-0 mt-2 bg-[#fdf4e3] dark:bg-[#212121] border-2 border-[#59168b] rounded-[10px] p-2 z-10 animate-fadeIn">
          <div className="mb-4">
            <select
              id="platform-filter"
              name="platform"
              value={filters.platform}
              onChange={(e) => handleFilterChange("platform", e.target.value)}
              className="animate-fadeIn"
            >
              <option value="">Все платформы</option>
              {platformsList.map((platform) => (
                <option
                  key={platform}
                  value={platform}
                  className="animate-fadeIn"
                >
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <select
              id="country-filter"
              name="country"
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              <option value="">Все страны</option>
              {countriesList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <select
              id="status-filter"
              name="status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">Все</option>
              <option value="completed">Завершён</option>
              <option value="ongoing">Продолжается</option>
            </select>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={clearFilters} className="btn3">
              <svg viewBox="0 0 448 512" className="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
