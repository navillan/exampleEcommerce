import * as ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider({ productsList }) {
  // Normalize input: dummyjson returns an object { products: [...] }
  const items = Array.isArray(productsList)
    ? productsList
    : productsList?.products ?? [];

  const raw = ReactSlick;
  const isComponent = (v) =>
    typeof v === "function" || (v && typeof v === "object" && v.$$typeof);
  const candidates = [
    raw,
    raw?.default,
    raw?.default?.default,
    raw?.Slider,
    raw?.Slider?.default,
  ];
  const Slider = candidates.find(isComponent) || null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
  };
  
  return (
    <Slider {...settings}>
      {items.length > 0 ? (
        items.map((product) => (
          <div key={product.id} className="home-slide-item">
            <img src={product.thumbnail || product.images?.[0]} alt={product.title || product.name} />
            <h4 className="product-name">{product.title || product.name}</h4>
            {product.description && <p className="home-slide-item-description">{product.description}</p>}
          </div>
        ))
      ) : (
        <div className="home-slide-item">
          <h2>No Products Available</h2>
        </div>
      )}
    </Slider>
  );
}

export default HomeSlider;