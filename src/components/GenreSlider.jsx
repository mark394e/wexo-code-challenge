import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClipLoader from "react-spinners/ClipLoader";

function GenreSlider(props) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true, align: "start" });
  const [moviesInGenre, setMoviesInGenre] = useState([]);
  const [seriesInGenre, setSeriesInGenre] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoviesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=movie`
      );
      const dataMovieGenres = await response.json();
      console.log(`Movies in genre - ${props.genreTitle}`, dataMovieGenres.entries);
      setMoviesInGenre(dataMovieGenres.entries);
      setLoading(false);
    }
    fetchMoviesInGenre();

    async function fetchSeriesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=series`
      );
      const dataSeriesGenres = await response.json();
      console.log(`Series in genre - ${props.genreTitle}`, dataSeriesGenres.entries);
      setSeriesInGenre(dataSeriesGenres.entries);
      setLoading(false);
    }
    fetchSeriesInGenre();
  }, [props.genreTitle]);

  return (
    <section className="genre_slider_wrapper">
      <div className="genre_title_wrapper">
        <h2>{props.genreTitle}</h2>
        <button>SE ALLE {moviesInGenre.length} FILM</button>
      </div>
      {props.loading ? (
        <ClipLoader color="#36d7b7" />
      ) : (
        <div className="embla" ref={emblaRef}>
          <div className="genre_slider embla__container">
            {moviesInGenre.map((movie, i) => {
              return (
                <>
                  <div className="genre_slider_item embla__slide" key={i}>
                    <img src={movie.poster} alt="movie poster" className="movie_poster" />
                    <h3>{movie.title}</h3>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default GenreSlider;
