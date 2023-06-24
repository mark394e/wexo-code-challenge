import { Link } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // skifter state til det modsatte af forrige state
  const toggleWishlist = () => {
    setIsWishlistOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <div className=" home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              className="bi bi-house-fill home"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
              />
              <path
                fillRule="evenodd"
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
              />
            </svg>
          </div>
        </Link>
        <ul>
          <li>
            <Link to="/allmovies">
              <div className="menu-item">Film</div>
            </Link>
          </li>
          <li>
            <Link to="/allseries">
              <div className="menu-item">Serier</div>
            </Link>
          </li>
          <li>
            <div className="wishlist" onClick={toggleWishlist}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
      {/* hvis 'isWishlistOpen' er true tilføjes klassen 'open' */}
      <div className={`wishlist-box ${isWishlistOpen ? "open" : ""}`}>
        <div className="wishlist-title-wrapper">
          <h2>Din ønskeliste</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-x-square-fill"
            viewBox="0 0 16 16"
            onClick={toggleWishlist}
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
        </div>
        <ul>
          {/* mapper gennem alle item i wishlist og viser dem i sidebaren */}
          {props.wishlist.map((item, i) => {
            const itemData = {
              entity: item,
              genreTitle: props.genreTitle,
            };
            return (
              <li key={i}>
                <Link to="/singleview" state={itemData}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

export default Header;
