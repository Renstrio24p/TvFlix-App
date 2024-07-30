export const config = {
  ALLOWED_ATTR: [
    "src",
    "width",
    "height",
    "loading",
    "referrerpolicy",
    "class",
    "id",
    "href",
    "overlay",
    "menu-toggler",
    "alt",
    "role",
    "type",
    "name",
  ],
  ALLOW_UNSAFE_SCRIPT: false,
  ALLOW_ARIA_ATTR: true,
  ALLOW_UNKNOWN_PROTOCOLS: false,
  ALLOWED_TAGS: [
    "a",
    "div",
    "span",
    "img",
    "header",
    "nav",
    "article",
    "footer",
    "p",
    "button",
    "input",
    "aside",
    "main",
    "iframe",
  ],
  ALLOWED_URI_REGEXP: /^https?:\/\//,
};