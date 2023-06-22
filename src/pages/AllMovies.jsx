import React from "react";
import { Link } from "react-router-dom";

function AllMovies(props) {
  return (
    <>
      <h1>Alle film</h1>
      <div className="all_movies_wrapper">
        {props.movies.map((item, i) => {
          return (
            <>
              <Link to="/singleview" key={i}>
                <div className="genre_slider_item embla__slide">
                  <img
                    // src={item.plprogram$thumbnails["orig-295x203"].plprogram$url}
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
    </>
  );
}

export default AllMovies;
