// Function to create a movie card element
export const createMovieCard = (movie: any): HTMLElement => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
    <figure class="poster-box card-banner">
      <img 
        src="https://image.tmdb.org/t/p/w500${poster_path}" 
        alt="${title}" 
        class="img-cover"
      >
    </figure>
    <h4 class='title'>${title}</h4>
    <div class="meta-list">
      <div class="meta-item">
        <img 
          src="/star.webp" 
          alt="rating"
          width='20'
          height='20'
          loading='lazy'
        >
        <span class="span">${vote_average}</span>
      </div>
      <div class="card-badge">${new Date(release_date).getFullYear()}</div>
    </div>
    <a href="/details?id=${id}" class="card-btn" title="${title}"></a>
  `;
  return movieCard;
};
