import { useTSEventAll } from "../../utils/hooks/useTSAllElements.ts";

export const toggleSidebar = function (sidebar: HTMLElement) {
  /**
   * Toggle sidebar in mobile screen
   */

  const sidebarBtn = document.querySelector("[menu-btn]") as HTMLButtonElement;
  const overlay = document.querySelector("[overlay]") as HTMLElement;

  useTSEventAll("[menu-toggler]", "click", () => {
    sidebar.classList.toggle("active");
    sidebarBtn.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  useTSEventAll("[menu-close]", "click", () => {
    sidebar.classList.remove("active");
    sidebarBtn.classList.remove("active");
    overlay.classList.remove("active");
  });
};
