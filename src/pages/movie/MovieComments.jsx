export function MovieComments({
  season,
  episode,
  continuation,
  country,
  style,
  yers,
  yers2,
  platform,
  name,
  rating,
  trailerId,
  nameorig,
  rating2,
  kinopoisk,
}) {
  return (
    <div>
      <p className="flex ml-10 text-4xl font-extrabold">{name}</p>
      <p className="flex ml-10 text-gray-400 font-mono">{nameorig}</p>
      <p className="flex m-10 text-2xl font-extrabold">О сериале</p>
      <div className="flex">
        <div>
          <ul className="space-y-4 ml-10 text-gray-400">
            <li>
              <p>Сезон</p>
            </li>
            <li>
              <p>Серия</p>
            </li>
            <li>
              <p>Страна</p>
            </li>
            <li>
              <p>Жанр</p>
            </li>
            <li>
              <p>Год производства</p>
            </li>
            <li>
              <p>Год завершения</p>
            </li>
            <li>
              <p>Платформа</p>
            </li>
            <li>
              <p>Статус</p>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-4 ml-20">
            <li>
              <p>{season}</p>
            </li>
            <li>
              <p>{episode}</p>
            </li>
            <li>
              <p>{country}</p>
            </li>
            <li>
              <p>{style}</p>
            </li>
            <li>
              <p>{yers}</p>
            </li>
            <li>
              <p>{yers2}</p>
            </li>
            <li>
              <p>{platform}</p>
            </li>
            <li>
              <p className="text-fuchsia-900 font-bold">{continuation}</p>
            </li>
          </ul>
        </div>
        <div>
          <p className="flex ml-20 font-extrabold mb-2">Трейлер</p>
          <iframe
            className="trailer"
            src={`https://www.youtube.com/embed/${trailerId}?amp`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <a
            className="flex ml-20 mt-5 font-extrabold absolute"
            href={`https://www.kinopoisk.ru/series/${kinopoisk}/`}
            target="_blank"
          >
            Кинопоиск🔗
          </a>
        </div>
      </div>
      <div>
        <p className="flex m-10 text-2xl font-extrabold">Рейтинг сериала</p>
        <p className="flex ml-10 text-gray-400 font-sans">IMDb: {rating}</p>
        <p className="flex ml-10 text-gray-400 font-sans">
          Кинопоиск: {rating2}
        </p>
      </div>
    </div>
  );
}
