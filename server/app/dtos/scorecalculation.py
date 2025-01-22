from pydantic import BaseModel
from beanie import PydanticObjectId

class ScoreCalculateRequest(BaseModel):
    type: str
    ward_id: PydanticObjectId