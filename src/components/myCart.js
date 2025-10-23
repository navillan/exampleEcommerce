import { useMemo } from 'react';

function MyCart({ cart, setCart }) {

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

  const clearCart = () => {
    setCart([]);
  };

  if (!cart.length) {
    return (
      <div className="my-cart-wrapper">
        <h1>My Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="my-cart-wrapper">
      <h1>My Cart</h1>
      <div className="cart-list">
        {cart.map((item, idx) => {
          const quantity = Number(item.quantity) || 1;
          const price = Number(item.price) || 0;
          const line = quantity * price;
          return (
            <div key={item.id ?? idx} className="cart-row">
              <span className="title" title={item.title || `#${item.id}`}>
                {item.title || `#${item.id}`}
              </span>
              <span className="price">${price.toFixed(2)}</span>
              <input
                className="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => updateQuantity(idx, e.target.value)}
              />
              <span className="total-price">{item.price} x {quantity} = ${line.toFixed(2)}</span>
              <button className="remove" onClick={() => removeItem(idx)}>Remove</button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <h3 className="total-summary">Total Price: ${total.toFixed(2)}</h3>
        <div className="cart-actions" style={{ marginTop: 8 }}>
          <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          <button className="checkout" onClick={() => alert('Checkout is not implemented in this demo.')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default MyCart;

