from typing import List, Optional
from pydantic import BaseModel
from beanie import Document, Link
from app.model.workflow import Workflow


class Ward(Document):
    name: str
    overall_score: Optional[int]
    workflows: Optional[List[Link[Workflow]]]
    
