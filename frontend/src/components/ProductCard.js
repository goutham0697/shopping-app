import React from "react";
import { useApp } from "../context/AppContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, user } = useApp();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=Product+Image";
          }}
        />
        {product.isCustom && <span className="custom-badge">Custom</span>}
      </div>

      <div className="product-info">
        <h3 className="product-title">{truncateText(product.title, 60)}</h3>

        <p className="product-description">
          {truncateText(product.description, 100)}
        </p>

        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            {product.rating && (
              <>
                <span className="stars">
                  {"★".repeat(Math.floor(product.rating.rate))}
                  {"☆".repeat(5 - Math.floor(product.rating.rate))}
                </span>
                <span className="rating-count">({product.rating.count})</span>
              </>
            )}
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">{formatPrice(product.price)}</div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={!user}
          >
            {user ? "🛒 Add to Cart" : "Login to Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
