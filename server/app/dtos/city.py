from pydantic import BaseModel
from typing import Optional
from app.model.user import User

class CityInsertRequest(BaseModel):
    name: str
    state: str
    country: str
    overall_score: Optional[float] = None
    cleaniness_score: Optional[float] = None
    walkability_score: Optional[float] = None
    public_space_utilization: Optional[float] = None
    road_score: Optional[float] = None

class CityUpdateRequest(BaseModel):
    name: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    overall_score: Optional[float] = None
    cleaniness_score: Optional[float] = None
    walkability_score: Optional[float] = None
    public_space_utilization: Optional[float] = None
    road_score: Optional[float] = None

