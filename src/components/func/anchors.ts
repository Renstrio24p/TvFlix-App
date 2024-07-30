import { useAnchor } from "../../utils/hooks/useTSAnchor";

export const runAnchor = (DOM: HTMLElement, selector: string = "a") => {
  const elements = DOM.querySelectorAll(
    selector
  ) as NodeListOf<HTMLAnchorElement>;

  if (elements.length > 0) {
    useAnchor(elements);
  }
};
