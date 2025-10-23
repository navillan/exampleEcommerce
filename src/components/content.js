import { useState, useMemo, useEffect } from 'react';
import useGetProducts from '../hooks/useGetProducts.js';
import { useUpdateCart } from '../hooks/useMyCart.js';



function Content({ setCart }) {
  const { productsList, loading, error } = useGetProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomizedProducts, setRandomizedProducts] = useState([]);
  const addToCart = useUpdateCart();
  
  const products = useMemo(() => productsList?.products ?? [], [productsList]);

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);
  
  function shuffled(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const shuffledItem = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[shuffledItem]] = [arr[shuffledItem], arr[i]];
  }
  return arr;
  }

  useEffect(() => {
    setRandomizedProducts(shuffled(products));
  }, [products]);

  if (loading) {
    return (
      <div className="content-wrapper">
        <p>Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-wrapper">
        <p role="alert">Failed to load products: {(error.message || error)}</p>
      </div>
    );
  }
  

  return (
    <div className="content-wrapper">
      <h2>Welcome to Our Store!</h2>
      <p>Discover our wide range of products and enjoy great deals.</p>
      <div className="categories-navbar">
        <button
          key="all"
          className="category-button"
          onClick={() => { setSelectedCategory(null); setRandomizedProducts(shuffled(products)); }}
        >
          ALL
        </button>
        {categories.map(category => (
          <button
            key={category}
            className="category-button"
            onClick={() => setSelectedCategory(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
      {selectedCategory ? (
        <div className="products-grid">
          {products
            .filter((p) => p.category === selectedCategory)
            .map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.thumbnail} alt={p.title} />
                <h2 className="product-name">{p.title}</h2>
                <p className="product-description">{p.description}</p>
                <p className="product-price">${p.price}</p>
                <button className="add-to-cart" onClick={() => { const updatedCart = addToCart(p); setCart(updatedCart); }}>Add to Cart</button>
              </div>
            ))}
        </div>
      ) : (
        <div className="products-grid">
          {randomizedProducts.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.thumbnail} alt={p.title} />
              <h2 className="product-name">{p.title}</h2>
              <p className="product-description">{p.description}</p>
              <p className="product-price">${p.price}</p>
              <button className="add-to-cart" onClick={() => { const updatedCart = addToCart(p); setCart(updatedCart); }}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content;