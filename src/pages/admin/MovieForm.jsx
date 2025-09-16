import { useState } from "react";
import { countriesList, genresList, platformsList } from "./constants";

export function MovieForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    nameorig: "",
    image: "",
    rating: "",
    rating2: "",
    trailerId: "",
    continuation: "",
    season: "",
    episode: "",
    country: [],
    style: [],
    yers: "",
    yers2: "",
    platform: "",
    kinopoisk: "",
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showYearField, setShowYearField] = useState(false);

  // Обработчик для чекбоксов стран
  const handleCountryChange = (country) => {
    setFormData((prev) => {
      if (prev.country.includes(country)) {
        return {
          ...prev,
          country: prev.country.filter((c) => c !== country),
        };
      } else {
        return {
          ...prev,
          country: [...prev.country, country],
        };
      }
    });
  };

  // Обработчик для чекбоксов жанров
  const handleGenreChange = (genre) => {
    setFormData((prev) => {
      if (prev.style.includes(genre)) {
        return {
          ...prev,
          style: prev.style.filter((g) => g !== genre),
        };
      } else {
        return {
          ...prev,
          style: [...prev.style, genre],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleContinuationChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      continuation: value,
    });

    setShowYearField(value === "Завершён");
    setFormData((prev) => ({
      ...prev,
      yers2: "",
    }));
  };

  const handleYearInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.continuation) {
      alert("Выберите вариант для поля 'Статус'");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        rating: formData.rating.replace(".", ","),
        rating2: formData.rating2.replace(".", ","),
        country: formData.country.join(", "),
        style: formData.style.join(", "),
        continuation:
          formData.continuation === "Завершён"
            ? `Завершён`
            : formData.continuation,
      };

      await onSubmit(dataToSend);

      // Очистка формы после успешной отправки
      setFormData({
        name: "",
        nameorig: "",
        image: "",
        rating: "",
        rating2: "",
        trailerId: "",
        continuation: "Завершён",
        season: "",
        episode: "",
        country: [],
        style: [],
        yers: "",
        yers2: "",
        platform: "",
        kinopoisk: "",
      });
      setShowYearField(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при добавлении фильма");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <ul className="flex">
        <li className="mr-15">
          <div className="input">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Название"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="nameorig"
              value={formData.nameorig}
              onChange={handleChange}
              placeholder="Оригинальное название"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="Постер https://"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              placeholder="Рейтинг IMDb"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="rating2"
              value={formData.rating2}
              onChange={handleChange}
              required
              placeholder="Рейтинг Кинопоиск"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="trailerId"
              value={formData.trailerId}
              onChange={handleChange}
              required
              placeholder="YouTube трейлер"
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="kinopoisk"
              value={formData.kinopoisk}
              onChange={handleChange}
              placeholder="ID Кинопоиск"
              required
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="season"
              value={formData.season}
              onChange={handleChange}
              min="0"
              placeholder="Сезон"
              className="textInput"
              pattern="[0-9]{2}"
              required
            />
          </div>
          <div className="input">
            <input
              type="number"
              name="episode"
              value={formData.episode}
              onChange={handleChange}
              pattern="[0-9]{2}"
              placeholder="Серия"
              required
              className="textInput"
            />
          </div>
          <div className="input">
            <input
              type="text"
              name="yers"
              value={formData.yers}
              onInput={handleYearInput}
              required
              placeholder="Год производства"
              pattern="[0-9]{4}"
              className="textInput"
            />
          </div>
          {showYearField && (
            <div className="input">
              <input
                type="text"
                name="yers2"
                value={formData.yers2}
                onInput={handleYearInput}
                required={showYearField}
                placeholder="Год завершения"
                pattern="[0-9]{4}"
                className="textInput"
              />
            </div>
          )}
        </li>
        <li>
          <div className="relative mt-5">
            <select
              name="continuation"
              value={formData.continuation}
              onChange={handleContinuationChange}
              required
            >
              <option value="">Статус</option>
              <option value="Завершён">Завершён</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2027">2028</option>
            </select>
          </div>
          <div className="relative mt-5">
            <div
              className="dropdown-trigger"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              {formData.country.length > 0
                ? formData.country.join(", ")
                : "Страна"}
            </div>
            {showCountryDropdown && (
              <div className="dropdown-menu">
                {countriesList.map((country) => (
                  <label key={country} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.country.includes(country)}
                      onChange={() => handleCountryChange(country)}
                    />
                    {country}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="relative mt-5">
            <div
              className="dropdown-trigger"
              onClick={() => setShowGenreDropdown(!showGenreDropdown)}
            >
              {formData.style.length > 0 ? formData.style.join(", ") : "Жанр"}
            </div>
            {showGenreDropdown && (
              <div className="dropdown-menu">
                {genresList.map((genre) => (
                  <label key={genre} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.style.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-5">
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
            >
              <option value="">Платформа</option>
              {platformsList.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>

      <div className="flex justify-center items-center mt-5">
        <button type="submit" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            ></path>
          </svg>
          <div className="font-extrabold mr-5">Загрузить</div>
        </button>
      </div>
    </form>
  );
}
