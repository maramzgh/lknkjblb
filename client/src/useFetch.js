import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();
    fetch(url, { signal: abortControl.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((data) => {
        setdata(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortControl.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

