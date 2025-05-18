"use strict";

// API key should be managed through environment variables
export const api_key = import.meta.env.VITE_MTDB_API_KEY;
export const imageBaseURL = "https://image.tmdb.org/t/p/";

/**
 * Fetch data from the server using the `url` and pass the result in JSON format
 * to a `callback` function, along with an optional parameter if provided.
 *
 * @param {string} url - The URL to fetch data from
 * @param {Function} callback - The function to call with the fetched data
 * @param {any} [optionalParam] - An optional parameter to pass to the callback
 */
const fetchDataFromServer = async (
  url: string,
  callback: (data: any, optionalParam?: any) => void,
  optionalParam?: any
) => {
  try {
    new URL(url); // Validate URL

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    callback(data, optionalParam);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export { fetchDataFromServer };
