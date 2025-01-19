from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from beanie import Document, Link

class Workflow(Document):
    longitude: float
    latitude: float
    status: Optional[str]
    date: Optional[str]
    category: str
    issue: str
    media_url: Optional[str] = None
    description: Optional[str] = None
    score: int

    class Settings:
        is_root = True
