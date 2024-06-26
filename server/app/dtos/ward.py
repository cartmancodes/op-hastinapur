from pydantic import BaseModel
from typing import List, Optional
from pydantic import Field
from beanie import PydanticObjectId
from app.model.ward import Point

class WardInsertRequest(BaseModel):
    name: str
    ward_number: int
    overall_score: float = Field(default = 0)
    cleaniness_score: float = Field(default = 0)
    walkability_score: float = Field(default = 0)
    public_space_utilization: float = Field(default = 0)
    road_score: float = Field(default = 0)
    polygon_points: List[Point]
    x_centroid: Optional[float]
    y_centroid: Optional[float]
    area: Optional[float]

class WardUpdateRequest(BaseModel):
    name: Optional[str] = None
    ward_number: Optional[int] = None
    polygon_points: Optional[List[Point]] = None
    x_centroid: Optional[float] = None
    y_centroid: Optional[float] = None
    area: Optional[float] = None

class SingleWardInsertRequest(WardInsertRequest):
    city_id: PydanticObjectId

class BulkWardInsertRequest(BaseModel):
    city_id:PydanticObjectId
    wards: List[WardInsertRequest]

class WardPostResponse(BaseModel):
    success: bool
    message: str

class WardGetResponse(BaseModel):
    name: str
    city_id: PydanticObjectId
    ward_number: int
    overall_score: Optional[float]
    cleaniness_score: Optional[float]
    walkability_score: Optional[float]
    public_space_utilization: Optional[float]
    road_score: Optional[float]
    polygon_points: List[List[float]]


