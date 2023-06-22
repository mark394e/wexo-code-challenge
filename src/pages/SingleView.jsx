import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function SingleView(props) {
  const location = useLocation();
  const { entity } = location.state;
  const [isItemWishlisted, setIsItemWishlisted] = useState(false);

  useEffect(() => {
    // Check if the entity is in the wishlist
    const isEntityWishlisted = props.wishlist.some((wishlistItem) => wishlistItem.id === entity.id);
    setIsItemWishlisted(isEntityWishlisted);
  }, [entity, props.wishlist]);

  // console.log(entity);
  // console.log(location);

  function handleClick() {
    if (props.wishlist.some((wishlistItem) => wishlistItem.id === entity.id)) {
      props.removeItemFromList(entity);
    }
    props.addItemToList(entity);
  }

  return (
    <div className="movie-details">
      <div className="movie-details__content">
        <div className="movie-details__poster">
          <img src={entity.plprogram$thumbnails["orig-365x251"].plprogram$url} alt={entity.title} />
        </div>
        <div className="movie-details__header">
          <div className="title-wrapper">
            <h1>{entity.title}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className={`${isItemWishlisted ? "fav-btn__icon--active" : "fav-btn__icon"}`}
              viewBox="0 0 16 16"
              onClick={handleClick}
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          </div>
          <p className="release-year">{entity.plprogram$year}</p>
          <div className="genre">
            {entity.plprogram$tags
              .filter((tag) => tag.plprogram$scheme === "genre")
              .map((tag, i) => {
                const genre = tag.plprogram$title;
                return <span key={i}>{genre}</span>;
              })
              .reduce((prev, curr, index) => [prev, <span key={index}>,&nbsp;</span>, curr])}
          </div>
        </div>
        <div className="movie-details__info">
          <div className="movie-details__info--desc">
            <p>{entity.description}</p>
          </div>
          <div className="movie-details__info--cast">
            <div>
              <h3>Medvirkende:</h3>
              {entity.plprogram$credits
                .filter((credit) => credit.plprogram$creditType === "actor")
                .map((credit, i) => {
                  // const creditType = credit.plprogram$creditType;
                  const personName = credit.plprogram$personName;

                  // const capitalizedCreditType =
                  //   creditType.charAt(0).toUpperCase() + creditType.slice(1);

                  return (
                    <div key={i} className="cast-wrapper">
                      {/* <p className="cast-type">{capitalizedCreditType}:</p> */}
                      <p>{personName}</p>
                    </div>
                  );
                })}
            </div>
            <div>
              <h3>Instruktør(e):</h3>
              {entity.plprogram$credits
                .filter((credit) => credit.plprogram$creditType === "director")
                .map((credit, i) => {
                  const personName = credit.plprogram$personName;

                  return (
                    <div key={i} className="cast-wrapper">
                      <p>{personName}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-details__backdrop">
        <img src={entity.plprogram$thumbnails["orig-424x828"].plprogram$url} alt={entity.title} />
      </div>
    </div>
  );
}

export default SingleView;
