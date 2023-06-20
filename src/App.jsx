import Header from "./components/Header";
import GenreMenu from "./components/GenreMenu";
import GenreSlider from "./components/GenreSlider";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="">
        <h1>MOVIE SHOP DELUXE</h1>
        <GenreMenu />
        <GenreSlider />
      </main>
      <Footer />
    </div>
  );
}

export default App;
