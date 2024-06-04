from pydantic import BaseModel

class InsertResponse(BaseModel):
    success: bool
    message: str