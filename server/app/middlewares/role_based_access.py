from fastapi import Request, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt, ExpiredSignatureError
from typing import Optional
from app.model.user import RoleEnum
from app.model.user import User

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"email": email, "role": role}
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_active_user(current_user: dict = Depends(get_current_user)):
    user = await User.find_one(User.email == current_user["email"])
    if user is None or not user.is_active:
        raise HTTPException(status_code=401, detail="Inactive user")
    return user

async def admin_access(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Access forbidden: Admins only")

async def user_access(current_user: dict = Depends(get_current_user)):
    pass
