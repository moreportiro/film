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
  const isCompleted = continuation === "Завершён";

  return (
    <div>
      <p className="flex ml-10 text-4xl font-extrabold">{name}</p>
      <p className="flex ml-10 text-gray-400 font-mono">{nameorig}</p>
      <p className="flex m-10 text-2xl font-extrabold">О сериале</p>
      <div className="flex max-w-5xl">
        <div className="flex-1">
          <div className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4 ml-10">
            <div className="text-gray-400">Сезон</div>
            <div>{season}</div>

            <div className="text-gray-400">Серия</div>
            <div>{episode}</div>

            <div className="text-gray-400">Страна</div>
            <div className="flex flex-wrap gap-1">
              {country.split(", ").map((c, idx) => (
                <span key={idx} className="bg-gray-400 p-1 rounded-md">
                  {c}
                </span>
              ))}
            </div>

            <div className="text-gray-400">Жанр</div>
            <div className="flex flex-wrap gap-1">
              {style.split(", ").map((g, idx) => (
                <span key={idx} className="bg-gray-400 p-1 rounded-md">
                  {g}
                </span>
              ))}
            </div>

            <div className="text-gray-400">Год производства</div>
            <div>{yers}</div>

            {isCompleted && (
              <>
                <div className="text-gray-400">Год завершения</div>
                <div>{yers2}</div>
              </>
            )}

            <div className="text-gray-400">Платформа</div>
            <div>{platform}</div>

            <div className="text-gray-400">Статус</div>
            <div className="text-fuchsia-900 font-bold">
              {isCompleted ? "Завершён" : `Продолжение ${continuation}`}
            </div>
          </div>
        </div>

        <div className="ml-10">
          <p className="font-extrabold mb-2">Трейлер</p>
          <iframe
            className="trailer"
            src={`https://www.youtube.com/embed/${trailerId}?amp`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <a
            className="block mt-5 font-extrabold"
            href={`https://www.kinopoisk.ru/series/${kinopoisk}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Кинопоиск🔗
          </a>
        </div>
      </div>

      <div className="mt-10">
        <p className="flex m-10 text-2xl font-extrabold">Рейтинг сериала</p>
        <div className="flex ml-10 gap-10">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">IMDb:</span>
            <span className="text-gray-400">{rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold">Кинопоиск:</span>
            <span className="text-gray-400">{rating2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
