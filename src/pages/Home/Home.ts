import { api_key, fetchDataFromServer } from "../../components/func/api";
import { bannerSlider } from "../../components/Home/BannerSlider";
import { movieList } from "../../components/Home/MoviesList";
import { useTSComponent } from "../../utils/hooks/useTSComponent";
import { useTSElements } from "../../utils/hooks/useTSElements";
import { useTSMetaData } from "../../utils/hooks/useTSMetaData";
import { configHomePage } from "./config/Home.config";

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

export default function Home(DOM: HTMLElement, websiteName: string) {
  const siteName = String(websiteName);

  useTSMetaData({
    name: `${siteName} Home`,
    description: `${siteName} is a popular movie app created by Waren Gador.`,
    author: "Waren Gador",
  });

  document.title = `${siteName} - Home`;

  const ui = useTSElements(
    DOM,
    /*html*/ `
      <article class="w-full">
        <section 
          class="banner lg:h-[90em] max-h-[60em]" 
          aria-label='popular movies'
          id='banner-slider'
        ></section>
        <section
          class='movie-list'
          aria-label='upcoming movies'
          id='movies-list'
        >
        </section>
      </article>
    `,
    configHomePage
  );

  // Fetch movie data
  fetchDataFromServer(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
    ({ results: movieList }: { results: Movie[] }) => {
      const slides = movieList.map(movie => ({
        imgSrc: `https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`,
        altText: movie.title,
        title: movie.title,
        year: new Date(movie.release_date).getFullYear().toString(),
        rating: movie.vote_average,
        genres: movie.genre_ids.map(id => getGenreName(id)),
        description: movie.overview,
        detailsUrl: `/details?id=${movie.id}`,
        controlImgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));

      // Initialize the banner slider with the fetched slides data
      useTSComponent("banner-slider", DOM, bannerSlider, slides);
    }
  );

  // Fetch upcoming movies data
  fetchDataFromServer(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=1`,
    ({ results: upcomingMovies }: { results: Movie[] }) => {
      // Initialize the movie list component with the fetched movies data
      useTSComponent("movies-list", DOM, movieList, upcomingMovies);
    }
  );

  return ui;
}

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
