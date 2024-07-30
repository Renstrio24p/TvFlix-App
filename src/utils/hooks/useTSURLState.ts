import DOMPurify from "dompurify";

export const useTSURLState = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const sanitizedParams: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    sanitizedParams[key] = DOMPurify.sanitize(value);
  }

  return sanitizedParams;
};

// Function to check for ?= in the URL and remove it
export const useTSCheckInvalidParams = () => {
  const url = window.location.href;
  const regex = /(\?.*?)?=/;

  if (regex.test(url)) {
    // Remove the ?= from the URL
    const cleanedUrl = url.replace(regex, "");
    window.history.replaceState(null, "", cleanedUrl);
    // If you want to reload the page, use the following line instead:
    window.location.replace(cleanedUrl);
  }
};
