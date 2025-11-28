import React, { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import "./ProductList.css";

function ProductList() {
  const { products, setProducts, user, isAdmin } = useApp();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        const savedProducts = JSON.parse(
          localStorage.getItem("shopping_products") || "[]"
        );
        setProducts([...response.data, ...savedProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
        const savedProducts = JSON.parse(
          localStorage.getItem("shopping_products") || "[]"
        );
        setProducts(savedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const categoryMap = {
    men: "men's clothing",
    women: "women's clothing",
    jewelry: "jewelery",
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "custom") return matchesSearch && product.isCustom;

    const targetCategory = categoryMap[filter] || filter;
    return matchesSearch && product.category === targetCategory;
  });

  const categories = [
    { value: "all", label: "All Products", icon: "🛍️" },
    { value: "men", label: "Men's Clothing", icon: "👨" },
    { value: "women", label: "Women's Clothing", icon: "👩" },
    { value: "electronics", label: "Electronics", icon: "📱" },
    { value: "jewelry", label: "Jewelry", icon: "💎" },
    { value: "custom", label: "Custom Products", icon: "✨" },
  ];

  const getProductCount = (categoryValue) => {
    if (categoryValue === "all") return products.length;
    if (categoryValue === "custom")
      return products.filter((p) => p.isCustom).length;
    const targetCategory = categoryMap[categoryValue] || categoryValue;
    return products.filter((p) => p.category === targetCategory).length;
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-list-container">
      {user && isAdmin && <AddProduct />}

      <div className="product-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <label>Filter by category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="quick-filters">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setFilter(category.value)}
            className={`filter-btn ${
              filter === category.value ? "active" : ""
            }`}
          >
            {category.icon} {category.label}
            <span className="category-count">
              ({getProductCount(category.value)})
            </span>
          </button>
        ))}
      </div>

      <h2 className="page-title">
        {categories.find((cat) => cat.value === filter)?.label || "Products"}
        <span className="product-count">({filteredProducts.length} items)</span>
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>
            No products found.{" "}
            {user && isAdmin
              ? "Try adding some!"
              : user
              ? "Only admins can add products."
              : "Please login as admin to add products."}
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
