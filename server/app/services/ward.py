from fastapi import HTTPException,status
from app.model.city import City
from app.model.ward import Ward
from app.dtos.ward import SingleWardInsertRequest,WardUpdateRequest,BulkWardInsertRequest,WardPostResponse
from app.model.ward import Point
from typing import Optional
from beanie import PydanticObjectId,Link
from app.dtos.reponse import InsertResponse
from app.db.connections import db

async def update_ward(updateValues: WardUpdateRequest,ward_id: PydanticObjectId):
    try:
        # Fetch the existing ward document by its ID
        ward = await Ward.get(ward_id)
        
        if not ward:
            raise HTTPException(status_code=404, detail="Ward not found")
        
        # Convert update values to a dictionary and filter out None values
        update_data = updateValues.dict(exclude_unset=True)

        # Use Beanie's update method to apply the updates
        await ward.set(update_data)

        return ward
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=e.detail)

async def insert_ward(ward: SingleWardInsertRequest):
    session = None
    try:
        session = await db.connection.start_session()
        async with session.start_transaction():
            city_name = ward.city_id
            city = await City.find_one({"_id": city_name})
            if city is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="City With this Id is Not Available")
            
            insert_object = ward.dict()
            insert_object["workflows"] = []
            new_ward = await Ward(**insert_object).insert()
            city.wards.append(new_ward)
            new_city = await city.save()
            return InsertResponse(success=True,message="Successfully inserted Ward",id=new_ward.id)
    except HTTPException as e:
        raise HTTPException(status_code=500,detail="Internal Server Error")

async def bulk_insert_wards(wards: BulkWardInsertRequest):
    session = None
    try:
        session = await db.connection.start_session()
        async with session.start_transaction():
            city_id = wards.city_id
            city = await City.find_one({"_id": city_id})
            if city is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="City with this id not found")
            
            data_to_inserted = []
            for ward_data in wards.wards:
                ward_dict = ward_data.dict()
                ward_dict["workflows"] = []
                ward_dict["city_id"] = wards.city_id
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
