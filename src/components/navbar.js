import { Link } from 'react-router-dom';

function Navbar({ activeTab }) {
  const activeStyle = { backgroundColor: "paleturquoise", borderRadius: "5px" };
  return (
    <div className="nav-bar-wrapper">
      <Link to="/" className={"home-link"} style={activeTab === "home-link" ? activeStyle : {}}>Home</Link>
      <Link to="/products" className={"products-link"} style={activeTab === "products-link" ? activeStyle : {}}>Products</Link>
      <Link to="/about-us" className={"about-us-link"} style={activeTab === "about-us-link" ? activeStyle : {}}>About Us</Link>
      <Link to="/contact" className={"contact-link"} style={activeTab === "contact-link" ? activeStyle : {}}>Contact</Link>
      <Link to="/my-cart" className={"my-cart-link"} style={activeTab === "my-cart-link" ? activeStyle : {}}>Cart (0)</Link>
    </div>
  );
}

export default Navbar;