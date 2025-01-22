from app.dtos.city import CityInsertRequest,CityUpdateRequest
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
        return InsertResponse(success=True,message="City has Been Inserted Successfully",id=city.id)
    except HTTPException as e:
        raise Exception(status_code=500,message="Internal Server Error Please Try Again Later")

async def update_city(updateValues: CityUpdateRequest,city_id: PydanticObjectId):
    try:
        city = await City.find_one({"_id" : city_id})
        if city is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City with this city is Not Found")
        cityUpdatedValues = updateValues.dict(exclude_unset=True)
        updated_city = await city.set(cityUpdatedValues)
        return updated_city
    except HTTPException as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="There Might be Some Internal Problem")

async def get_city(city_id: Optional[PydanticObjectId] = None,drill_level: Optional[int] = 1):
    try:
        if city_id is None:
            cities = await City.find().to_list()
            return cities
        else:
            city = await City.find_one({"_id" : city_id},fetch_links=True,nesting_depth=drill_level)
            if city is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City with this id is Not found")
            return city
    except HTTPException as e:
        print(e.detail)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error Please Try Again Later")

async def get_cities_with_field_value(field_name: str,field_value):
    try:
        cities = await City.find({field_name : field_value},fetch_links=False).to_list()
        return cities
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error")
