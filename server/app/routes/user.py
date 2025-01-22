from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from app.dtos.user import UserCreate, Token
from app.services.user import authenticate_user, create_access_token, get_password_hash
from app.model.user import User, RoleEnum
from app.dtos.user import UserLogin
from app.dtos.user import LoginResponse
from bson import ObjectId
from app.model.city import City  # Import ObjectId from PyMongo BSON
from beanie.operators import In

auth_router = APIRouter()

@auth_router.post("/api/v1/register", response_model=Token)
async def register(user_create: UserCreate):
    user = await User.find_one({"email" : user_create.email})
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user_create.password)
    print(user_create.cities)
    cities_cursor = City.find(In(City.id, user_create.cities))
    cities = [city async for city in cities_cursor]
    new_user = User(email=user_create.email, hashed_password=hashed_password, role=user_create.role,cities=cities,fullName=user_create.fullName)
    await new_user.insert()
    access_token = create_access_token(data={"sub": new_user.email, "role": new_user.role.value})
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response


@auth_router.post("/api/v1/login",response_model=LoginResponse)
async def login(user: UserLogin):
    authenticated_user = await authenticate_user(email=user.email, password=user.password)
    if not authenticated_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email, "role": authenticated_user.role.value})
    # Convert PydanticObjectId to str for JSON serialization
    id_str = str(authenticated_user.id)
    # Construct the response
    cities = [City(**city.dict()) if not isinstance(city, City) else city for city in authenticated_user.cities]
    city_ids = [str(city.id) for city in cities]
    response_to_return = LoginResponse(access_token=access_token, token_type='bearer',fullName=authenticated_user.fullName,id=id_str,cities=city_ids)
    # Create JSON response with the LoginResponse content
    response = JSONResponse(content=response_to_return.dict())
    # Set the access token as a cookie
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return response
