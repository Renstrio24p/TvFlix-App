const sanitizeInput = (input: string): string => {
  const element = document.createElement("div");
  element.innerText = input;
  return element.innerHTML;
};

export const useAnchor = (
  element: HTMLAnchorElement,
  ariaLabel?: string,
  className?: string,
  childElement?: HTMLElement
) => {
  if (!element) return;

  // Retrieve and store the original href and class attributes
  const originalHref = element.getAttribute("href") || "#";
  const originalClassName = element.getAttribute("class") || "";

  // Sanitize the href and class attributes
  const sanitizedHref = sanitizeInput(originalHref);
  const sanitizedClassName = className
    ? sanitizeInput(className)
    : originalClassName;

  // Set the href and class attributes
  element.setAttribute("href", sanitizedHref);
  element.setAttribute("class", sanitizedClassName);

  if (ariaLabel) {
    element.setAttribute("aria-label", sanitizeInput(ariaLabel));
  }

  if (childElement) {
    element.innerHTML = "";
    element.appendChild(childElement);
  }

  element.addEventListener("click", e => {
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
};
