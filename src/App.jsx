import { Route, Routes } from "react-router-dom";
import SingleView from "./pages/SingleView";
import FrontPage from "./pages/FrontPage";
import AllMovies from "./pages/AllMovies";
import Header from "./components/Header";
import AllSeries from "./pages/AllSeries";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/singleview" element={<SingleView />} />
        <Route path="/allmovies" element={<AllMovies />} />
        <Route path="/allseries" element={<AllSeries />} />
      </Routes>
    </div>
  );
}

export default App;
