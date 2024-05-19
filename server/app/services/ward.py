from fastapi import HTTPException,status
from app.model.city import City
from app.model.ward import Ward
from app.dtos.ward import SingleWardInsertRequest,BulkWardInsertRequest,WardPostResponse
from app.model.ward import Point
from typing import Optional
from beanie import PydanticObjectId,Link

async def insert_ward(ward: SingleWardInsertRequest):
    try:
        city_name = ward.city_id
        city = await City.find_one({"_id": city_name})
        if city is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City With this Id is Not Available")

        insert_object = ward.dict(exclude={"city_id"})
        insert_object["workflows"] = []
        new_ward = await Ward(**insert_object).insert()
        city.wards.append(new_ward)
        new_city = await city.save()
        return WardPostResponse(success=True,message="Successfully inserted Ward")
    except HTTPException as e:
        raise HTTPException(status_code=500,detail="Internal Server Error")


async def bulk_insert_wards(wards: BulkWardInsertRequest):
    try:
        city_id = wards.city_id
        city = await City.find_one({"_id": city_id})
        if city is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City with this id not found")
        
        data_to_inserted = []
        for ward_data in wards.wards:
            ward_dict = ward_data.dict()
            ward_dict["workflows"] = []
            ward = Ward(**ward_dict)
            data_to_inserted.append(ward)
        
        inserted_wards = await Ward.insert_many(data_to_inserted)
        inserted_ids = inserted_wards.inserted_ids
        inserted_ward_docs = await Ward.find({"_id": {"$in": inserted_ids}}).to_list()
        city.wards.extend(inserted_ward_docs)
        await city.save()
        return WardPostResponse(success=True, message="Wards Inserted")
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code,detail=e.detail)


async def get_wards(ward_number: Optional[int],city_id: Optional[PydanticObjectId]):
    try:
        if ward_number is not None:
            ward = await Ward.find_one({"_id": ward_number})
            if ward is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found")
            return ward
        elif city_id is not None:
            city = await City.find_one({"_id" : city_id},fetch_links=True)
            if city is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City with this Id is Not found")
            return city.wards
        else:
            wards = await Ward.find().to_list()
            return wards
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Server Error")
