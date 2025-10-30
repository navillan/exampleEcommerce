import HomeSlider from "./homeSlider.js";
import { useMemo } from "react";
import { Link } from "react-router-dom";

function Home({ productsList }) {
   const products = useMemo(() => productsList?.products ?? [], [productsList]);
  return (
    <div className="home-wrapper">
      <h1>Welcome to the Example Ecommerce Site</h1>
      <HomeSlider productsList={productsList} />
      <h2>Enjoy the Best Deals on Our Products!</h2>
      <h3>This Month's Featured Products</h3>
      <div className="featured-products">        
        {products.slice(3, 7).map((product) => (
          <Link
            key={product.id}
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="featured-product-card"
          >
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Home;