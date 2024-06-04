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
    media_url: Optional[str] = None
    description: Optional[str] = None

    class Settings:
        is_root = True
