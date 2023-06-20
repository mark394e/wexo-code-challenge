import { useState, useEffect } from "react";
import Header from "./components/Header";
import GenreMenu from "./components/GenreMenu";
import GenreSlider from "./components/GenreSlider";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const genres = [
    "Action",
    "Comedy",
    "Thriller",
    "War",
    "Romance",
    "Drama",
    "Crime",
    "Documentary",
    "Horror",
  ];

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie"
      );
      const dataMovies = await response.json();
      // console.log("Movies:", dataMovies.entries);
      setMovies(dataMovies.entries);
      setLoading(false);
    }
    fetchMovies();

    async function fetchSeries() {
      const response = await fetch(
        "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series"
      );
      const dataSeries = await response.json();
      // console.log("Series:", dataSeries.entries);
      setSeries(dataSeries.entries);
      setLoading(false);
    }
    fetchSeries();
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="blurred_line"></div>
        <h1>MOVIE SHOP DELUXE</h1>
        <GenreMenu />
        {genres.map(
          (genre, i) => (
            console.log(i),
            (
              <GenreSlider
                key={i}
                movies={movies}
                series={series}
                genreTitle={genre}
                loading={loading}
              />
            )
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
