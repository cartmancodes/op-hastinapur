from typing import List, Optional
from pydantic import BaseModel
from beanie import Document, Link
from app.model.workflow import Workflow

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
    
