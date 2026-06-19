from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    total_products = db.query(
        func.count(Product.id)
    ).scalar()

    total_customers = db.query(
        func.count(Customer.id)
    ).scalar()

    total_orders = db.query(
        func.count(Order.id)
    ).scalar()

    low_stock = db.query(Product).filter(
        Product.quantity <= 5
    ).all()

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": [
            {
                "id": p.id,
                "name": p.name,
                "quantity": p.quantity
            }
            for p in low_stock
        ]
    }