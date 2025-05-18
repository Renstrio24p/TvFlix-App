export const useTSEventAll = <T extends Event>(
  selector: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: T) => void
) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.addEventListener(eventType, handler as EventListener);
  });

  return () => {
    elements.forEach(element => {
      element.removeEventListener(eventType, handler as EventListener);
    });
  };
};

export const useTSEventSelectAll = <T extends Event>(
  selectors: string[],
  eventType: keyof HTMLElementEventMap,
  handler: (event: T) => void
) => {
  const elements: NodeListOf<HTMLElement>[] = [];

  selectors.forEach(selector => {
    const selectedElements = document.querySelectorAll(
      selector
    ) as NodeListOf<HTMLElement>;
    selectedElements.forEach(element => {
      element.addEventListener(eventType, handler as EventListener);
    });
    elements.push(selectedElements);
  });

  return () => {
    elements.forEach(nodeList => {
      nodeList.forEach(element => {
        element.removeEventListener(eventType, handler as EventListener);
      });
    });
  };
};
