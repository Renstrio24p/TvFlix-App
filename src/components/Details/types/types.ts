// Define the same interfaces as above
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
}

export interface CrewMember {
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

export interface MovieData {
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
