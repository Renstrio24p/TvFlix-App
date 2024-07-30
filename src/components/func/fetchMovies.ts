// ../func/fetchMovies.ts

import { api_key, fetchDataFromServer } from "./api";

// Define interfaces for the API response
interface CastMember {
  id: number;
  name: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieData {
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
  genres: Genre[];
  overview: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos: {
    results: Video[];
  };
}

// Fetch movie details and return a Promise
export const fetchMovieDetails = async (id: string): Promise<MovieData> => {
  return new Promise<MovieData>((resolve, reject) => {
    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=credits,videos`,
      (data: any) => resolve(data as MovieData),
      (error: any) => reject(error)
    );
  });
};
