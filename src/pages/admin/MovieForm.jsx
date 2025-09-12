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
          <label>Название</label>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="ru"
            />
          </div>
          <label>Оригинальное название</label>
          <div className="form-group">
            <input
              type="text"
              name="nameorig"
              value={formData.nameorig}
              onChange={handleChange}
              placeholder="en"
            />
          </div>
          <label>Постер</label>
          <div className="form-group">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="URL"
            />
          </div>
          <label>Рейтинг IMDb</label>
          <div className="form-group">
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              placeholder="0.0"
            />
          </div>
          <label>Рейтинг Кинопоиск</label>
          <div className="form-group">
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="rating2"
              value={formData.rating2}
              onChange={handleChange}
              required
              placeholder="0.0"
            />
          </div>
          <label>Трейлер YouTube</label>
          <div className="form-group">
            <input
              type="text"
              name="trailerId"
              value={formData.trailerId}
              onChange={handleChange}
              required
              placeholder="emded/. . .?si="
            />
          </div>
          <label>ID Кинопоиска</label>
          <div className="form-group">
            <input
              type="number"
              name="kinopoisk"
              value={formData.kinopoisk}
              onChange={handleChange}
              placeholder="ID"
              required
            />
          </div>
        </li>
        <li>
          <label>Статус</label>
          <div className="form-group">
            <select
              name="continuation"
              value={formData.continuation}
              onChange={handleContinuationChange}
              required
            >
              <option value="">Выберите...</option>
              <option value="Завершён">Завершён</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2027">2028</option>
            </select>
          </div>
          {showYearField && (
            <>
              <label>Год завершения</label>
              <div className="form-group">
                <input
                  type="text"
                  name="yers2"
                  value={formData.yers2}
                  onInput={handleYearInput}
                  required={showYearField}
                  placeholder="2024"
                  pattern="[0-9]{4}"
                />
              </div>
            </>
          )}
          <label>Год создания</label>
          <div className="form-group">
            <input
              type="text"
              name="yers"
              value={formData.yers}
              onInput={handleYearInput}
              required
              placeholder="2025"
              pattern="[0-9]{4}"
            />
          </div>
          <label>Сезон</label>
          <div className="form-group">
            <input
              type="number"
              name="season"
              value={formData.season}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>
          <label>Серия</label>
          <div className="form-group">
            <input
              type="number"
              name="episode"
              value={formData.episode}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>
          <label>Страна</label>
          <div className="form-group relative">
            <div
              className="dropdown-trigger"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              {formData.country.length > 0
                ? formData.country.join(", ")
                : "Выберите страны"}
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
          <label>Жанр</label>
          <div className="form-group relative">
            <div
              className="dropdown-trigger"
              onClick={() => setShowGenreDropdown(!showGenreDropdown)}
            >
              {formData.style.length > 0
                ? formData.style.join(", ")
                : "Выберите жанры"}
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
        </li>
      </ul>
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
      <div className="flex justify-center items-center mt-5">
        <button type="submit" className="btn3">
          ДОБАВИТЬ
        </button>
      </div>
    </form>
  );
}
