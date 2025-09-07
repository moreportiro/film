import { MovieCard } from "./MovieCard"

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-5">
      <main className="flex gap-6">
        <MovieCard image="/orig.webp" rating={8.8}/>
      </main>
    </div>
  )
}

export default App
