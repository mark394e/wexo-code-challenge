import GenreSlider from "../components/GenreSlider";
import { Link } from "react-router-dom";

function FrontPage() {
  // array med alle genrer
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

  return (
    <div>
      <main>
        <div className="blurred_line"></div>
        <div className="title_wrapper">
          <h1>MOVIE SHOP DELUXE</h1>
          <div>
            <button>
              <Link to="/allmovies">Alle film</Link>
            </button>
            <button>
              <Link to="/allseries">Alle serier</Link>
            </button>
          </div>
        </div>
        {/* der oprettes et GenreSlider-component for hver genre i arrayet */}
        {genres.map((genre, i) => (
          <GenreSlider key={i} genreTitle={genre} />
        ))}
      </main>
    </div>
  );
}

export default FrontPage;
