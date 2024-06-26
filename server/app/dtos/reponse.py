from pydantic import BaseModel
from beanie import PydanticObjectId
from typing import Optional

class InsertResponse(BaseModel):
    success: bool
    message: str
    id: Optional[PydanticObjectId] = None