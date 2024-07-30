export const AddBg = (
  elementId: string,
  background: string,
  bgsize: string
) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundImage = `url(${background})`;
    element.style.backgroundSize = bgsize;
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundPosition = "center";
  } else {
    console.error(`Element with id ${elementId} not found.`);
  }
};
