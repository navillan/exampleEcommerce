import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useUpdateCart } from "../utils/updateMyCart.js";
import $ from "jquery";


function Content({ cart, setCart, productsList, error, loading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterPrice, setFilterPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || null);
  const [randomizedProducts, setRandomizedProducts] = useState([]);
  const [showPrize, setShowPrize] = useState(false);
  const [showCloseDiscount, setShowCloseDiscount] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const addToCart = useUpdateCart();
  // Persist wheel angle across renders
  const wheelAngleRef = useRef(0);

  const products = useMemo(() => productsList?.products ?? [], [productsList]);

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  function renderStars(rating) {
    const productRating = Math.round(rating);
    const finalRating = "★".repeat(productRating) + "☆".repeat(5 - productRating);
    return finalRating;
  }

  function shuffled(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const shuffledItem = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[shuffledItem]] = [arr[shuffledItem], arr[i]];
    }
    return arr;
  }

  function productCardRender(p) {
    return (
      <div key={p.id} className="product-card">
        <p className="product-rating">{p.rating}</p>
        <p className="product-stars">{renderStars(p.rating)}</p>
        <img src={p.thumbnail} alt={p.title} />
        <h2 className="product-name">{p.title}</h2>
        <p className="product-description">{p.description}</p>
        <p className="product-price">${p.price}</p>
        <div className="product-card-expansion">
          <button className="add-to-cart" onClick={() => { const updatedCart = addToCart(p); setCart(updatedCart); }}>Add to Cart</button>
          {(() => {
            const qty = cart?.find(item => item.id === p.id)?.quantity;
            return qty ? <p className="product-cart-quantity">🛒x{qty}</p> : null;
          })()}
        </div>
      </div>
    )
  }

  useEffect(() => {
    setRandomizedProducts(shuffled(products));
  }, [products]);

  // Keep selectedCategory in sync with the URL ?category=...
  useEffect(() => {
    const urlCategory = searchParams.get("category") || null;
    setSelectedCategory(urlCategory);
    if (!urlCategory) {
      setRandomizedProducts(shuffled(products));
    }
  }, [searchParams, products]);

  useEffect(() => {
    const discountPrize = setTimeout(() => {localStorage.getItem("Discount_Amount")? setShowPrize(false) : setShowPrize(true)}, 3000);
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
    wheelAngleRef.current += 720 + step;
    cycle.css("transform", `translate(-50%, -50%) rotate(${wheelAngleRef.current}deg)`);
    
    const A = ((wheelAngleRef.current % 360) + 360) % 360;
    const nth = ((8 - ((A / 45) % 8)) % 8) + 1;
    const slices = cycle.find("> div");
    const discountValue = slices.eq(nth - 1).attr("value");
  
    const discountAmount = discountValue;
      localStorage.setItem("Discount_Amount", discountAmount);
    
    setTimeout(() => {
      $(".spin-header").text(`You won ${discountValue}% discount!`);
      setTimeout(() => setShowPrize(false), 4000);
    }, 2050);
  }

  // Derived products based on category, search and price filter
  const displayedProducts = useMemo(() => {
    const base = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : [...randomizedProducts];

    const q = (searchQuery || "").toLowerCase().replace(/\s+/g, "");
    const bySearch = q
      ? base.filter((p) => (p.title || "").toLowerCase().replace(/\s+/g, "").includes(q))
      : base;

    if (filterPrice === "low") {
      return [...bySearch].sort((a, b) => a.price - b.price);
    }
    if (filterPrice === "high") {
      return [...bySearch].sort((a, b) => b.price - a.price);
    }
    return bySearch;
  }, [selectedCategory, randomizedProducts, products, filterPrice, searchQuery]);



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
          <button className="discount-spin-button" onClick={handleSpinAnimation}>SPIN</button>
        </div>
      </div>
      )}
      <h2>Welcome to Our Store!</h2>
      <p>Discover our wide range of products and enjoy great deals.</p>
      <div className="categories-navbar">
        <button
          key="all"
          className="category-button"
          onClick={() => { setSelectedCategory(null); setRandomizedProducts(shuffled(products)); setSearchParams({}); }}
        >
          ALL
        </button>
        {categories.map(category => (
          <button
            key={category}
            className="category-button"
            onClick={() => { setSelectedCategory(category); setSearchParams({ category }); }}
          >
            {category.toUpperCase()}
          </button>          
        ))}
        <select id="price-filter" className="price-filter-selector" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="">Select Price Filter</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      <div className="search-bar-wrapper">
        <input
        placeholder="What You Are Looking For?"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="products-grid">
        {displayedProducts.map((p) => productCardRender(p))}
      </div>
    </div>
  );
}

export default Content;