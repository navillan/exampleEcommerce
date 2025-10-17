import Header from "./header.js";
import Navbar from "./navbar.js";
import Content from "./content.js";
import Contact from "./contact.js";
import Footer from "./footer.js";

function App() {
  return (
    <div className="main-wrapper">
      <Header />
      <Navbar />
      <Content />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;