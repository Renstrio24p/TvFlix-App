"use strict";

import { useTSPurifier } from "../../utils/hooks/useTSPurifier";
import { runAnchor } from "../func/anchors";
import { api_key, fetchDataFromServer } from "../func/api";
import { createMovieCard } from "./func/createMovieCard";

// Function to initialize the movies list with optional genre and language filtering
export const moviesList = async (DOM: HTMLElement) => {
  const params = new URLSearchParams(window.location.search);
  const genreId = params.get("genre");
  const searchQuery = params.get("search");
  const language = params.get("language") || "en"; // Default language is English

  let genreName = "Movies"; // Default genre name
  let languageName = "Movies"; // Default language name

  // Fetch genre name if genreId is present
  if (genreId) {
    const genreList = await fetchGenreList();
    genreName = genreList[Number(genreId)] || "Movies";
  }

  // Set the language name based on the language code
  const languageNames: { [key: string]: string } = {
    en: "English",
    tl: "Tagalog",
    hi: "Hindi",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
  };

  languageName = languageNames[language] || "Movies";

  const genreUrlParam = genreId ? `&with_genres=${genreId}` : "";
  const searchUrlParam = searchQuery
    ? `&query=${encodeURIComponent(searchQuery)}`
    : "";
  const languageUrlParam = `&with_original_language=${language}`;

  let currentPage = 1;
  let totalPages = 0;

  const fetchMovies = (page: number) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${page}${genreUrlParam}${searchUrlParam}${languageUrlParam}`;

    fetchDataFromServer(url, ({ results: movieList, total_pages }) => {
      if (totalPages === 0) {
        totalPages = total_pages;
      }

      document.title = `${genreName} - ${languageName} Movies - Tvflix`;

      let movieListElem = DOM.querySelector(
        ".movie-list.genre-list"
      ) as HTMLElement;
      if (!movieListElem) {
        movieListElem = document.createElement("section");
        movieListElem.classList.add("movie-list", "genre-list");
        movieListElem.setAttribute("aria-label", `${genreName} Movies`);

        movieListElem.innerHTML = String(
          useTSPurifier(`
          <div class="title-wrapper">
            <h1 class="heading">All ${languageName} ${genreName}</h1>
          </div>
          <div class="grid-list"></div>
          <div class='load'>
            <button class="btn load-more" load-more>Load More</button>
          </div>
        `)
        );

        DOM.appendChild(movieListElem);
      }

      // Add movie cards based on fetched items
      for (const movie of movieList) {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list")!.appendChild(movieCard);
        runAnchor(movieListElem);
      }

      // Load more button functionality
      const loadMoreBtn = DOM.querySelector(".load-more") as HTMLButtonElement;
      loadMoreBtn.addEventListener("click", function () {
        if (currentPage >= totalPages) {
          this.style.display = "none"; // Hide the button if no more pages
          return;
        }

        currentPage++;
        this.classList.add("loading");

        fetchMovies(currentPage);

        // Remove loading class when new movies are fetched
        this.classList.remove("loading");
      });
    });
  };

  // Initial fetch
  fetchMovies(currentPage);

  // Initialize search functionality
  initializeSearch();
};

// Fetch genre list to get genre names by ID
const fetchGenreList = async (): Promise<{ [id: number]: string }> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const genreList: { [id: number]: string } = {};
    data.genres.forEach((genre: { id: number; name: string }) => {
      genreList[genre.id] = genre.name;
    });
    return genreList;
  } catch (error) {
    console.error("Error fetching genre list:", error);
    return {};
  }
};

// Function to initialize search functionality
const initializeSearch = () => {
  const searchWrapper = document.querySelector(
    "[search-wrapper]"
  ) as HTMLElement;
  const searchField = document.querySelector("input") as HTMLInputElement;

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main")?.appendChild(searchResultModal);

  let searchTimeout: number | undefined;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      if (searchTimeout !== undefined) {
        clearTimeout(searchTimeout);
      }
      return;
    }

    searchWrapper.classList.add("searching");
    if (searchTimeout !== undefined) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = window.setTimeout(() => {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
          searchField.value
        )}&page=1&include_adult=false`,
        function ({ results: movieList }: { results: any[] }) {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = ""; // remove old results

          searchResultModal.innerHTML = `
            <p class="label">Results for</p>
            <h1 class="heading">${searchField.value}</h1>
            <div class="movie-list">
              <div class="grid-list"></div>
            </div>
          `;

          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            searchResultModal
              .querySelector(".grid-list")
              ?.appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
};
