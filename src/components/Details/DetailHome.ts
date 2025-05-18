import { useTSElements } from "../../utils/hooks/useTSElements";
import { fetchMovieDetails } from "../func/fetchMovies";
import { configDetailsHome } from "./config/allow";
import { MovieData } from "./types/types";
import {
  getTrailers,
  getReleaseYear,
  getGenres,
  getCast,
  getDirectors,
  getTrailerVideosHtml,
} from "./func/getData";

// Define image sizes
const IMAGE_SIZES = {
  small: "w342",
  medium: "w500",
  large: "w780",
  original: "original",
};

// Function to get image URL based on size
const getImageUrl = (path: string | null, size: string): string => {
  if (!path) {
    return "/path/to/default-image.webp"; // Fallback image path
  }

  const sizeKey =
    (IMAGE_SIZES as { [key: string]: string })[size] || IMAGE_SIZES.medium;
  return `https://image.tmdb.org/t/p/${sizeKey}${path}`;
};

export const details = async (DOM: HTMLElement) => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (!movieId) {
    console.error("No movie ID found in the URL");
    return;
  }

  try {
    const movieData: MovieData = await fetchMovieDetails(movieId);

    // Use the reusable functions
    const trailers = getTrailers(movieData.videos);
    const releaseYear = getReleaseYear(movieData.release_date);
    const genres = getGenres(movieData.genres);
    const cast = getCast(movieData.credits.cast);
    const directors = getDirectors(movieData.credits.crew);
    const trailersHtml = getTrailerVideosHtml(trailers);

    const ui = useTSElements(
      DOM,
      /*html*/ `
        <div class='movie-detail'>
          <div 
            class="backdrop-image"
            style='background-image:url("${getImageUrl(
              movieData.backdrop_path,
              "original"
            )}")'
          ></div>
          <figure class='poster-box movie-poster' width='120'>
            <img 
              src="${getImageUrl(movieData.poster_path, "w500")}" 
              alt="${movieData.title}" 
              class="img-cover"
            >
          </figure>
          <div class="detail-box">
            <div class="detail-content">
              <h1 class="heading">${movieData.title}</h1>
              <div class="meta-list">
                <div class="meta-item">
                  <img 
                    src="/star.webp" 
                    alt="rating"
                    width='20'
                    height="20"
                  >
                  <span class="span">${movieData.vote_average}</span>
                </div>
                <div class="separator"></div>
                <div class="meta-item">${releaseYear}</div>
                <div class="meta-item card-badge">${
                  movieData.adult ? "PG-13" : "R"
                }</div>
              </div>
              <p class="genre">${genres}</p>
              <p class="overview">${movieData.overview}</p>
              <ul class="detail-list">
                <li class="list-item">
                  <p class="list-name">Starring</p>
                  <p>${cast}</p>
                </li>
                <li class="list-item">
                  <p class="list-name">Directed By</p>
                  <p>${directors}</p>
                </li>
              </ul>
            </div>
            <div class="title-wrapper">
              <h2 class="title-large">Trailers and Clips</h2>
            </div>
            <div class="slider-list">
              <div class="slider-inner">
                ${trailersHtml}
              </div>
            </div>
          </div>
        </div>
      `,
      configDetailsHome
    );

    return ui;
  } catch (error) {
    console.error("Failed to fetch movie details", error);
  }
};
