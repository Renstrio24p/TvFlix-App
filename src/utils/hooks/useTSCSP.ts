export const useTSCSP = (
  scriptSrc = `'self' 'nonce-rAnd0m123' 'unsafe-inline' 'unsafe-eval'`,
  styleSrc = "'self' 'nonce-rAnd0m123'", // Use nonce for inline styles
  objectSrc = "'none'",
  fontSrc = "'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  imgSrc = "'self' https://blogger.googleusercontent.com",
  connectSrc = [
    "'self'",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://www.google.com/maps/",
  ],
  frameSrc = "'self' https://www.youtube.com", // Add frame-src for embedding
  baseUri = "'self'",
  reportUri = "/csp-report",
  reportOnly = false
) => {
  const addOrUpdateCSPMeta = () => {
    try {
      let metaElement = document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]'
      );
      if (!metaElement) {
        metaElement = document.createElement("meta");
        metaElement.setAttribute("http-equiv", "Content-Security-Policy");
        document.head.appendChild(metaElement);
      }

      const reportUriDirective = reportOnly ? `report-uri ${reportUri};` : "";
      metaElement.setAttribute(
        "content",
        `default-src 'self'; script-src ${scriptSrc}; style-src ${styleSrc}; object-src ${objectSrc}; font-src ${fontSrc}; img-src ${imgSrc}; connect-src ${connectSrc.join(
          " "
        )}; frame-src ${frameSrc}; base-uri ${baseUri}; ${reportUriDirective}`
      );
    } catch (error) {
      console.error("Error adding CSP meta element:", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addOrUpdateCSPMeta);
  } else {
    addOrUpdateCSPMeta();
  }
};
