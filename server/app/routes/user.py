from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from app.dtos.user import UserCreate, Token
from app.services.user import authenticate_user, create_access_token, get_password_hash
from app.model.user import User, RoleEnum

auth_router = APIRouter()

@auth_router.post("/register", response_model=Token)
async def register(user_create: UserCreate):
    user = await User.find_one({"email" : user_create.email})
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user_create.password)
    new_user = User(email=user_create.email, hashed_password=hashed_password, role=user_create.role)
    await new_user.insert()
    access_token = create_access_token(data={"sub": new_user.email, "role": new_user.role.value})
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response

@auth_router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response
