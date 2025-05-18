"use strict";

import { useTSEventAll } from "../../utils/hooks/useTSAllElements.ts";
import { useTSPurifier } from "../../utils/hooks/useTSPurifier.ts";
import { getMovieList } from "../Movies/func/getMovieByGenre.ts";
import { runAnchor } from "./anchors.ts";
import { api_key, fetchDataFromServer } from "./api.ts";
import { toggleSidebar } from "./toggleSidebar.ts";

type Genre = {
  id: number;
  name: string;
};

type GenreList = {
  [id: number]: string;
};

// Language options data
const languages = [
  { code: "en", name: "English" },
  { code: "tl", name: "Tagalog" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

export const sidebarfetch = () => {
  const genreList: GenreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    ({ genres }: { genres: Genre[] }) => {
      genres.forEach(({ id, name }) => {
        if (id && name) {
          genreList[id] = name;
        }
      });
      genreLink();
    }
  );

  const sidebarInner = document.querySelector(".sidebar-inner") as HTMLElement;

  sidebarInner.innerHTML = String(
    useTSPurifier(/*html*/ `
    <div class="sidebar-list genre">
      <p class="title">Genre</p>
      <!-- Placeholder for dynamic genre links -->
    </div>
    <div class="sidebar-list lang">
      <p class="title">Language</p>
      <!-- Placeholder for dynamic language links -->
    </div>
  `)
  );

  function genreLink() {
    const genreListElem = sidebarInner.querySelector(
      ".sidebar-list.genre"
    ) as HTMLElement;
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", `/movielist?genre=${genreId}`); // Use genre ID in URL
      link.id = `genre-${genreId}`; // Update ID to be unique
      link.textContent = genreName;

      genreListElem.appendChild(link);

      useTSEventAll(`genre-${genreId}`, "click", () =>
        getMovieList(`with_genres=${genreId}`)
      );

      genreListElem.appendChild(link);
      runAnchor(genreListElem);
    }
  }

  function languageLink() {
    const languageListElem = sidebarInner.querySelector(
      ".sidebar-list.lang"
    ) as HTMLElement;
    languages.forEach(({ code, name }) => {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", `/movielist?language=${code}`); // Use language code in URL
      link.textContent = name;

      languageListElem.appendChild(link);
      runAnchor(languageListElem);
    });
  }

  // Call languageLink function to add language links
  languageLink();

  const sidebar = document.querySelector(".sidebar") as HTMLElement;
  toggleSidebar(sidebar);

  return genreList;
};
