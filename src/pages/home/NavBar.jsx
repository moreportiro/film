import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useTheme } from "../../hooks/useTheme";
import { AdminPanel } from "../admin/AdminPanel";

export function NavBar({ onRefresh, searchTerm, setSearchTerm }) {
  const { theme, toggleTheme } = useTheme();
  const [isAdmin, setAdmin] = useState();

  return (
    <div className=" flex items-end justify-end">
      <div className=" flex gap-4 px-3 py-1 items-center justify-center rounded-[15px] ring-2 ring-purple-900">
        {/* поиск */}
        <input
          type="search"
          autocomplete="off"
          name="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Поиск..."
          className="font-mono ring-1 ring-purple-900 focus:ring-2 focus:ring-purple-900 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-purple-900"
        />
        {/* сортировка */}
        <div className="relative group hover:cursor-pointer hover:bg-purple-400 opacity-50 p-2 rounded-full transition-all duration-500 w-10">
          <img
            src="https://img.icons8.com/?size=100&id=LALXQcDwgx8U&format=png&color=59168b"
            alt=""
          />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            Сортировать
          </div>
        </div>
        {/* админка */}
        {isAdmin && (
          <Modal onClose={() => setAdmin(false)}>
            <AdminPanel
              onSuccess={() => {
                if (onRefresh) onRefresh();
                setAdmin(false);
              }}
            />
          </Modal>
        )}
        <div className="relative group hover:cursor-pointer hover:bg-purple-400 opacity-50 p-2 rounded-full transition-all duration-500 w-10">
          <img
            src="https://img.icons8.com/?size=100&id=NjujHWc6iSDE&format=png&color=59168b"
            alt=""
            onClick={() => {
              setAdmin(true);
            }}
          />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max px-2 py-1 text-white bg-black rounded-md opacity-0 transform scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
            Загрузить
          </div>
        </div>
        {/* тема */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            value=""
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <div className="group peer ring-1 ring-purple-900 rounded-full outline-none duration-700 after:duration-200 w-12 h-7  shadow-md peer-checked:bg-gradient-to-r  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-purple-900 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1  peer-checked:after:translate-x-5">
            <div className="flex text-sm justify-center mt-1">
              <p>🌑</p>
              <p>☀️</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
