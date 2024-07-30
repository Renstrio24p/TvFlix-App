export const configNavbar = {
  // Specify allowed elements
  ALLOWED_TAGS: ["div", "a", "img", "input", "button"],
  // Specify allowed attributes for the elements
  ALLOWED_ATTR: [
    "src",
    "width",
    "height",
    "loading",
    "referrerpolicy",
    "class",
    "id",
    "placeholder",
    "href",
    "alt",
    "autocomplete",
    "name",
    "aria-label",
    "search-box",
    "search-wrapper",
    "search-toggler",
    "menu-close",
    "menu-btn",
    "menu-toggler",
    "search-field",
  ],
  BLOCKED_ATTR: ["onerror"],
  ALLOW_UNSAFE_SCRIPT: false,
};
