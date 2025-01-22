from beanie import Link, PydanticObjectId
from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional,List

from app.model.city import City

class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: RoleEnum
    cities: List[PydanticObjectId]
    fullName: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    id: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    fullName: str
    cities: List[str]
    id: str

