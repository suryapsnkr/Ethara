from pydantic import BaseModel
from pydantic import EmailStr


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str


class CustomerResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str

    model_config = {
        "from_attributes": True
    }

class CustomerUpdate(BaseModel):
    full_name: str
    email: str
    phone: str