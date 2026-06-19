from fastapi import FastAPI

from app.database import Base
from app.database import engine

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order import OrderItem

from app.api.products import router as product_router
from app.api.customers import router as customer_router
from app.api.orders import router as order_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from fastapi.exceptions import RequestValidationError

from app.exceptions import (
    validation_exception_handler
)


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management System",
    version="1.0.0"
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(dashboard_router)
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)


@app.get("/")
def root():
    return {
        "message": "Inventory Management API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "inventory-api"
    }