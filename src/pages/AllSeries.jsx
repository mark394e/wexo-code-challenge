import { Link } from "react-router-dom";

function AllSeries(props) {
  return (
    <section className="all_movies_section">
      <h1>Alle serier</h1>
      <div className="all_movies_wrapper">
        {props.series.map((serie, i) => {
          const itemData = {
            entity: serie,
            genreTitle: props.genreTitle,
          };
          return (
            <div className="movie_wrapper" key={i}>
              <Link to="/singleview" state={itemData}>
                <div className="movie">
                  <img
                    src={serie.plprogram$thumbnails["orig-198x136"]?.plprogram$url}
                    alt={serie.title}
                    className="movie_poster"
                  />
                  <h3>{serie.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AllSeries;
