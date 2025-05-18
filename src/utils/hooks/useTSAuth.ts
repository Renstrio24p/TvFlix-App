import { jwtDecode } from "jwt-decode";

export const useTSAuth = (_Component: HTMLElement | void, loginUrl: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if token is missing
    window.location.href = loginUrl;
    return null; // Return null when redirecting
  }

  try {
    const decodedToken: any = jwtDecode(token);

    // Example: Check if the token has expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.error("Token has expired");
      window.localStorage.removeItem("token");
      window.location.href = loginUrl;
      return null; // Return null when redirecting
    }

    // If the user is authenticated, return the component
    return null;
  } catch (error) {
    console.error("Invalid token:", error);
    // Redirect to login page if token decoding fails
    window.location.href = loginUrl;
    return null; // Return null when redirecting
  }
};
