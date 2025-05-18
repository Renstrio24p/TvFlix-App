import { debounce } from "lodash"; // Import lodash debounce

const sanitizeInput = (input: string): string => {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
};

export const useAnchor = debounce((anchors: NodeListOf<HTMLAnchorElement>) => {
  anchors.forEach(anchor => {
    if (!anchor) return;

    // Retrieve and store the original href and class attributes
    const originalHref = anchor.getAttribute("href") || "#";
    const originalClassName = anchor.getAttribute("class") || "";

    // Sanitize the href and class attributes
    const sanitizedHref = sanitizeInput(originalHref);
    const sanitizedClassName = anchor.getAttribute("class")
      ? sanitizeInput(anchor.getAttribute("class")!)
      : originalClassName;

    // Set the href and class attributes
    anchor.setAttribute("href", sanitizedHref);
    anchor.setAttribute("class", sanitizedClassName);

    // Optionally set aria-label if provided
    if (anchor.getAttribute("aria-label")) {
      anchor.setAttribute(
        "aria-label",
        sanitizeInput(anchor.getAttribute("aria-label")!)
      );
    }

    // Optionally set child elements if provided
    const childElement = anchor.querySelector(":scope > *") as HTMLElement;
    if (childElement) {
      anchor.innerHTML = "";
      anchor.appendChild(childElement);
    }

    anchor.addEventListener("click", e => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");

      // If the href is an external link, let the browser handle it
      try {
        const url = new URL(href!, window.location.href);
        if (url.origin !== window.location.origin) {
          return;
        }
      } catch (error) {
        console.error("Invalid URL:", error);
        return;
      }

      e.preventDefault();

      // Use the history API to update the URL without refreshing the page
      window.history.pushState({}, "", href);
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    });
  });
}, 300); // Adjust debounce delay as needed
