# Malik Tea Stall

Online ordering system for Malik Tea Stall - Health Mix & Tea Powders shop in Kalikiri.

## Features

### Customer
- Browse products with variants
- Add to cart & checkout
- UPI QR code payment
- WhatsApp order confirmation

### Admin
- Dashboard with sales stats
- Product management
- Order management with print invoice
- Sales reports
- Offers management
- Offline sale entry

## Tech Stack

- **Frontend:** Next.js 15, React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Google Sheets (via SheetDB)

## Setup

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment Variables

### Server (.env)
```
PORT=5000
SHEETDB_API=your_sheetdb_api_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Deployment

- Frontend: Vercel
- Backend: Render.com

## Admin Login

- Username: admin
- Password: admin
