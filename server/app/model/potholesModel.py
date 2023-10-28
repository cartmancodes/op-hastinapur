from datetime import datetime
from enum import Enum
from pydantic import BaseModel,HttpUrl

class StatusEnum(str,Enum):
    pending = "pending"
    completed = "completed"
    under_review = "under_review"

class Potholes(BaseModel):
    latitude: float
    longitude: float
    locality: str
    score: float
    date: datetime
    action_status: StatusEnum

class PotholesImages(Potholes):
    file_name: str

