import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

function GenreMenu() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="genre_menu_list_wrapper embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="genre_menu_list embla__container">
          {/* {props.genre.map((genre, i) => (
            <div key={i} className="genre_item embla__slide">
              <a href="#" className="genre_item_btn">
                GENRE TITLE
              </a>
            </div>
          ))} */}
        </div>
        <button className="embla__prev" onClick={scrollPrev}>
          Prev
        </button>
        <button className="embla__next" onClick={scrollNext}>
          Next
        </button>
      </div>
    </section>
  );
}

export default GenreMenu;
