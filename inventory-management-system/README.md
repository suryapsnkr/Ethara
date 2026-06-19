# Inventory & Order Management System

A production-ready full-stack Inventory & Order Management System built using **Next.js**, **FastAPI**, **PostgreSQL**, **Docker**, and **Docker Compose**.

## Project Overview

This application allows businesses to:

- Manage Products
- Manage Customers
- Create and Track Orders
- Maintain Inventory Levels
- Monitor Low Stock Products
- View Dashboard Analytics

The entire application is containerized and ready for deployment.

---

# Technology Stack

## Frontend

- Next.js 15 (App Router)
- React
- JavaScript (.jsx)
- Tailwind CSS
- Axios

## Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- Pydantic

## Database

- PostgreSQL

## Containerization

- Docker
- Docker Compose

## Deployment

### Frontend

- Vercel

### Backend

- Render

---

# Features

## Dashboard

- Total Products
- Total Customers
- Total Orders
- Low Stock Products

## Product Management

- Create Product
- View Products
- Update Product
- Delete Product
- Search Products
- Pagination

### Product Fields

- Product Name
- SKU
- Price
- Quantity

## Customer Management

- Create Customer
- View Customers
- Update Customer
- Delete Customer
- Search Customers
- Pagination

### Customer Fields

- Full Name
- Email
- Phone Number

## Order Management

- Create Orders
- Multiple Products Per Order
- Customer Selection
- Inventory Validation
- Auto Total Calculation
- Order Details
- Delete Orders

---

# Business Rules

- SKU must be unique
- Customer email must be unique
- Product quantity cannot be negative
- Orders cannot exceed available inventory
- Inventory automatically reduces after order creation
- Total order amount is calculated by backend
- Proper validation and error handling implemented

---

# Project Structure

## Root Structure

```text
inventory-management-system/
│
├── backend/
│
├── frontend/
│
├── docker-compose.yml
│
└── README.md
```

---

# Backend Structure

```text
backend/
│
├── app/
│   │
│   ├── api/
│   │   ├── products.py
│   │   ├── customers.py
│   │   ├── orders.py
│   │   └── dashboard.py
│   │
│   ├── models/
│   │   ├── product.py
│   │   ├── customer.py
│   │   └── order.py
│   │
│   ├── schemas/
│   │   ├── product.py
│   │   ├── customer.py
│   │   └── order.py
│   │
│   ├── database.py
│   ├── config.py
│   └── main.py
│
├── requirements.txt
├── Dockerfile
└── .env
```

---

# Frontend Structure

```text
frontend/
│
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   │
│   ├── products/
│   │   └── page.jsx
│   │
│   ├── customers/
│   │   └── page.jsx
│   │
│   └── orders/
│       └── page.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── ProductForm.jsx
│   ├── CustomerForm.jsx
│   ├── OrderForm.jsx
│   └── SummaryCard.jsx
│
├── services/
│   └── api.js
│
├── Dockerfile
└── .env.local
```

---

# Environment Variables

## Backend

Create:

```env
backend/.env
```

```env
DATABASE_URL=postgresql://inventory_user:inventory_pass@postgres:5432/inventory_db
```

---

## Frontend

Create:

```env
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# Running Without Docker

## Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

## Frontend

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

# Running With Docker Compose

## Build Containers

```bash
docker compose build
```

---

## Start Containers

```bash
docker compose up -d
```

---

## Stop Containers

```bash
docker compose down
```

---

## View Logs

```bash
docker compose logs -f
```

---

# Docker Services

## PostgreSQL

```text
postgres
```

Port:

```text
5432
```

---

## FastAPI Backend

```text
backend
```

Port:

```text
8000
```

---

## Next.js Frontend

```text
frontend
```

Port:

```text
3000
```

---

# API Endpoints

## Products

### Create Product

```http
POST /products
```

### Get Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/{id}
```

### Update Product

```http
PUT /products/{id}
```

### Delete Product

```http
DELETE /products/{id}
```

---

## Customers

### Create Customer

```http
POST /customers
```

### Get Customers

```http
GET /customers
```

### Get Customer By ID

```http
GET /customers/{id}
```

### Update Customer

```http
PUT /customers/{id}
```

### Delete Customer

```http
DELETE /customers/{id}
```

---

## Orders

### Create Order

```http
POST /orders
```

### Get Orders

```http
GET /orders
```

### Get Order Details

```http
GET /orders/{id}
```

### Delete Order

```http
DELETE /orders/{id}
```

---

## Dashboard

### Summary

```http
GET /dashboard/summary
```

---

# Deployment

## Backend Deployment

Deploy backend on:

- Render
- Railway
- Fly.io

Example:

```text
https://inventory-api.onrender.com
```

---

## Frontend Deployment

Deploy frontend on:

- Vercel
- Netlify

Example:

```text
https://inventory-management.vercel.app
```

---

# Testing

Backend API Documentation:

```text
http://localhost:8000/docs
```

Interactive Swagger UI is available for testing all APIs.

---

# Future Improvements

- JWT Authentication
- Role Based Access Control
- Order Status Workflow
- Email Notifications
- Audit Logs
- Inventory Reports
- Export CSV/Excel
- Unit Testing
- GitHub Actions CI/CD

---

# Author

Surya Prakash Sonkar

Software Engineer Assessment Submission

---

# License

This project is submitted as part of a technical assessment and is intended for evaluation purposes.