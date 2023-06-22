import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleView from "./pages/SingleView";
import FrontPage from "./pages/FrontPage";
import AllMovies from "./pages/AllMovies";
import Header from "./components/Header";
import AllSeries from "./pages/AllSeries";

function App() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Update localStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const removeItemFromList = (item) => {
    setWishlist((prevList) => prevList.filter((wishlistItem) => wishlistItem.guid !== item.guid));
  };

  const addItemToList = (item) => {
    // Check if the item already exists in the wishlist
    const itemExists = wishlist.find((wishlistItem) => wishlistItem.guid === item.guid);

    if (!itemExists) {
      setWishlist((prevList) => [...prevList, item]);
    } else {
      removeItemFromList(item);
      console.log("Item removed from the wishlist");
    }
  };

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie`
      );
      const dataMovie = await response.json();
      setMovies(dataMovie.entries);
    }
    fetchMovies();

    async function fetchSeries() {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series`
      );
      const dataSeries = await response.json();
      setSeries(dataSeries.entries);
    }

    fetchSeries();
  }, []);

  return (
    <div className="App">
      <Header wishlist={wishlist} />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/singleview"
          element={
            <SingleView
              addItemToList={addItemToList}
              removeItemFromList={removeItemFromList}
              wishlist={wishlist}
            />
          }
        />
        <Route path="/allmovies" element={<AllMovies movies={movies} />} />
        <Route path="/allseries" element={<AllSeries series={series} />} />
      </Routes>
    </div>
  );
}

export default App;
