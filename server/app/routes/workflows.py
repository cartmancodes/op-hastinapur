from typing import List
from fastapi import APIRouter,Query,Body,Depends
from app.dtos.workflow import SingleWorkFlowInsertRequest,BulkWorkFlowInsertRequest,WorkFlowUpdateRequest
from app.services.workflows import insert_workflow,get_workflows,bulk_insert_workflow,update_workflow
from beanie import PydanticObjectId
from app.middlewares.role_based_access import user_access,admin_access

workflowRouter = APIRouter(prefix="/workflows")

@workflowRouter.post("/",dependencies=[Depends(admin_access)])
async def insert_workflow_route(request:SingleWorkFlowInsertRequest):
    res = await insert_workflow(request=request)
    return res

@workflowRouter.post("/bulk_insert",dependencies=[Depends(admin_access)])
async def insert_bulk_workflow_router(request:BulkWorkFlowInsertRequest):
    res = await bulk_insert_workflow(request=request)
    return res

@workflowRouter.get("/",dependencies=[Depends(user_access)])
async def get_workflow_route(
        ward_id: PydanticObjectId = Query(None,description="Ward id is Optional Parameter"),      
        city_id: PydanticObjectId = Query(None,description="City Id is Optional Parameter"),
        parameter: str = Query(None,description="Parameter is Optional Parameter"),
        sub_parameter: str = Query(None,description="Sub Parameter is an Optional Parameter"),
        score: str = Query(None,description="Score is Optional Parameter")
        ):
    res = await get_workflows(ward_id=ward_id,city_id=city_id,parameter=parameter,sub_parameter=sub_parameter,score=score)
    return res

@workflowRouter.patch("/",dependencies=[Depends(user_access)])
async def update_workflow_route(
    workflow_id: PydanticObjectId = Query(...,description="Workflow id is Required"),
    updateValues: WorkFlowUpdateRequest = Body()
):
    res = await update_workflow(workflow_id=workflow_id,updateValues=updateValues)
    return res
    
