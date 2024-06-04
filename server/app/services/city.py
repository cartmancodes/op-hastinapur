from app.dtos.city import CityInsertRequest
from beanie import PydanticObjectId
from app.model.city import City
from app.dtos.reponse import InsertResponse
from fastapi import HTTPException,status
from typing import Optional

async def insert_city(request: CityInsertRequest):
    try:
        insert_object = request.dict()
        insert_object["wards"] = []
        city = await City.insert(City(**insert_object))
        return InsertResponse(success=True,message="City has Been Inserted Successfully")
    except HTTPException as e:
        raise Exception(status_code=500,message="Internal Server Error Please Try Again Later")


async def get_city(city_id: Optional[PydanticObjectId] = None):
    try:
        if city_id is None:
            cities = await City.find().to_list()
            return cities
        else:
            city = await City.find_one({"_id" : city_id},fetch_links=True)
            if city is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City with this id is Not found")
            return city
    except HTTPException as e:
        print(e.detail)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error Please Try Again Later")