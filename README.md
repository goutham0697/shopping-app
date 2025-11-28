# Shopping App

React shopping app with basic e-commerce functionality.

## Features

- Product catalog with filtering
- Admin login (admin/admin123)
- Shopping cart
- External API integration (Fake Store API)
- User authentication

## Setup

```bash
# Clone and install
git clone https://github.com/goutham0697/tgr-store-.git
cd tgr-store-

# Backend
cd backend
npm install
npm start  # runs on port 5000

# Frontend (new terminal)
cd frontend
npm install
npm start  # runs on port 3000
```

## Tech Stack

- React 19
- React Router
- JSON Server
- Axios
- Local Storage

## Admin Access

Login with: `admin` / `admin123`

Admin users can add custom products to the store.

## Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- Products fetched from fakestoreapi.com
- Cart and user data stored locally
