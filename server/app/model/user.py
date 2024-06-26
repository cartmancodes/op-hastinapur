from beanie import Document
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"

class User(Document):
    email: EmailStr
    hashed_password: str
    role: RoleEnum
    created_at: datetime = datetime.utcnow()
    is_active: bool = True

    class Settings:
        collection = "users"
