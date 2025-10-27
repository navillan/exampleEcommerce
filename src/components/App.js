import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import $ from "jquery";
import Header from "./header.js";
import Navbar from "./navbar.js";
import Home from "./home.js";
import Content from "./content.js";
import MyCart from "./myCart.js";
import AboutUs from "./aboutUs.js";
import Contact from "./contact.js";
import Footer from "./footer.js";
import useGetProducts from "../hooks/useGetProducts.js";

function App() {  
  const [productsList, setProductsList] = useState(null);
  const { loading, error } = useGetProducts({ setProductsList });
  const [discountValue, setDiscountValue] = useState(0);
  const [cart, setCart] = useState(() => {
      try { return JSON.parse(localStorage.getItem('cart')) || []; }
      catch { return []; }
  });

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
      const count = cart.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
      const cartBtn = $('#my-cart-button');
      if (cartBtn.length) cartBtn.text(`Cart (${count})`);
  }, [cart]);  

  return (
    <div className="main-wrapper">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home productsList={productsList} />} />
        <Route path="/products" element={<Content productsList={productsList} setProductsList={setProductsList} error={error} loading={loading} setCart={setCart} setDiscountValue={setDiscountValue} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/my-cart" element={<MyCart cart={cart} setCart={setCart} discountValue={discountValue} />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;