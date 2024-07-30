import DOMPurify from "dompurify";

type InputElementType = "input" | "select" | "textarea" | "form";

export const useTSInput = (
  id: string,
  elementType: InputElementType,
  form?: HTMLFormElement
): string => {
  if (elementType === "form") {
    console.warn(
      "For 'form' element type, the ID parameter should be the form ID, not the input ID."
    );
    return "";
  }

  const getElement = () => {
    if (form) {
      return form.querySelector(`#${id}`);
    } else {
      return document.getElementById(id);
    }
  };

  const element = getElement();

  if (!element) {
    console.warn(`No element found with ID '${id}'.`);
    return "";
  }

  if (
    elementType === "input" ||
    elementType === "select" ||
    elementType === "textarea"
  ) {
    if (element.tagName.toLowerCase() !== elementType) {
      console.warn(`Element with ID '${id}' is not of type '${elementType}'.`);
      return "";
    }
    const inputElement = element as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    // Sanitize input value here using DOMPurify
    const sanitizedValue = DOMPurify.sanitize(inputElement.value);
    return sanitizedValue;
  } else if (elementType === "form") {
    if (!(element instanceof HTMLFormElement)) {
      console.warn(`Element with ID '${id}' is not a form element.`);
      return "";
    }
    const formData = new FormData(element);
    // Sanitize form data value here using DOMPurify
    const sanitizedValue = DOMPurify.sanitize(formData.get(id) as string);
    return sanitizedValue || "";
  } else {
    console.warn(`Invalid elementType '${elementType}'.`);
    return "";
  }
};
