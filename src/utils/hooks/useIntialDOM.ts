import DOMPurify from "dompurify";

let previousHTML: string | null = null;

export const useInitialDOM = (id: string, element: Function) => {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    const currentHTML = targetElement.innerHTML;
    const sanitizedHTML = DOMPurify.sanitize(currentHTML);

    if (previousHTML !== null && sanitizedHTML !== previousHTML) {
      element(document.createElement("div"));
      targetElement.innerHTML = previousHTML;
    } else {
      previousHTML = sanitizedHTML;
      element(targetElement);
    }
  }
};
