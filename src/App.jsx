import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleView from "./pages/SingleView";
import FrontPage from "./pages/FrontPage";
import AllMovies from "./pages/AllMovies";
import Header from "./components/Header";
import AllSeries from "./pages/AllSeries";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie`
      );
      const dataMovie = await response.json();
      setMovies(dataMovie.entries);
    }
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/singleview" element={<SingleView />} />
        <Route path="/allmovies" element={<AllMovies movies={movies} />} />
        <Route path="/allseries" element={<AllSeries />} />
      </Routes>
    </div>
  );
}

export default App;
