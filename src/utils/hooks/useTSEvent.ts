export const useTSEvent = (
  id: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void
) => {
  const element = document.querySelector(`#${id}`);
  if (element) {
    element.addEventListener(
      eventType,
      handler as EventListenerOrEventListenerObject
    );
  } else {
    console.warn(`Element with id '${id}' not found.`);
  }
};
