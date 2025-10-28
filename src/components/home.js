import HomeSlider from "./homeSlider.js";

function Home({ productsList }) {
  return (
    <div className="home-wrapper">
      <h1>Welcome to the Example Ecommerce Site</h1>
      <HomeSlider productsList={productsList} />
      <h2>Enjoy the Best Deals on Our Products!</h2>
    </div>
  );
}
export default Home;