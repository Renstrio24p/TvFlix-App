type FetchFunction<T> = () => Promise<T>;

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

const DEFAULT_DEBOUNCE_TIME = 500;

export function useTSRequest<T>(
  fetchFunction: FetchFunction<T>,
  debounceTime = DEFAULT_DEBOUNCE_TIME
): FetchResult<T> {
  let data: T | null = null;
  let isLoading = false;
  let error: Error | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const fetchData = async () => {
    isLoading = true;
    error = null;

    try {
      const result = await fetchFunction();
      data = result;
    } catch (err) {
      error = Error(err as string);
    } finally {
      isLoading = false;
    }
  };

  const debouncedFetch = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fetchData, debounceTime);
  };

  // Initial fetch
  debouncedFetch();

  return { data, isLoading, error };
}
