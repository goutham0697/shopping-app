import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Header.css";

function Header() {
  const { user, logout, cartCount, isAdmin } = useApp();

  return (
    <nav className="header">
      <h2>🛒 TGR Store</h2>
      <div className="links">
        {user ? (
          <>
            <span className="user-info">
              Welcome, {user.username}!
              {isAdmin && <span className="admin-badge">👑 Admin</span>}
            </span>
            <Link to="/">Products</Link>
            {isAdmin && <Link to="/add-product">Add Product</Link>}
            <Link to="/cart" className="cart-link">
              Cart{" "}
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
