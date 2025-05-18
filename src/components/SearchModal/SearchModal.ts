import { useTSElements } from "../../utils/hooks/useTSElements";

export const searchModal = (DOM: HTMLElement) => {
  const ui = useTSElements(
    DOM,
    /*html*/ `
        <div class='search-modal'>
            <label for="results" class='label'>Results for</label>
            <h4 class='heading'>Puss in Boots</h4>
            <div class="movie-list">
                <div class="grid-list">
                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                            <div class="card-badge">2022</div>
                        </div>
                        <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                    </div>

                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                            <div class="card-badge">2022</div>
                        </div>
                        <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                    </div>

                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                            <div class="card-badge">2022</div>
                        </div>
                        <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                    </div>

                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                            <div class="card-badge">2022</div>
                        </div>
                        <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                    </div>

                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                            <div class="card-badge">2022</div>
                        </div>
                        <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                    </div>

                    <div class="movie-card">
                        <figure class="poster-box card-banner">
                            <img 
                                src="/slider-control.webp" 
                                alt="Puss in Boots: The Last Wish" 
                                class="img-cover"
                            >
                        </figure>
                        <h4 class='title'>Puss in Boots: The Last Wish</h4>
                        <div class="meta-list">
                            <div class="meta-item">
                                <img 
                                    src="/star.webp" 
                                    alt="rating"
                                    width='20'
                                    height='20'
                                    loading='lazy'
                                >
                                <span class="span">8.4</span>
                            </div>
                        <div class="card-badge">2022</div>
                    </div>
                    <a href="/details" class="card-btn" title='Puss in Boots: The Last Wish'></a>
                </div>
            </div>
        </div>
        `
  );

  return ui;
};
