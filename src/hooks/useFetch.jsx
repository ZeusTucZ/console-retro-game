import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const response = await res.json();
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
