import { useTSElements } from "../../utils/hooks/useTSElements";

type SlideData = {
  imgSrc: string;
  altText: string;
  title: string;
  year: string;
  rating: number;
  genres: string[];
  description: string;
  detailsUrl: string;
  controlImgSrc: string;
};

export const bannerSlider = (DOM: HTMLElement, slides: SlideData[]) => {

  const slideElements = slides
    .map(
      (slide, index) => /*html*/ `
        <div class="slider-item mx-20 h-[60em] ${index === 0 ? "active" : ""}">
          <img src="${slide.imgSrc}" alt="${slide.altText
        }" class="object-cover w-full h-full" loading='lazy'>
          <div class="banner-content">
            <h2 class="heading">${slide.title}</h2>
            <div class="meta-list">
              <div class="meta-item">${slide.year}</div>
              <div class="meta-item card-badge">${slide.rating}</div>
            </div>
            <p class="genre">${slide.genres.join(", ")}</p>
            <p class="banner-text">${slide.description}</p>
            <a href="${slide.detailsUrl}" class="btn">
              <img 
                src="/play_circle.webp" 
                alt="play circle"
                width='24'
                height='24'
                aria-hidden='true'
              >
              <span class="span">Watch Now</span>
            </a>
          </div>
        </div>`
    )
    .join("");

  const controlElements = slides
    .map(
      (slide, index) => /*html*/ `
        <button class="poster-box slider-item btn-slide ${index === 0 ? "active" : ""
        }" data-slide="${index}">
          <img 
            src="${slide.controlImgSrc}" 
            alt="Slide to ${slide.altText}" 
            loading='lazy'
            draggable='false'
          >
        </button>`
    )
    .join("");

  const ui = useTSElements(
    DOM,
    /*html*/ `
      <div class="banner-slider  lg:h-[60em] max-h-[60em]">
        ${slideElements}
      </div>
      <div class="slider-control left-1/2">
        <div class="control-inner">
          ${controlElements}
        </div>
      </div>
    `
  );

  // Add click event listeners to control buttons
  const controls = DOM.querySelectorAll(
    ".btn-slide"
  ) as NodeListOf<HTMLButtonElement>;
  const items = DOM.querySelectorAll(".slider-item") as NodeListOf<HTMLElement>;

  controls.forEach(control => {
    control.addEventListener("click", () => {
      const index = Number(control.dataset.slide);

      items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });

      controls.forEach((ctrl, i) => {
        ctrl.classList.toggle("active", i === index);
      });
    });
  });

  return ui;
};
