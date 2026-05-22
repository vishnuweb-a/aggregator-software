# 🚀 Pay → Verify → Ship  
### *An MVP Commerce Engine where orders move only after trust is established.*

> “Every package begins as a promise.  
> This project makes sure that promise starts only after payment is verified.”

---

# 🌍 Project Overview

This project is an **Order + Payment + Shipment workflow system** built for MVP-stage products.

The idea is simple:

A customer places an order → completes payment → system verifies payment → shipment process begins.

No payment ❌ → No shipment ❌

Payment success ✅ → Shipment unlocked ✅

---

# 🎯 Problem Statement

Traditional MVP systems often push orders directly into shipment queues even before payment verification.

This creates:

- Fake orders
- Shipment mistakes
- Inventory issues
- Financial loss
- Manual verification work

This project solves that by introducing a **payment-first shipment pipeline**.

---

# 🧭 User Journey

```text
Customer visits store
          │
          ▼
Creates order
          │
          ▼
Order saved as:
PENDING_PAYMENT
          │
          ▼
Razorpay Checkout Opens
          │
          ▼
Customer Pays
          │
          ▼
Backend Verifies Signature
          │
          ▼
Payment Confirmed?
      ┌───────────┐
      │           │
      ▼           ▼
 YES            NO
 │               │
 ▼               ▼
Mark Paid     Keep Pending
 │
 ▼
Shipment Ready
 │
 ▼
Dispatch Queue
```

---

# 🏗 System Architecture

```text
Frontend (React / Next.js)
            │
            ▼
Create Order API
            │
            ▼
Backend Server
(Node + Express)
            │
            ▼
Database
(Store Orders)
            │
            ▼
Razorpay Payment Gateway
            │
            ▼
Payment Verification
            │
            ▼
Shipment Trigger Service
```

---

# 📦 Order States

The order lifecycle is divided into stages.

| Status | Meaning |
|---------|---------|
| `PENDING_PAYMENT` | Order created |
| `PAYMENT_FAILED` | Payment unsuccessful |
| `PAID` | Verified payment |
| `SHIPMENT_READY` | Ready for logistics |
| `SHIPPED` | Sent |
| `DELIVERED` | Customer received |

---

# 💳 Payment Flow

### Step 1

Customer clicks:

```text
Place Order
```

Backend creates:

```json
{
   "payment_status":"pending",
   "shipment_status":"hold"
}
```

---

### Step 2

Razorpay order generated:

```text
rzp_order_xxxxx
```

Checkout opens.

Customer pays using:

- UPI
- GPay
- PhonePe
- Cards
- Net Banking

---

### Step 3

Backend receives:

```text
razorpay_order_id
razorpay_payment_id
razorpay_signature
```

Signature is verified.

---

### Step 4

If valid:

```json
{
   "payment_status":"paid",
   "shipment_status":"ready"
}
```

Shipment pipeline activates.

---

# 🔒 Security Layer

This project never trusts frontend payment success.

Verification happens only on server side.

Security includes:

✅ Signature verification

✅ Payment validation

✅ Duplicate prevention

✅ Order locking

✅ Shipment protection

---

# 🧰 Tech Stack

### Frontend

- React
- Next.js
- TailwindCSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB / PostgreSQL

### Payments

- Razorpay Test API

### Authentication

- JWT

### Deployment

- Vercel
- Render
- Railway

---

# 📁 Folder Structure

```text
project-root
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   └── styles
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── models
│   ├── config
│   └── utils
│
├── docs
│
├── README.md
│
└── .env
```

---

# ⚙ Environment Variables

Create:

```env
PORT=5000

RAZORPAY_KEY_ID=rzp_test_xxxxx

RAZORPAY_SECRET=xxxxxxxx

DB_URL=your_db_url

JWT_SECRET=your_secret
```

---

# 🚀 Installation

Clone project:

```bash
git clone https://github.com/your-repo/project.git
```

Go inside:

```bash
cd project
```

Install:

```bash
npm install
```

Run server:

```bash
npm run dev
```

---

# 🧪 Test Payment Flow

Create order:

```text
POST /create-order
```

Open Razorpay:

```text
Checkout → Payment
```

Verify:

```text
POST /verify-payment
```

Expected result:

```json
{
   "status":"paid",
   "shipment":"ready"
}
```

---

# 🌟 Future Roadmap

### Phase 1 (Current MVP)

- Payment verification
- Order management
- Shipment trigger

### Phase 2

- Refund engine
- Email notifications
- SMS updates

### Phase 3

- Logistics integration
- Live tracking
- Invoice generation

### Phase 4

- Analytics dashboard
- Revenue reports
- Admin insights

---

# 🧠 Core Philosophy

> Orders should not move because a button was clicked.

They move because **trust was verified.**

Payment first.

Shipment next.

Always.

---

# 👨‍💻 Built For

Startups • MVPs • Commerce Products • Logistics Experiments • Indie Builders

---

# ❤️ Final Note

This project is not just a checkout system.

It is a **trust pipeline**:

```text
Intent
   ↓
Order
   ↓
Payment
   ↓
Verification
   ↓
Shipment
   ↓
Delivery
```

And every delivery begins with a verified payment.

---

## ⭐ If this project helps you, give it a star.