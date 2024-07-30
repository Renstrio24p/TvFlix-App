import DOMPurify from "dompurify";

export const useTSComponent = (
  id: string,
  DOM: HTMLElement,
  element: Function,
  params?: any,
  params2?: any
) => {
  DOMPurify.sanitize(DOM);
  element(DOM.querySelector(`#${id}`), params, params2);
};
