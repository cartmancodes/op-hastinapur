from typing import List, Optional
from typing_extensions import Annotated
from pydantic import BaseModel,Field
from beanie import Document, Link,Indexed,PydanticObjectId
from app.model.workflow import Workflow
import pymongo
from pymongo import IndexModel

class Point(BaseModel):
    longitude: float
    latitude: float

class Ward(Document):
    name: str
    ward_number: int
    overall_score: Optional[float]
    cleaniness_score: Optional[float]
    walkability_score: Optional[float]
    public_space_utilization: Optional[float]
    road_score: Optional[float]
    workflows: Optional[List[Link[Workflow]]] = None
    polygon_points: List[Point]
    city_id: PydanticObjectId
    x_centroid: Optional[float]
    y_centroid: Optional[float]
    area: Optional[float]
    
