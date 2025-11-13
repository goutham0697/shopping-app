# 🛒 TGR Store - React Shopping App

A modern, feature-rich e-commerce application built with React, featuring admin authentication, external API integration, and a beautiful responsive UI.

## ✨ Features

### 🔐 **Authentication System**
- **Admin Login**: Username `admin`, Password `admin123`
- **User Registration**: Create regular user accounts
- **Protected Routes**: Admin-only product management
- **Session Persistence**: Login state saved in localStorage

### 🛍️ **Product Management**
- **External API Integration**: Fetches products from Fake Store API
- **Gender-Based Filtering**: Separate categories for Men's & Women's clothing
- **Category Filters**: Electronics, Jewelry, Custom products
- **Search Functionality**: Real-time product search
- **Custom Products**: Admins can add custom products

### 🛒 **Shopping Cart**
- **Add to Cart**: Seamless cart management
- **Quantity Control**: Update product quantities
- **Local Storage**: Cart persists across sessions
- **Cart Badge**: Real-time item count in navigation

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach
- **Quick Filter Buttons**: Visual category selection with product counts
- **Gradient Themes**: Beautiful color schemes
- **Smooth Animations**: Hover effects and transitions
- **Professional Styling**: Modern card layouts and typography

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tgr-store.git
   cd tgr-store
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   npm start
   ```
   The JSON server will start on `http://localhost:5000`

5. **Start the Frontend Application**
   ```bash
   cd ../frontend
   npm start
   ```
   The React app will start on `http://localhost:3000`

## 🏗️ Project Structure

```
tgr-store/
├── frontend/                 # React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js    # Navigation header
│   │   │   ├── ProductList.js # Product listing with filters
│   │   │   ├── ProductCard.js # Individual product card
│   │   │   ├── Cart.js      # Shopping cart
│   │   │   ├── Login.js     # Authentication
│   │   │   └── AddProduct.js # Admin product addition
│   │   ├── context/         # React Context
│   │   │   └── AppContext.js # Global state management
│   │   └── index.css        # Global styles
│   └── package.json
├── backend/                 # JSON Server
│   ├── db.json             # Database file
│   └── package.json
└── README.md
```

## 🔧 Technologies Used

### Frontend
- **React 19** - UI library
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern features

### Backend
- **JSON Server** - Mock REST API
- **Fake Store API** - External product data

### Storage
- **Local Storage** - User sessions, cart, and custom products

## 📱 API Endpoints

### Backend (JSON Server - Port 5000)
- `GET /products` - Custom products
- `POST /products` - Add new product
- `GET /cart` - Cart items
- `POST /cart` - Add to cart

### External API
- `GET https://fakestoreapi.com/products` - Fetch external products

## 🎯 Usage

### Regular Users
1. Browse products by category or search
2. Create an account and login
3. Add products to cart
4. Manage cart items and quantities

### Admin Users
1. Login with admin credentials (`admin` / `admin123`)
2. Access "Add Product" feature
3. Create custom products with images and details
4. Manage the product catalog

## 🔑 Admin Features

Only users logged in with admin credentials can:
- See the "Add Product" link in navigation
- Access the `/add-product` route
- Add custom products to the store
- View admin badge in header

## 🌟 Key Components

### AppContext
Global state management for:
- User authentication and admin status
- Shopping cart state
- Product catalog
- Local storage persistence

### ProductList
- Fetches and displays products
- Gender-based filtering system
- Real-time search functionality
- Quick filter buttons with counts

### Cart
- Full shopping cart functionality
- Quantity management
- Order summary
- Checkout simulation

## 🎨 Styling

- **Responsive Grid Layouts**
- **CSS Gradients** for modern look
- **Smooth Animations** on hover and interactions
- **Mobile-First Design** approach
- **Professional Color Schemes**

## 🚦 Development

### Available Scripts

**Frontend:**
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

**Backend:**
- `npm start` - Start JSON server

### Environment Setup
No additional environment variables required. The app works out of the box with default settings.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None currently known

## 🔮 Future Enhancements

- Payment gateway integration
- User profile management
- Product reviews and ratings
- Wishlist functionality
- Order history
- Email notifications
- Advanced filtering options

---

**Built with ❤️ using React and modern web technologies**
