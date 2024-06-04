from fastapi import FastAPI,APIRouter, Query
from app.dtos.ward import WardPostResponse,SingleWardInsertRequest,BulkWardInsertRequest,WardGetResponse
from app.services.ward import insert_ward,get_wards,bulk_insert_wards
from beanie import PydanticObjectId

wardRouter = APIRouter(prefix="/ward")

@wardRouter.post("/")
async def insert_ward_route(ward: SingleWardInsertRequest):
    res = await insert_ward(ward=ward)
    return res

@wardRouter.post("/bulk_insert")
async def bulk_insert_wards_route(wards: BulkWardInsertRequest):
    res = await bulk_insert_wards(wards=wards)
    return res

@wardRouter.get("/")
async def get_wards_route(
        ward_number: PydanticObjectId = Query(None,description="Ward Number is Optional"),      
        city_id: PydanticObjectId = Query(None,description="city_id is required Parameter")
    ):
    res = await get_wards(ward_number,city_id=city_id)
    return res