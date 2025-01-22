from beanie import Document,PydanticObjectId
from pydantic import BaseModel, EmailStr
from typing import Optional,List
from datetime import datetime
from enum import Enum
from beanie import Link
from typing import List
from app.model.city import City

class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"

class User(Document):
    email: EmailStr
    fullName: str
    hashed_password: str
    role: RoleEnum
    created_at: datetime = datetime.utcnow()
    is_active: bool = True
    cities: Optional[List[Link[City]]] = None
    
    class Settings:
        collection = "users"

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types
