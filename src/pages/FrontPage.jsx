import GenreMenu from "../components/GenreMenu";
import GenreSlider from "../components/GenreSlider";
import Footer from "../components/Footer";

function FrontPage() {
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
            <button>Vis alle film</button>
            <button>Vis alle serier</button>
          </div>
        </div>
        <GenreMenu />
        {genres.map((genre, i) => (
          <GenreSlider key={i} genreTitle={genre} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default FrontPage;
