import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import { MovieDetails } from "../pages/movie/MovieDetails";

export function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:kinopoiskId" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}
