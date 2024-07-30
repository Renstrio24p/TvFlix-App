import { useTSElements } from "../../utils/hooks/useTSElements";

type Movie = {
  backdrop_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  vote_average: number;
  id: string;
};

export const movieList = (DOM: HTMLElement, movies: Movie[]) => {
  const ui = useTSElements(
    DOM,
    /*html*/ `
      <div class="movie-list">
        <div class="title-wrapper">
          <h3 class="title-large">Upcoming Movies</h3>
        </div>
        <div class="slider-list">
          <div class="slider-inner">
            ${movies
              .map(
                movie => `
              <div class="movie-card">
                <figure class="poster-box card-banner">
                  <img 
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                    alt="${movie.title}" 
                    class="img-cover"
                  >
                </figure>
                <h4 class='title'>${movie.title}</h4>
                <div class="meta-list">
                  <div class="meta-item">
                    <img 
                      src="/star.webp" 
                      alt="rating"
                      width='20'
                      height='20'
                      loading='lazy'
                    >
                    <span class="span">${movie.vote_average}</span>
                  </div>
                  <div class="card-badge">${new Date(
                    movie.release_date
                  ).getFullYear()}</div>
                </div>
                <a href="/details?id=${movie.id}" class="card-btn" title='${
                  movie.title
                }'></a>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `
  );

  return ui;
};
