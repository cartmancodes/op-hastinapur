from typing import List, Optional
from pydantic import BaseModel
from beanie import Document, Link
from app.model.ward import Ward

class City(Document):
    name: str
    state: str
    country: str
    overall_score: Optional[float]
    cleaniness_score: Optional[float]
    walkability_score: Optional[float]
    public_space_utilization: Optional[float]
    road_score: Optional[float]
    wards: Optional[List[Link[Ward]]] = None
    