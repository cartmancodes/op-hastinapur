from fastapi import APIRouter
from app.dtos.city import CityInsertRequest
from app.services.city import insert_city,get_city
from beanie import PydanticObjectId
from typing import Optional
from fastapi import Query

cityRouter = APIRouter(prefix="/city")

@cityRouter.post("/")
async def insert_city_route(request: CityInsertRequest):
    res = await insert_city(request=request)
    return res


@cityRouter.get("/")
async def get_city_route(city_id: PydanticObjectId = Query(None,description="City id is Optional Parameter")):
    res = await get_city(city_id=city_id)
    return res
