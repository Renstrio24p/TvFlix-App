export const toggleMenu = (DOM: HTMLElement) => {
  const menuButton = DOM.querySelector("#menu-toggler") as HTMLButtonElement;
  if (!menuButton) {
    console.error("Menu button not found");
    return;
  }

  const menuIcon = menuButton.querySelector(".menu") as HTMLImageElement;
  const closeIcon = menuButton.querySelector(".close") as HTMLImageElement;

  return menuButton.addEventListener("click", () => {
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
};
