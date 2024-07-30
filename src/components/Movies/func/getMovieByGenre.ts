import { api_key } from "../../func/api";
import { createMovieCard } from "./createMovieCard";

export const fetchMoviesByGenre = async (genre: string, page: number = 1) => {
  try {
    const urlParam = `with_genres=${genre}`;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${page}&${urlParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { movieList: data.results, totalPages: data.total_pages };
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { movieList: [], totalPages: 0 };
  }
};

export const getMovieList = async (query: string) => {
  const container = document.querySelector("[page-content]") as HTMLElement;

  // Fetch movies based on the query
  const { movieList, totalPages } = await fetchMoviesByGenre(query);

  // Update the movie list with the fetched data
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list", "genre-list");
  movieListElem.setAttribute("aria-label", `${query} Movies`);

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h1 class="heading">All ${query} Movies</h1>
    </div>
    <div class="grid-list"></div>
    <button class="btn load-more" load-more>Load More</button>
  `;

  // Add movie cards based on fetched items
  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".grid-list")!.appendChild(movieCard);
  }

  container.appendChild(movieListElem);

  // Load more button functionality
  const loadMoreBtn = movieListElem.querySelector(
    "[load-more]"
  ) as HTMLButtonElement;
  let currentPage = 1;
  loadMoreBtn.addEventListener("click", async function () {
    if (currentPage >= totalPages) {
      this.style.display = "none"; // Hide the button if no more pages
      return;
    }

    currentPage++;
    this.classList.add("loading");

    const { movieList: additionalMovies } = await fetchMoviesByGenre(
      query,
      currentPage
    );

    this.classList.remove("loading");

    for (const movie of additionalMovies) {
      const movieCard = createMovieCard(movie);
      movieListElem.querySelector(".grid-list")!.appendChild(movieCard);
    }
  });
};
