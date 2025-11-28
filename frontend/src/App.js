import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import AccessDenied from "./components/AccessDenied";

function AppContent() {
  const { user, isAdmin } = useApp();

  return (
    <Router basename="/shopping-app">
      <Header />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/add-product"
          element={user && isAdmin ? <AddProduct /> : <AccessDenied />}
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;
