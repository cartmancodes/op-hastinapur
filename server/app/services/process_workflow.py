from pydantic import BaseModel
from shapely.geometry import Point, Polygon
from beanie import PydanticObjectId
from app.model.ward import Ward
from fastapi import HTTPException,status
from app.model.ward import Point as pt
from typing import List
from app.dtos.workflow import BulkWorkFlowInsertRequest

class PartialModel(BaseModel):
    _id: PydanticObjectId
    polygon_points: List[pt]

def point_in_polygon(point_coords,polygon_coords):
    polygon = Polygon(polygon_coords)
    point = Point(point_coords)
    is_inside = polygon.contains(point)
    return is_inside

def findWardId(point_coord,polygons):
    for polygon in polygons:
        if(point_in_polygon(point_coords=point_coord,polygon_coords=polygon["polygon_points"])):
            return polygon["id"]

async def getWardWithCityId(city_id:PydanticObjectId):
    print(city_id)
    wards = await Ward.find(Ward.city_id == city_id).to_list()
    print(wards)
    if wards is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    ward_processed = []
    for ward in wards:
        poly_points = ward.polygon_points
        poly_points_in_list_of_tuple = []

        for poly_point in poly_points:
            poly_point_tuple = (poly_point.longitude,poly_point.latitude)
            poly_points_in_list_of_tuple.append(poly_point_tuple)

        processed_ward = {
            "id" : ward.id,
            "polygon_points" : poly_points_in_list_of_tuple
        }
        ward_processed.append(processed_ward)
    return ward_processed

async def annotateBulkDataWithWardId(req : BulkWorkFlowInsertRequest):
    wards = await getWardWithCityId(city_id=req.city_id)

    datas = req.workflows
    new_datas = {}
    for data in datas:
        point = (data.longitude,data.latitude)
        wardId = findWardId(point_coord=point,polygons=wards)
        new_data_annotated = data.dict()
        print(new_data_annotated)
        if wardId in new_datas:
            new_datas.get(wardId).append(new_data_annotated)
        else:
            new_datas[wardId] = [new_data_annotated]        
    print(new_datas)
    return new_datas


    
