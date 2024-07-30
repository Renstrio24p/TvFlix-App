export const useTSElementEach = (
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  events: (keyof HTMLElementEventMap)[],
  callback: (element: HTMLElement, event: Event) => void
) => {
  elements.forEach(element => {
    events.forEach(eventType => {
      element.addEventListener(eventType, event => {
        callback(element, event);
      });
    });
  });
};
