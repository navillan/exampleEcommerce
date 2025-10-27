import { useState, useMemo, useEffect } from "react";
import useGetProducts from "../hooks/useGetProducts.js";
import { useUpdateCart } from "../hooks/useMyCart.js";
import $ from "jquery";


function Content({ setCart, setDiscountValue }) {
  const { productsList, loading, error } = useGetProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomizedProducts, setRandomizedProducts] = useState([]);
  const [showPrize, setShowPrize] = useState(false);
  const [showCloseDiscount, setShowCloseDiscount] = useState(false);
  const addToCart = useUpdateCart();
  let wheelAngle = 0;  

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

  useEffect(() => {
    const discountPrize = setTimeout(() => setShowPrize(true), 3000);
    return () => clearTimeout(discountPrize);
  }, []);

  useEffect(() => {
    if (showPrize) {
      const discountClose = setTimeout(() => setShowCloseDiscount(true), 2000);
      return () => clearTimeout(discountClose);
    } else {
      setShowCloseDiscount(false);
    }
  }, [showPrize]);

  function handleSpinAnimation() {
    const cycle = $(".spin-cycle");
    const step = Math.ceil(Math.random() * 8) * 45;
    wheelAngle += 720 + step;
    cycle.css("transform", `translate(-50%, -50%) rotate(${wheelAngle}deg)`);
    
    const A = ((wheelAngle % 360) + 360) % 360;
    const nth = ((8 - ((A / 45) % 8)) % 8) + 1;
    const slices = cycle.find("> div");
    const discountValue = slices.eq(nth - 1).attr("value");
  
    const discountAmount = discountValue;
    try {
      localStorage.setItem("Discount_Amount", discountAmount);
    } catch {
      console.error("Failed to store discount amount in localStorage");
    }
    
    setTimeout(() => {
      $(".spin-header").text(`You won ${discountValue}% discount!`);
      setTimeout(() => setShowPrize(false), 6000);
    }, 2050);
  }



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
      {showPrize && (
        <div className="discount-wrapper">
          <div className="discount-backdrop" />
          <div className="discount-prize">
          {showCloseDiscount && (
            <button
              className="discount-close"
              onClick={() => setShowPrize(false)}
            >
              X
            </button>
          )}
          <p className="spin-header">Spin for a chance to win a discount!</p>
          <span className="spin-arrow"></span>
          <div className="spin-cycle">
            <div className="blue" value="20">%20</div>
            <div className="red" value="15">%15</div>
            <div className="green" value="10">%10</div>
            <div className="yellow" value="40">%40</div>
            <div className="pink" value="25">%25</div>
            <div className="orange" value="30">%30</div>
            <div className="purple" value="35">%35</div>
            <div className="brown" value="5">%5</div>
          </div>
          <button className="discount-spin" onClick={handleSpinAnimation}>SPIN</button>
        </div>
      </div>
      )}
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