import { Link } from "react-router-dom";

function AllMovies(props) {
  return (
    <section className="all_movies_section">
      <h1>Alle film</h1>
      <div className="all_movies_wrapper">
        {props.movies.map((movie, i) => {
          const itemData = {
            entity: movie,
            genreTitle: props.genreTitle,
          };
          return (
            <div className="movie_wrapper" key={i}>
              <Link to="/singleview" state={itemData}>
                <div className="movie">
                  <img
                    src={movie.plprogram$thumbnails["orig-198x136"]?.plprogram$url}
                    alt={movie.title}
                    className="movie_poster"
                  />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AllMovies;
