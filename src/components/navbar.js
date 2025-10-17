

function Navbar() {
  return (
    <div className="nav-bar-wrapper">
      <a href="/index.html">Home</a>
      <a href="/paths/products.html">Products</a>
      <a href="/paths/aboutUs.html">About Us</a>
      <a href="/paths/contact.html">Contact</a>
      <a href="/paths/myCart.html" className="my-cart-button" id="my-cart-button">Cart (0)</a>
    </div>
  );
}

export default Navbar;