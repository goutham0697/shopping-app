import React from "react";
import { useApp } from "../context/AppContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, user } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleCheckout = () => {
    alert(`Thank you for your purchase! Total: ${formatPrice(cartTotal)}`);
    // Here you would typically integrate with a payment gateway
  };

  if (!user) {
    return (
      <div className="cart-container">
        <div className="cart-message">
          <h2>🛍️ Your Cart</h2>
          <p>Please login to view your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛍️ Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Start shopping to add items to your cart!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x100?text=Product";
                    }}
                  />
                </div>

                <div className="item-details">
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price">{formatPrice(item.price)}</div>
                </div>

                <div className="item-controls">
                  <div className="quantity-control">
                    <label>Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="quantity-select"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>

                <div className="item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>
                  Items (
                  {cart.reduce((total, item) => total + item.quantity, 0)}):
                </span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">FREE</span>
              </div>

              <hr className="summary-divider" />

              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="checkout-btn"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
