import { useMemo, useState } from "react"
import MovieCard from "./MovieCard"
import { MOVIES } from "./movies.data"
import { useDebounce } from "./hooks/useDebounce"
import { useTheme } from "./hooks/useTheme"

function App() {
  const {theme, toggleTheme} = useTheme()
  const [searhTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searhTerm, 500)

  // useMemo убирает лишние перересовки(оптимизация)
  const movies = useMemo(() => {
    return MOVIES.filter(movie => movie.name.toLowerCase().includes(debouncedSearch.toLowerCase()))}, [debouncedSearch]) 

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white px-6 py-5">

      {/* поиск */}
      <div className="flex justify-center">
        <input type="search" value={searhTerm} onChange={e => {setSearchTerm(e.target.value)}} placeholder="Поиск..." className="border border-black/15 dark:border-white/15 px-2 py-1 rounded outline-0"/>
      </div>

      {/* смена темы */}
      <div className="flex justify-end">
        <button onClick={toggleTheme} className="text-sm px-3 py-1 rounded border border-white/20 dark:border-white/10 hover:bg-white hover:text-black dark:hover:bg-white/10 transition">{theme === 'dark' ? '☀️' : '🌑'}</button>
      </div>

      {/* вывод фильмов */}
      <main className="flex gap-6">
        {movies.length ? (movies.map(movie => (<MovieCard key={movie.name} image={movie.image} rating={movie.rating} trailerId={movie.trailerId}/>))) : <p>Пусто</p>}
      </main>
    </div>
  )
}

export default App
