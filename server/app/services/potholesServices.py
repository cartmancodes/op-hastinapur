from fastapi import APIRouter
from app.db.connections import db
from app.model.potholesModel import PotholesImages
from typing import List


async def get_all_potholes():
    data = await db.get_all("potholes")
    output_records = []
    for record in data:
        output_records.append(PotholesImages(**record, id=record["_id"]))
    return output_records

async def write_bulk_potholes(datas:List[PotholesImages]):
    data_as_dict = [data.dict() for data in datas]
    res = await db.bulk_insert(data_as_dict,"potholes")
    return res

async def write_one_pothole(data:PotholesImages):
    data_as_dict = data.dict()
    res = await db.insert(data_as_dict,"potholes")


