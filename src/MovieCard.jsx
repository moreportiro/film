import { memo, useCallback, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import { Modal } from "./components/Modal";
import { Link } from "react-router-dom";

function MovieCard({ image, rating, trailerId }) {
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);

  // useCallback убирает лишнее пересосздание компонентов(оптимизация)
  const openTrailer = useCallback(() => {
    setIsOpenTrailer(true);
  }, []);

  return (
    <div className="relative w[200-px] rounded-2xl overflow-hidden bg-neutral-900 shadow-lg">
      {/* модальное окно */}
      {isOpenTrailer && (
        <Modal
          onClose={() => {
            setIsOpenTrailer(false);
          }}
        >
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerId}?amp;controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Modal>
      )}

      {/* картинка */}
      <img src={image} alt="" className="max-w-50 h-auto object-cover" />

      {/* рейтинг */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-sm text-white font-semibold">
        IMDb: {rating}
      </div>

      {/* кнопки */}
      <div className="absolute top-0 right-0 z-10 gap-2">
        <FavoriteButton />
        <button onClick={openTrailer}>🎥</button>
        <Link to={`/movie/${trailerId}`} className="btn">
          🔍
        </Link>
      </div>
    </div>
  );
}

export default memo(MovieCard);
