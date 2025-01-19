from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.model.user import User
from app.dtos.user import UserCreate, UserLogin, Token
from fastapi import HTTPException, status

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def authenticate_user(email: str, password: str):
    print(email + " " + password)
    user = await User.find(User.email == email,fetch_links=True,nesting_depth=1).to_list()
    if not user[0] or not verify_password(password, user[0].hashed_password):
        return False
    return user[0]

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
