from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
from beanie import Document, Link,PydanticObjectId

class WorkflowInsertRequest(BaseModel):
    longitude: float
    latitude: float
    status: Optional[str]
    date: Optional[str]
    category: str
    issue: str
    media_url: Optional[str] = None
    description: Optional[str] = None
    score: int

class WorkFlowUpdateRequest(BaseModel):
    status: Optional[str] = None
    date: Optional[str] = None
    category: Optional[str] = None
    issue: Optional[str] = None
    media_url: Optional[str] = None
    description: Optional[str] = None
    score: int

class SingleWorkFlowInsertRequest(WorkflowInsertRequest):
    ward_id: PydanticObjectId

class BulkWorkFlowInsertRequest(BaseModel):
    city_id: PydanticObjectId
    workflows: List[WorkflowInsertRequest]