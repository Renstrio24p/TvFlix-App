interface BackgroundOptions {
  image?: string;
  color?: string;
  repeat?: string;
  position?: string;
  size?: string;
}

type Text = {
  textSize?: string;
  textColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  lineHeight?: string;
  fontFamily?: string;
  fontStyle?: "normal" | "oblique" | "italic";
};

export const useTSAddBg = (
  elementSelect: string,
  background: BackgroundOptions,
  textOptions?: Text
) => {
  const element = document.querySelector(elementSelect) as HTMLElement;
  if (element) {
    if (background.image) {
      element.style.backgroundImage = `url(${background.image})`;
      element.style.backgroundSize = String(background.size);
      element.style.backgroundRepeat = background.repeat || "no-repeat";
      element.style.backgroundPosition = background.position || "center";
    } else if (background.color) {
      element.style.backgroundColor = background.color;
    }
    element.style.color = String(textOptions?.textColor);
    element.style.fontSize = String(textOptions?.textSize);
    element.style.lineHeight = String(textOptions?.lineHeight);
    element.style.fontFamily = String(textOptions?.fontFamily);
    element.style.fontStyle = String(textOptions?.fontStyle);
  } else {
    console.error(`Element with queried ${elementSelect} not found.`);
  }
};
