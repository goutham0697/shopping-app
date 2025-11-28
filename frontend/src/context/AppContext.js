import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("shopping_user");
    const savedCart = localStorage.getItem("shopping_cart");
    const savedProducts = localStorage.getItem("shopping_products");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shopping_products", JSON.stringify(products));
  }, [products]);

  // Admin credentials (in real app, this would be in a secure backend)
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const login = (userData, password) => {
    // Check if user is trying to login as admin
    const isAdminLogin =
      userData.username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password;

    const userWithRole = {
      ...userData,
      isAdmin: isAdminLogin,
      loginTime: new Date().toISOString(),
    };

    setUser(userWithRole);
    localStorage.setItem("shopping_user", JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopping_user");
    setCart([]); // Clear cart on logout
    localStorage.removeItem("shopping_cart");
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Simple ID generation
      isCustom: true,
    };
    setProducts([...products, newProduct]);
  };

  const value = {
    user,
    cart,
    products,
    setProducts,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateQuantity,
    addProduct,
    isAdmin: user?.isAdmin || false,
    ADMIN_CREDENTIALS, // Expose for UI hints
    cartTotal: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
