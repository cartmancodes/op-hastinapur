from typing import List, Optional
from pydantic import BaseModel
from beanie import Document, Link
from app.model.ward import Ward

class City(Document):
    name: str
    state: str
    country: str
    wards: Optional[List[Link[Ward]]]
    