from pydantic import BaseModel

class CityInsertRequest(BaseModel):
    name: str
    state: str
    country: str

