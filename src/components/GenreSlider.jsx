import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function GenreSlider(props) {
  // Nødvendigt hook for at få Embla til at virke
  const [emblaRef] = useEmblaCarousel({ dragFree: false, loop: true, align: "start" });

  // states til at opbevare data fra API
  const [moviesInGenre, setMoviesInGenre] = useState([]);
  const [seriesInGenre, setSeriesInGenre] = useState([]);

  // boolean til at vise loading animation eller ej
  const [loading, setLoading] = useState(true);

  // Fetch data fra API. Kaldes hver gang genreTitle ændrer sig.
  useEffect(() => {
    async function fetchMoviesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=movie`
      );
      const dataMovieGenres = await response.json();
      // console.log(`Movies in genre - ${props.genreTitle}`, dataMovieGenres.entries);
      setMoviesInGenre(dataMovieGenres.entries);
    }
    fetchMoviesInGenre();

    async function fetchSeriesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=series`
      );
      const dataSeriesGenres = await response.json();
      // console.log(`Series in genre - ${props.genreTitle}`, dataSeriesGenres.entries);
      setSeriesInGenre(dataSeriesGenres.entries);
    }
    fetchSeriesInGenre();
  }, [props.genreTitle]);

  // Merge movies and series in genre
  const mergedMoviesAndSeries = [...moviesInGenre, ...seriesInGenre];

  // Slice array to only show 20 items
  const slicedMoviesAndSeries = mergedMoviesAndSeries.slice(0, 20);

  useEffect(() => {
    setLoading(false);
  }, [slicedMoviesAndSeries]);

  return (
    <section className="genre_slider_wrapper">
      <div className="genre_title_wrapper">
        <h2>{props.genreTitle}</h2>
        <button>
          <Link to="/allmovies"> Vis alle {mergedMoviesAndSeries.length}</Link>
        </button>
      </div>
      {loading ? (
        <ClipLoader color="#36d7b7" />
      ) : (
        <div className="embla" ref={emblaRef}>
          <div className="genre_slider embla__container">
            {slicedMoviesAndSeries.map((item, i) => {
              return (
                <>
                  <Link to="/singleview" key={i}>
                    <div className="genre_slider_item embla__slide">
                      <img
                        src={item.plprogram$thumbnails["orig-295x203"].plprogram$url}
                        alt="poster"
                        className="movie_poster"
                      />
                      <h3>{item.title}</h3>
                    </div>
                  </Link>
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
