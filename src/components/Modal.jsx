import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ children, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-[#fdf4e3] dark:bg-[#212121] rounded-2xl animate-fadeIn p-5">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-black dark:text-white hover:text-fuchsia-900 transition"
        >
          x
        </button>
        <div className="flex justify-center items-center">{children}</div>
      </div>
    </div>,
    document.body
  );
}
