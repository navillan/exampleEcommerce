import Header from "./header.js";
import Navbar from "./navbar.js";
import Home from "./home.js";
import Content from "./content.js";
import MyCart from "./myCart.js";
import AboutUs from "./aboutUs.js";
import Contact from "./contact.js";
import Footer from "./footer.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main-wrapper">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Content />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/my-cart" element={<MyCart />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;