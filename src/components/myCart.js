import { useEffect, useMemo, useState } from 'react';
import $ from 'jquery';

function MyCart() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const count = cart.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0);
    const cartBtn = $('#my-cart-button');
    if (cartBtn.length) cartBtn.text(`Cart (${count})`);
  }, [cart]);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const q = Number(item.quantity) || 1;
      const p = Number(item.price) || 0;
      return sum + q * p;
    }, 0);
  }, [cart]);

	//Burası değişecek!!
  const updateQuantity = (index, value) => {
    const quantity = Math.max(1, Number(value) || 1);
    setCart(prev => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], quantity: quantity };
      return next;
    });
  };

  const removeItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  if (!cart.length) {
    return (
      <div className="content-wrapper">
        <h1>My Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <h1>My Cart</h1>
      <div className="cart-list">
        {cart.map((item, idx) => {
          const quantity = Number(item.quantity) || 1;
          const price = Number(item.price) || 0;
          const line = quantity * price;
          return (
            <div key={item.id ?? idx} className="cart-row">
              <span className="title">{item.title || `#${item.id}`}</span>
              <span className="price">${price.toFixed(2)}</span>
              <input
                className="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => updateQuantity(idx, e.target.value)}
              />
              <span className="line">${line.toFixed(2)}</span>
              <button className="remove" onClick={() => removeItem(idx)}>Remove</button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <strong>Total: ${total.toFixed(2)}</strong>
        <div style={{ marginTop: 8 }}>
          <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          <button className="checkout" onClick={() => alert('Checkout is not implemented in this demo.')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;

