# Implementation Plan: Smart Online Ordering System (Malik Tea Stall)

Start Date: 2026-02-07
Goal: Build a full-stack, production-ready web application for Malik Tea Stall with online ordering, stock management, and sales tracking.

## 1. Project Overview & Architecture

**Goal**: Seamless online ordering with offline pickup, robust stock/sales tracking, instant price updates.

### Architecture
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS (Hosted on Vercel)
- **Backend API**: Node.js + Express (Hosted on Render/Vercel)
- **Database**: MongoDB (Hosted on MongoDB Atlas)
- **Repo Structure**: Monorepo with `client` and `server` folders.

### Design Principles
- **Mobile-First**: Big buttons, readable fonts, simple navigation.
- **Speed**: Optimized for slow networks.
- **Reliability**:Offline-first capabilities where possible (PWA).

## 2. Database Schema (MongoDB Mongoose Models)

### Product `Product`
- `name`: String, required, index: true
- `category`: String ("Health Mix", "Tea Powder", etc.)
- `description`: String (benefits)
- `variants`: Array of Objects
  - `weight`: String ("100g", "250g", "500g", "1kg")
  - `price`: Number
  - `stock`: Number (in grams/kg or units)
- `imageUrl`: String
- `isOutOfStock`: Boolean, default: false
- `createdAt`: Date

### Offer `Offer`
- `title`: String ("Diwali Sale")
- `discountType`: String ("PERCENTAGE", "dFLAT")
- `discountValue`: Number
- `applicableProducts`: Array of ObjectId (ref: Product)
- `startDate`: Date
- `endDate`: Date
- `isActive`: Boolean

### Order `Order`
- `customerPhone`: String (optional, if available)
- `items`: Array of Objects
  - `product`: ObjectId (ref: Product)
  - `variant`: String
  - `quantity`: Number
  - `priceAtPurchase`: Number
- `totalAmount`: Number
- `paymentMethod`: String ("UPI", "CASH")
- `paymentStatus`: String ("PENDING", "PAID", "CASH_PENDING", "COMPLETED")
- `transactionId`: String (for UPI)
- `status`: String ("NEW", "ready_for_pickup", "COMPLETED", "CANCELLED")
- `createdAt`: Date

### OfflineSale `OfflineSale`
- `items`: Array
  - `product`: ObjectId (ref: Product)
  - `variant`: String
  - `quantity`: Number
  - `price`: Number
- `totalAmount`: Number
- `date`: Date (for daily reports)

### Admin `User` (Single user for Phase 1)
- `username`: String (unique)
- `passwordHash`: String
- `role`: String ("ADMIN")

## 3. Backend API Endpoints (Express)

### Auth
- `POST /api/auth/login` -> JWT token

### Products
- `GET /api/products` (Public)
- `POST /api/products` (Admin)
- `PUT /api/products/:id` (Admin - stock/price update)
- `DELETE /api/products/:id` (Admin)

### Orders
- `POST /api/orders` (Public - Place Order)
- `GET /api/orders` (Admin - List Orders, filter by status)
- `PUT /api/orders/:id/status` (Admin - Update payment/status)

### Offers
- `GET /api/offers` (Public - Active offers)
- `POST /api/offers` (Admin)
- `DELETE /api/offers/:id` (Admin)

### Reports & Analytics
- `GET /api/reports/daily` (sales summary)
- `GET /api/reports/stock` (current stock levels)

## 4. Frontend Application Structure (Next.js)

### Public Pages
- `/`: Home (Categories, Top Products, Shop Info)
- `/products`: All Products List (Filter by Category)
- `/product/[id]`: Product Details (Select variant, Add to Cart)
- `/cart`: Shopping Cart (Review items, Total)
- `/checkout`: Checkout (Select Payment: UPI/Cash, Confirm)
- `/order-success`: Confirmation + Order ID

### Admin Dashboard (Protected Route `/admin`)
- `/admin/login`: Login Page
- `/admin/dashboard`: Sales Overview, Quick Actions
- `/admin/orders`: Manage Active Orders (Mark Paid/Completed)
- `/admin/products`: CRUD Products + Stock Adjustment
- `/admin/reports`: Downloadable Reports (PDF/Excel)
- `/admin/offers`: Manage Offers

## 5. Implementation Phases (Phase 1 Focus)

### Phase 1.1: Foundations
- Setup Next.js + Tailwind project.
- Setup Node/Express + Mongoose connection.
- Define Database Models.

### Phase 1.2: Backend Core
- Implement Auth (JWT).
- Implement Product CRUD API.
- Implement Order creation API.

### Phase 1.3: Frontend Core
- Public Home & Product pages.
- Cart & Checkout logic (Context API/Redux).
- Admin Dashboard UI.

### Phase 1.4: Integration & Real-time Updates
- Connect Frontend to Backend.
- Test Order Flow (UPI/Cash).
- Stock deduction logic.

### Phase 1.5: Polish & Deployment
- Mobile responsiveness check.
- Deploy to Vercel (Frontend) & Render (Backend).

## 6. Next Steps
1. Initialize Project Repository
2. Install Dependencies (Next, Express, Mongoose, etc.)
3. Configure MongoDB Connection.
