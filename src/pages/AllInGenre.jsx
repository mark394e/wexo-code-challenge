import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AllInGenre(props) {
  // for at sende props via Routes fra react-router-dom, skal man benytte useLocation hook
  const location = useLocation();
  const { media, genreTitle } = location.state;

  return (
    <section className="all_movies_section">
      <h1>{genreTitle}</h1>
      <div className="all_movies_wrapper">
        {media.map((item, i) => {
          const itemData = {
            entity: item,
            genreTitle: props.genreTitle,
          };
          return (
            <div className="movie_wrapper" key={i}>
              <Link to="/singleview" state={itemData}>
                <div className="movie">
                  <img
                    src={item.plprogram$thumbnails["orig-198x136"]?.plprogram$url}
                    alt={item.title}
                    className="movie_poster"
                  />
                  <h3>{item.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AllInGenre;
