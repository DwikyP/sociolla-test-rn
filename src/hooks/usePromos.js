import { useState, useEffect } from 'react';

const usePromos = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${process.env.EXPO_PUBLIC_SERVER_URL}/api/promos`;

    setLoading(true);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setData(data.data)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default usePromos;