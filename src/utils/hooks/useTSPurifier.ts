import DOMPurify from "dompurify";

export const useTSPurifier = (
  input: string | HTMLElement,
  config?: DOMPurify.Config
) => {
  const defaultConfig: DOMPurify.Config = {
    ADD_TAGS: ["my-custom-tag"],
  };

  const mergedConfig: DOMPurify.Config = { ...defaultConfig, ...config };

  if (typeof input === "string") {
    return DOMPurify.sanitize(input, mergedConfig);
  } else {
    return DOMPurify.sanitize(input.innerHTML, mergedConfig);
  }
};
