import DOMPurify from "dompurify";

export const useTSElements = (
  htmlElement: HTMLElement,
  element: string,
  config?: DOMPurify.Config
) => {
  const sanitizedContent = DOMPurify.sanitize(/*html*/ element, config!); // Pass options if provided

  if (htmlElement.innerHTML !== sanitizedContent) {
    return (htmlElement.innerHTML = String(sanitizedContent));
  }
};
