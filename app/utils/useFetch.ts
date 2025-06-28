import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(autoFetch);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, loading, error, fetchData, reset };
};

export default useFetch;
