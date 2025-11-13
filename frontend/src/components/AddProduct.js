import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./AddProduct.css";

function AddProduct() {
  const { addProduct } = useApp();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    const product = {
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category || "custom",
      image:
        formData.image ||
        "https://via.placeholder.com/300x300?text=Custom+Product",
    };

    addProduct(product);
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setShowForm(false);
    alert("Product added successfully!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-product-container">
      <button
        className="btn-add-product"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "✕ Cancel" : "+ Add New Product"}
      </button>

      {showForm && (
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name *:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price * (₹):</label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="toys">Toys</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL (optional)"
              />
            </div>

            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
