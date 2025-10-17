

export function useGetCart() {
  try { return JSON.parse(localStorage.getItem('cart')) || []; }
  catch { return []; }
}

export function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartText() {
  const count = useGetCart().length;
  if (cartBtn.length) cartBtn.text(`Cart (${count})`);
}