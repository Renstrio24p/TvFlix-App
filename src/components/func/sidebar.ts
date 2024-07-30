"use strict";

import { useTSEventAll } from "../../utils/hooks/useTSAllElements.ts";
import { useAnchor } from "../../utils/hooks/useTSAnchor.ts";
import { useTSPurifier } from "../../utils/hooks/useTSPurifier.ts";
import { getMovieList } from "../Movies/func/getMovieByGenre.ts";
import { api_key, fetchDataFromServer } from "./api.ts";
import { toggleSidebar } from "./toggleSidebar.ts";

type Genre = {
  id: number;
  name: string;
};

type GenreList = {
  [id: number]: string;
};

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
    <div class="sidebar-list">
      <p class="title">Genre</p>
      <!-- Placeholder for dynamic genre links -->
    </div>
    <div class="sidebar-list">
      <p class="title">Language</p>
      <a href="/movielist?language=english" class="sidebar-link">English</a>
      <a href="/movielist?language=tagalog" class="sidebar-link">Tagalog</a>
      <a href="/movielist?language=hindi" class="sidebar-link">Hindi</a>
      <a href="/movielist?language=chinese" class="sidebar-link">Chinese</a>
      <a href="/movielist?language=korean" class="sidebar-link">Korean</a>
    </div>
  `)
  );

  function genreLink() {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", `/movielist?genre=${genreId}`); // Use genre ID in URL
      link.id = `genre-${genreId}`; // Update ID to be unique
      link.textContent = genreName;

      useAnchor(link);

      sidebarInner.querySelector(".sidebar-list")!.appendChild(link);

      useTSEventAll(
        `genre-${genreId}`,
        "click",
        () => getMovieList(`with_genres=${genreId}`) // Use genre ID in API query
      );
    }
  }

  const sidebar = document.querySelector(".sidebar") as HTMLElement;
  toggleSidebar(sidebar);

  return genreList;
};
