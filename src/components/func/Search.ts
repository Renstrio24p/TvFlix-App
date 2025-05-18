"use strict";

import { createMovieCard } from "../Movies/func/createMovieCard.js";
import { api_key, fetchDataFromServer } from "./api.js";

export function search(DOM: HTMLElement) {
  const searchWrapper = DOM.querySelector("[search-wrapper]") as HTMLElement;
  const searchField = DOM.querySelector("input") as HTMLInputElement;

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  (document.querySelector("main") as HTMLElement).appendChild(
    searchResultModal
  );

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

    searchTimeout = window.setTimeout(function () {
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
}
