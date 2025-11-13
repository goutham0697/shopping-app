import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./Login.css";

function Login() {
  const { login, ADMIN_CREDENTIALS } = useApp();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    if (!isLogin && !formData.email) {
      alert("Please enter your email for registration");
      return;
    }

    // Simple validation for demo purposes
    const userData = {
      username: formData.username,
      email: formData.email || `${formData.username}@example.com`,
    };

    // Pass password to login function for admin check
    login(userData, formData.password);

    // Check if admin login
    const isAdminLogin =
      formData.username === ADMIN_CREDENTIALS.username &&
      formData.password === ADMIN_CREDENTIALS.password;

    const loginType = isAdminLogin
      ? "Admin login"
      : isLogin
      ? "Login"
      : "Registration";
    alert(`${loginType} successful!${isAdminLogin ? " Welcome Admin!" : ""}`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
