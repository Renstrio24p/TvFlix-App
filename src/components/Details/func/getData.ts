import { MovieData } from "../types/types";

export const getTrailers = (videos: { results: any[] }) => {
  return videos.results.filter(video => video.type === "Trailer");
};

export const getReleaseYear = (releaseDate: string) => {
  return new Date(releaseDate).getFullYear();
};

export const getGenres = (genres: { name: string }[]) => {
  return genres.map(genre => genre.name).join(", ");
};

export const getCast = (cast: { name: string }[]) => {
  return cast.map(member => member.name).join(", ");
};

export const getDirectors = (crew: { job: string; name: string }[]) => {
  return crew
    .filter(member => member.job === "Director")
    .map(member => member.name)
    .join(", ");
};

export const getTrailerVideosHtml = (
  trailers: { key: string; name: string }[]
) => {
  return trailers
    .map(
      video => /*html*/ `
        <div class="video-card">
            <iframe width='500' height="294" src="https://www.youtube.com/embed/${video.key}?&theme=dark&color=white&rel=0"
            frameborder="0" allowfullscreen title="${video.name}" class="img-cover" loading="lazy"></iframe>
        </div>
      `
    )
    .join("");
};

export const getMoviesData = (movieData: MovieData) => {
  console.log("Movie Data:", movieData);

  const trailers = getTrailers(movieData.videos);
  const releaseYear = getReleaseYear(movieData.release_date);
  const genres = getGenres(movieData.genres);
  const cast = getCast(movieData.credits.cast);
  const directors = getDirectors(movieData.credits.crew);
  const trailersHtml = getTrailerVideosHtml(trailers);

  return {
    trailers,
    releaseYear,
    genres,
    cast,
    directors,
    trailersHtml,
  };
};
