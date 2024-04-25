from bson import ObjectId
from typing import List, Optional
from app.model.pyobject import PyObjectId


class Workflow:
    id: Optional[PyObjectId] = None
    def __init__(self, longitude, latitude):
        self.longitude = longitude
        self.latitude = latitude
        self.status  = "pending"

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {PyObjectId: str}