from fastapi import APIRouter,Depends
from app.dtos.city import CityInsertRequest,CityUpdateRequest
from app.services.city import insert_city,get_city,update_city
from beanie import PydanticObjectId
from typing import Optional
from fastapi import Query,Body
from app.middlewares.role_based_access import admin_access,user_access

cityRouter = APIRouter(prefix="/city")

@cityRouter.post("/",dependencies=[Depends(admin_access)])
async def insert_city_route(request: CityInsertRequest):
    res = await insert_city(request=request)
    return res


@cityRouter.get("/",dependencies=[Depends(user_access)])
async def get_city_route(city_id: PydanticObjectId = Query(None,description="City id is Optional Parameter")):
    res = await get_city(city_id=city_id)
    return res

@cityRouter.patch("/",dependencies=[Depends(user_access)])
async def update_city_router(
    city_id: PydanticObjectId = Query(...,description="City Id Required Parameter"),
    updateValues: CityUpdateRequest =  Body()
):
    res = await update_city(city_id=city_id,updateValues=updateValues)
    return res
