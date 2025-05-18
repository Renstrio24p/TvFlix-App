import { api_key, fetchDataFromServer } from "./api";
import { bannerSlider } from "../../components/Home/BannerSlider";

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

export const fetchApi = (DOM: HTMLElement) => {
  fetchDataFromServer(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
    ({ results: movieList }: { results: Movie[] }) => {
      const slides = movieList.map(movie => ({
        imgSrc: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
        altText: movie.title,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear().toString(),
        rating: movie.vote_average,
        genres: movie.genre_ids.map(id => getGenreName(id)),
        description: movie.overview,
        detailsUrl: `/details?id=${movie.id}`,
        controlImgSrc: `https://image.tmdb.org/t/p/w1280${movie.poster_path}`,
      }));

      // Initialize the banner slider with the fetched slides data
      bannerSlider(DOM.querySelector("#banner-slider")!, slides);
    }
  );
};

// Helper function to map genre IDs to genre names
const getGenreName = (id: number): string => {
  const genres: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    // Add more genre mappings as needed
  };
  return genres[id] || "Unknown";
};
