from app.dtos.workflow import WorkflowInsertRequest
from fastapi import HTTPException,status
from app.model.ward import Ward
from app.model.workflow import Workflow
from beanie import PydanticObjectId
from typing import Optional,List
from app.model.city import City
from app.dtos.reponse import InsertResponse
from app.db.connections import db
from app.dtos.workflow import SingleWorkFlowInsertRequest,BulkWorkFlowInsertRequest,WorkFlowUpdateRequest
from app.services.process_workflow import annotateBulkDataWithWardId


def filterByParamAndSubParam(workflows,parameter,sub_parameter):
    if parameter is not None and sub_parameter is not None:
            new_workflows = list(filter(lambda workflow: workflow.category == parameter and workflow.issue == sub_parameter,workflows))
            print(new_workflows)
            return new_workflows
    elif parameter is not None:
        new_workflows = list(filter(lambda workflow: workflow.category == parameter,workflows))
        print(new_workflows)
        return new_workflows
    else: 
        return workflows
    
def filterByScore(workflows,score):
    if(score is None):
        return workflows
    if(score == "good"):
        new_workflows = list(filter(lambda workflow: workflow.score > 50,workflows))
        return new_workflows
    elif(score == "manageable"):
        new_workflows = list(filter(lambda workflow: workflow.score >= 35 and workflow.score < 50,workflows))
        return new_workflows
    elif(score == "poor"):
        new_workflows = list(filter(lambda workflow: workflow.score < 35,workflows))
        return new_workflows
    else:
        return workflows

async def update_workflow(workflow_id: PydanticObjectId,updateValues:WorkFlowUpdateRequest):
    try:
        workflow = await Workflow.get(workflow_id)
        if workflow is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Workflow is Not Found")
        workflowUpdate = updateValues.dict(exclude_unset=True)
        updatedWorkflow = await workflow.set(workflowUpdate)
        return updatedWorkflow
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="WorkFlow Updated Successully")

async def insert_workflow(request:SingleWorkFlowInsertRequest):
    session = None
    try:
        ward_id = request.ward_id
        session = await db.connection.start_session()
        async with session.start_transaction():
            ward = await Ward.find_one({"_id": ward_id}, session=session)
            if ward is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ward with this id does not exist")
            
            insert_object = request.dict(exclude=["ward_id"])
            new_workflow = Workflow(**insert_object)
            await new_workflow.insert(session=session)
            
            ward.workflows.append(new_workflow)
            await ward.save(session=session)
            
            # Commit the transaction
            await session.commit_transaction()

            return InsertResponse(success=True, message="Workflow Inserted")
    except HTTPException as e:
        raise e

async def bulk_insert_workflow(request:BulkWorkFlowInsertRequest):
    try:
        data_to_be_inserted = await annotateBulkDataWithWardId(req=request)
        for key in data_to_be_inserted:
            await bulk_insert_in_a_ward(ward_id=key,workflows=data_to_be_inserted.get(key))
        return InsertResponse(success=True,message="Successfully Inserted Workflows")
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error")

async def bulk_insert_in_a_ward(ward_id: PydanticObjectId,workflows: List[InsertResponse]):
    try:
        ward = await Ward.find_one({"_id": ward_id})
        if ward is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="404 ward not found")

        data_to_be_inserted = []
        
        for workflow in workflows:
            workflow_as_dict = workflow
            workflow_to_be_inserted = Workflow(**workflow_as_dict)
            data_to_be_inserted.append(workflow_to_be_inserted)

        inserted_workflows = await Workflow.insert_many(data_to_be_inserted)
        inserted_ids = inserted_workflows.inserted_ids
        inserted_workflow_docs = await Workflow.find_many({"_id": {"$in": inserted_ids}}).to_list()

        ward.workflows.extend(inserted_workflow_docs)
        await ward.save()
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error")

async def get_workflows(
        city_id:Optional[PydanticObjectId],ward_id:Optional[PydanticObjectId],
        parameter: Optional[str],sub_parameter: Optional[str],score=Optional[str]
    ):
    if ward_id is not None:
        ward = await Ward.find_one({"_id" : ward_id},fetch_links=True)
        if ward is None:
            raise Exception(status_code=status.HTTP_404_NOT_FOUND,message="Ward with this ward is not found")
        workflow_filtered_by_param = filterByParamAndSubParam(workflows=ward.workflows,parameter=parameter,sub_parameter=sub_parameter)
        print(score)
        workflow_filter_by_score = filterByScore(workflows=workflow_filtered_by_param,score=score)
        return workflow_filter_by_score
    elif city_id is not None:
        city = await City.find_one({"_id": city_id},fetch_links=True)
        if city is None:
            raise Exception(status_code=status.HTTP_404_NOT_FOUND,message="City with this city id is not found")
        workflows = [ward.workflows for ward in city.wards]
        workflow_filtered_by_param = filterByParamAndSubParam(workflows=workflows,parameter=parameter,sub_parameter=sub_parameter)
        workflow_filter_by_score = filterByScore(workflows=workflow_filtered_by_param,score=score)
        return workflow_filter_by_score
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid Arguments")