import { useAnchorSingle } from "../../utils/hooks/useTSAnchorSingle";
import { useTSElements } from "../../utils/hooks/useTSElements";
import { search } from "../func/Search";
import { configNavbar } from "./settings/Navbar.config";

export default function Navbar(DOM: HTMLElement) {
  const ui = useTSElements(
    DOM,
    /*html*/ `
        <div class='navbar'>
            <a href="/" class="logo" id='logo'>
                <img src="/logo.webp" width="140" height="32" alt="Tvflix home">
            </a>
            <div class="search-box" search-box>
                <div class="search-wrapper" search-wrapper>
                    <input 
                        type="text" 
                        name="search" 
                        aria-label="search movies" 
                        placeholder="Search any movies..."
                        class="search-field" autocomplete="off" search-field
                    >
                    <img 
                        src="/search.webp" 
                        width="24" 
                        height="24" 
                        alt="search" 
                        class="leading-icon"
                    >
                </div>

                <button class="search-btn" search-toggler>
                    <img src="/close.webp" width="24" height="24" alt="close search box">
                </button>
            </div>

            <button class="search-btn" search-toggler menu-close>
                <img src="/search.webp" width="24" height="24" alt="open search box">
            </button>

            <button class="menu-btn" menu-btn menu-toggler>
                <img src="/menu.webp" width="24" height="24" alt="open menu" class="menu">
                <img src="/menu-close.webp" width="24" height="24" alt="close menu" class="close">
            </button>
        </div>
    `,
    configNavbar
  );
  // Initialize search functionality
  search(DOM);

  // Handle search box toggle
  const searchBox = DOM.querySelector("input") as HTMLElement;
  const searchToggler = DOM.querySelectorAll(
    "[search-toggler]"
  ) as NodeListOf<HTMLButtonElement>;

  const nav = DOM.querySelector("a") as HTMLAnchorElement;
  useAnchorSingle(nav, nav.href, "logo link");

  searchToggler.forEach(button => {
    button.addEventListener("click", () => {
      searchBox.classList.toggle("active");
    });
  });

  return ui;
}
