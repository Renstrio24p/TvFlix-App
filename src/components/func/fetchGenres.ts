// Define the API endpoint and token
const genreListUrl =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjExMmQxYzM2ZDRhOGRkYzAwZTFiMjUzY2FlODEzMiIsIm5iZiI6MTcyMjI4OTU0NC4xMzIxNDUsInN1YiI6IjY1YTlhMDVlN2NhYTQ3MDEzNjA5Mjk1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7BqXpvsER3PW61drxhsm0o7aQeMU1xZesa7M0HQUaPM";

// Fetch genre list and handle response
export const fetchGenres = async () => {
  try {
    const response = await fetch(genreListUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genre list:", error);
    return [];
  }
};
