from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
from beanie import Document, Link,PydanticObjectId

class WorkflowInsertRequest(BaseModel):
    longitude: int
    latitude: int
    status: Optional[str]
    date: Optional[datetime]
    category: str
    issue: str
    media_url: Optional[str] = None
    description: Optional[str] = None

class SingleWorkFlowInsertRequest(WorkflowInsertRequest):
    ward_id: PydanticObjectId

class BulkWorkFlowInsertRequest(BaseModel):
    ward_id: PydanticObjectId
    workflows: List[WorkflowInsertRequest]