import { Link } from 'react-router-dom';
import React from 'react';

function Navbar() {
  return (
    <div className="nav-bar-wrapper">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/my-cart" className="my-cart-button" id="my-cart-button">Cart (0)</Link>
    </div>
  );
}

export default React.memo(Navbar);