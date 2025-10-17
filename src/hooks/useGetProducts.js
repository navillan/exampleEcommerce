import { useEffect, useState } from 'react';

function useGetProducts() {
  const [productsList, setProductsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://dummyjson.com/products');
        const productsData = await res.json();
        setProductsList(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { productsList, loading, error };
}

export default useGetProducts;
