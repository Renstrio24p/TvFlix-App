import { useTSEventAll } from "../../utils/hooks/useTSAllElements.ts";

type EventListener = (event: Event) => void;

export const addEventOnElements = (
  elements: HTMLElement | NodeListOf<HTMLElement> | HTMLElement[],
  eventType: keyof HTMLElementEventMap,
  callback: EventListener
) => {
  // Convert a single HTMLElement to an array for uniform processing
  const elementsArray: HTMLElement[] =
    elements instanceof HTMLElement ? [elements] : Array.from(elements);

  for (const el of elementsArray) {
    el.addEventListener(eventType, callback);
  }
};

export const searchFunction = () => {
  const searchBox = document.querySelector("[search-box]") as HTMLElement;
  useTSEventAll("[search-toggler]", "click", () => {
    searchBox.classList.toggle("active");
  });
};
