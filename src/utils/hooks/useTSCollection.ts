import { useTSComponent } from "./useTSComponent";

export const useTSCollection = (
  collections: string[],
  DOM: HTMLElement,
  elements: Function[],
  params?: any
) => {
  collections.forEach((collection, index) => {
    const element = elements[index];
    const param = params ? params[index] : undefined;
    useTSComponent(collection, DOM, element, param);
  });
};
