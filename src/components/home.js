import HomeSlider from "./homeSlider.js";

function Home({ productsList }) {
  return (
    <div className="home-wrapper">
      <h1>Welcome to the Home Page</h1>
      <HomeSlider productsList={productsList} />
      <h2>This is the main landing page of the e-commerce site.</h2>
    </div>
  );
}
export default Home;