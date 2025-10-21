import { useState } from 'react';
import useGetProducts from '../hooks/useGetProducts.js';
import { useUpdateCart } from '../hooks/useMyCart.js';

function Content() {
  const { productsList, loading, error } = useGetProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const addToCart = useUpdateCart();

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

  const products = productsList?.products || [];

  return (
    <div className="content-wrapper">
      <h2>Welcome to Our Store!</h2>
      <p>Discover our wide range of products and enjoy great deals.</p>
      <div className="categories-navbar">
        <button
          key="__all__"
          className="category-button"
          onClick={() => setSelectedCategory(null)}
        >
          ALL
        </button>
        {[...new Set(products.map(p => p.category))].map(category => (
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
                <button className="add-to-cart" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
        </div>
      ) : (
        <div className="products-grid">
          {[...products].sort(() => 0.5 - Math.random()).map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.thumbnail} alt={p.title} />
              <h2 className="product-name">{p.title}</h2>
              <p className="product-description">{p.description}</p>
              <p className="product-price">${p.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content;