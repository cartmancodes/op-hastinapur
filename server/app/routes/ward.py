from fastapi import FastAPI,APIRouter, Query,Body,Depends
from app.dtos.ward import WardPostResponse,WardUpdateRequest,SingleWardInsertRequest,BulkWardInsertRequest,WardGetResponse
from app.services.ward import insert_ward,get_wards,bulk_insert_wards,update_ward
from beanie import PydanticObjectId
from app.middlewares.role_based_access import user_access,admin_access

wardRouter = APIRouter(prefix="/ward")

@wardRouter.post("/",dependencies=[Depends(admin_access)])
async def insert_ward_route(ward: SingleWardInsertRequest):
    res = await insert_ward(ward=ward)
    return res

@wardRouter.post("/bulk_insert",dependencies=[Depends(user_access)])
async def bulk_insert_wards_route(wards: BulkWardInsertRequest):
    res = await bulk_insert_wards(wards=wards)
    return res

@wardRouter.get("/",dependencies=[Depends(user_access)])
async def get_wards_route(
        ward_number: PydanticObjectId = Query(None,description="Ward Number is Optional"),      
        city_id: PydanticObjectId = Query(None,description="city_id is required Parameter")
    ):
    res = await get_wards(ward_number,city_id=city_id)
    return res

@wardRouter.patch("/",dependencies=[Depends(user_access)])
async def update_ward_route(
    ward_id: PydanticObjectId = Query(None,description="Ward id is Required"),
    ward: WardUpdateRequest = Body()
):
    res = await update_ward(ward_id=ward_id,updateValues=ward)
    return res