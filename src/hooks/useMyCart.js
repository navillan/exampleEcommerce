import $ from 'jquery';

function getCart() {
  try {
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : [];
  } catch {
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartText() {
  const count = getCart().length;
  const cartBtn = $("#my-cart-button");
  if (cartBtn.length) cartBtn.text(`Cart (${count})`);
}

export function useUpdateCart() {
  return function addToCart(product, quantity = 1) {
    if (!product) return;
    const id = product.id;
    const title = product.title;
    const price = product.price ?? 0;

    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity = (existing.quantity ?? 0) + quantity;
    } else {
      cart.push({ id, title, price, quantity });
    }
    setCart(cart);
    updateCartText();
    return cart;
  };
}