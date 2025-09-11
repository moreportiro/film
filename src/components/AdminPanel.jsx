import { useState } from "react";

export function AdminPanel({ onSuccess }) {
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
    country: "",
    style: "",
    yers: "",
    yers2: "",
    platform: "",
    kinopoisk: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxoG96rnSRxfg4rOuBzXGXpMYaWaJYfpZSifG9hgrLWnXFfcQ7FkPuxQ7Rjg6fukSwU/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Фильм успешно добавлен!");
        // очистка формы
        setFormData({
          name: "",
          nameorig: "",
          image: "",
          rating: "",
          rating2: "",
          trailerId: "",
          continuation: "",
          season: "",
          episode: "",
          country: "",
          style: "",
          yers: "",
          yers2: "",
          platform: "",
          kinopoisk: "",
        });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert("Ошибка при добавлении фильма");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при добавлении фильма");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            <label>Продолжение</label>
            <div className="form-group">
              <input
                type="text"
                name="continuation"
                value={formData.continuation}
                onChange={handleChange}
                required
                placeholder="Год || Завершён"
              />
            </div>
          </li>
          <li>
            <label>Сезон</label>
            <div className="form-group">
              <input
                type="number"
                name="season"
                value={formData.season}
                onChange={handleChange}
                required
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
                required
                placeholder="0"
              />
            </div>
            <label>Страна</label>
            <div className="form-group">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="США, Россия.."
              />
            </div>
            <label>Жанр</label>
            <div className="form-group">
              <input
                type="text"
                name="style"
                value={formData.style}
                onChange={handleChange}
                required
                placeholder="Драма, Криминал.."
              />
            </div>
            <label>Год создания</label>
            <div className="form-group">
              <input
                type="number"
                name="yers"
                value={formData.yers}
                onChange={handleChange}
                required
                placeholder="0000"
              />
            </div>
            <label>Год завершения</label>
            <div className="form-group">
              <input
                type="text"
                name="yers2"
                value={formData.yers2}
                onChange={handleChange}
                placeholder="0000"
              />
            </div>
            <label>ID Кинопоиска</label>
            <div className="form-group">
              <input
                type="number"
                name="kinopoisk"
                value={formData.kinopoisk}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
          </li>
        </ul>
        <div className="flex justify-center items-center mt-5">
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          >
            <option value="">Платформа</option>
            <option value="NETFLIX">NETFLIX</option>
            <option value="STARZ">STARZ</option>
            <option value="AMC">AMC</option>
            <option value="HBO">HBO</option>
            <option value="AMAZON">AMAZON</option>
            <option value="DISNEY">DISNEY+</option>
          </select>
        </div>
        <div className="flex justify-center items-center mt-5">
          <button type="submit" className="btn3">
            ДОБАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
}
