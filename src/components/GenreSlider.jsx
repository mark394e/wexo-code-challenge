import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function GenreSlider(props) {
  // Nødvendigt hook for at få Embla til at virke
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    align: "start",
    slidesToScroll: 3,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // states til at opbevare data fra API
  const [moviesInGenre, setMoviesInGenre] = useState([]);
  const [seriesInGenre, setSeriesInGenre] = useState([]);

  // boolean til at afgøre om loading spinner skal vises eller ej
  const [loading, setLoading] = useState(true);

  // Fetch data fra API. Kaldes hver gang genreTitle ændrer sig.
  useEffect(() => {
    async function fetchMoviesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=movie&range:1-20`
      );
      const dataMovieGenres = await response.json();
      // samler alle film fra en genre i et array i state
      setMoviesInGenre(dataMovieGenres.entries);
    }
    fetchMoviesInGenre();

    async function fetchSeriesInGenre() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${props.genreTitle}&lang=da&byProgramType=series&range:1-20`
      );
      const dataSeriesGenres = await response.json();
      // samler alle serier fra en genre i et array i state
      setSeriesInGenre(dataSeriesGenres.entries);
    }
    fetchSeriesInGenre();
  }, [props.genreTitle]);

  // Sammenflet arrays med film og serier
  const mergedMoviesAndSeries = [...moviesInGenre, ...seriesInGenre];

  // Slice array til 20 elementer
  const slicedMoviesAndSeries = mergedMoviesAndSeries.slice(0, 20);

  // Data til at sende med til AllInGenre
  const allMediaInGenre = {
    genreTitle: props.genreTitle,
    media: mergedMoviesAndSeries,
  };

  useEffect(() => {
    setLoading(false);
  }, [slicedMoviesAndSeries]);

  return (
    <section className="genre_slider_wrapper">
      <div className="genre_title_wrapper">
        <h2>{props.genreTitle}</h2>
        <div className="show-all-btn">
          <Link to="/allingenre" state={allMediaInGenre}>
            Vis alle {mergedMoviesAndSeries.length}
          </Link>
        </div>
      </div>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="genre_slider embla__container">
            {/* tjekker om loading-state er true eller false og viser derefter det korrekte indhold */}
            {loading ? (
              <ClipLoader color="#36d7b7" />
            ) : (
              <>
                {slicedMoviesAndSeries.map((item, i) => {
                  // console.log(item);
                  const itemData = {
                    entity: item,
                  };

                  return (
                    <Link to={"/singleview"} state={itemData} key={i}>
                      <div className="genre_slider_item embla__slide">
                        <img
                          src={item.plprogram$thumbnails["orig-295x203"].plprogram$url}
                          alt={item.title}
                          className="movie_poster"
                        />
                        <h3>{item.title}</h3>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <button className="embla__prev" onClick={scrollPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-caret-left"
            viewBox="0 0 16 16"
          >
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-caret-right"
            viewBox="0 0 16 16"
          >
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default GenreSlider;
