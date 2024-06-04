from fastapi import APIRouter,Query
from app.dtos.workflow import SingleWorkFlowInsertRequest,BulkWorkFlowInsertRequest
from app.services.workflows import insert_workflow,get_workflows,bulk_insert_workflow
from beanie import PydanticObjectId

workflowRouter = APIRouter(prefix="/workflows")

@workflowRouter.post("/")
async def insert_workflow_route(request:SingleWorkFlowInsertRequest):
    res = await insert_workflow(request=request)
    return res

@workflowRouter.post("/bulk_insert")
async def insert_bulk_workflow_router(request:BulkWorkFlowInsertRequest):
    res = await bulk_insert_workflow(request=request)
    return res

@workflowRouter.get("/")
async def get_workflow_route(
        ward_id: PydanticObjectId = Query(None,description="Ward id is Optional Parameter"),      
        city_id: PydanticObjectId = Query(None,description="City Id is Optional Parameter")):
    res = await get_workflows(ward_id=ward_id,city_id=city_id)
    return res