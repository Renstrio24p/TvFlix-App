import { useAnchor } from "../../utils/hooks/useTSAnchor";
import { useTSElements } from "../../utils/hooks/useTSElements";
import { api_key } from "../func/api";

const BASE_URL = "https://api.themoviedb.org/3/movie";

// Define image sizes
const IMAGE_SIZES = {
  small: "w342",
  medium: "w500",
  large: "w780",
  original: "original",
};

interface Movie {
  id: number;
  title: string;
  poster_path: string | null; // Allow null values
  release_date: string;
  vote_average: number;
}

const fetchRelatedMovies = async (movieId: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${movieId}/recommendations?api_key=${api_key}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching related movies:", error);
    return [];
  }
};

// Function to get image URL based on size
const getPosterUrl = (posterPath: string | null, size: string): string => {
  if (!posterPath) {
    return "/path/to/default-image.webp"; // Fallback image path
  }
  const sizeKey =
    (IMAGE_SIZES as { [key: string]: string })[size] || IMAGE_SIZES.medium;
  return `https://image.tmdb.org/t/p/${sizeKey}${posterPath}`;
};

export const detailsList = async (DOM: HTMLElement) => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (!movieId) {
    console.error("No movie ID found in the URL");
    return;
  }

  try {
    const relatedMovies = await fetchRelatedMovies(movieId);

    const movieCardsHtml = relatedMovies
      .map(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        const posterUrl = getPosterUrl(movie.poster_path, "w342"); // Set desired size here

        return /*html*/ `
        <div class="movie-card">
          <figure class="poster-box card-banner">
            <img 
              src="${posterUrl}" 
              alt="${movie.title}" 
              class="img-cover"
              loading="lazy"
            >
          </figure>
          <h4 class="title">${movie.title}</h4>
          <div class="meta-list">
            <div class="meta-item">
              <img 
                src="/star.webp" 
                alt="rating"
                width="20"
                height="20"
                loading="lazy"
              >
              <span class="span">${movie.vote_average}</span>
            </div>
            <div class="card-badge">${releaseYear}</div>
          </div>
          <a href="/details?id=${movie.id}" class="card-btn" title="${movie.title}"></a>
        </div>
      `;
      })
      .join("");

    const ui = useTSElements(
      DOM,
      /*html*/ `
        <div class="movie-list">
          <div class="title-wrapper">
            <h3 class="title-large">You May Also Like</h3>
          </div>
          <div class="slider-list">
            <div class="slider-inner">
              ${movieCardsHtml}
            </div>
          </div>
        </div>
      `
    );

    const anchor = DOM.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
    useAnchor(anchor);

    return ui;
  } catch (error) {
    console.error("Failed to fetch related movies:", error);
  }
};
