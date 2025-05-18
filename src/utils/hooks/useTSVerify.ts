import DOMPurify from "dompurify";

export const useTSVerify = (
  DOM: HTMLElement | void,
  authUrl: string,
  loginUrl: string
) => {
  const token = localStorage.getItem("token");
  const isLoginPage = window.location.pathname === loginUrl;
  const isAuthPage = window.location.pathname === authUrl;

  if (token) {
    if (isLoginPage) {
      // If authenticated and trying to access the login page, redirect to dashboard
      window.location.href = authUrl;
      return null; // Return null when redirecting
    } else if (!isAuthPage) {
      // If authenticated and not trying to access the dashboard, return sanitized DOM
      return DOM ? DOMPurify.sanitize((DOM as HTMLElement).outerHTML) : "";
    }
  } else {
    if (isAuthPage) {
      // If not authenticated and trying to access the dashboard, redirect to login
      window.location.href = loginUrl;
      return null; // Return null when redirecting
    } else if (!isLoginPage) {
      // If not authenticated and not trying to access the login page, return sanitized DOM
      return DOM ? DOMPurify.sanitize((DOM as HTMLElement).outerHTML) : "";
    }
  }

  return null; // Return null for any other cases
};
