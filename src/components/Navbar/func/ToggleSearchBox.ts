export const toggleSearchBox = (DOM: HTMLElement) => {
  const searchTogglers = DOM.querySelectorAll(
    "#search-toggler"
  ) as NodeListOf<HTMLButtonElement>;
  const searchBox = DOM.querySelector("#search-box") as HTMLDivElement;

  if (!searchBox) {
    console.error("Search box not found");
    return;
  }

  return searchTogglers.forEach(toggler => {
    toggler.addEventListener("click", () => {
      searchBox.classList.toggle("hidden");
    });
  });
};
