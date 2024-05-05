from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from beanie import Document, Link

class Workflow(Document):
    longitude: int
    latitude: int
    status: Optional[str]
    date: Optional[datetime]
    category: str
    issue: str
    description: Optional[str]

    class Settings:
        is_root = True
