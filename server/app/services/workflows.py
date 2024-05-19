from app.dtos.workflow import WorkflowInsertRequest
from fastapi import HTTPException,status
from app.model.ward import Ward
from app.model.workflow import Workflow
from beanie import PydanticObjectId
from typing import Optional
from app.model.city import City
from app.dtos.reponse import InsertResponse
from app.db.connections import db
from app.dtos.workflow import SingleWorkFlowInsertRequest,BulkWorkFlowInsertRequest

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
        # No need to call abort_transaction here, as it will be handled by the session context manager
        raise

async def bulk_insert_workflow(request:BulkWorkFlowInsertRequest):
    try:
        ward_id = request.ward_id
        ward = await Ward.find_one({"_id": ward_id})
        if ward is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="404 ward not found")

        data_to_be_inserted = []
        
        for workflow in request.workflows:
            workflow_as_dict = workflow.dict()
            workflow_to_be_inserted = Workflow(**workflow_as_dict)
            data_to_be_inserted.append(workflow_to_be_inserted)

        inserted_workflows = await Workflow.insert_many(data_to_be_inserted)
        inserted_ids = inserted_workflows.inserted_ids
        print(inserted_ids)
        inserted_workflow_docs = await Workflow.find_many({"_id": {"$in": inserted_ids}}).to_list()

        ward.workflows.extend(inserted_workflow_docs)
        await ward.save()
        return InsertResponse(success=True,message="Successfully Inserted Workflows")
    except HTTPException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal Server Error")

async def get_workflows(city_id:Optional[PydanticObjectId],ward_id:Optional[PydanticObjectId]):
    if ward_id is not None:
        ward = await Ward.find_one({"_id" : ward_id},fetch_links=True)
        if ward is None:
            raise Exception(status_code=status.HTTP_404_NOT_FOUND,message="Ward with this ward is not found")
        return ward
    elif city_id is not None:
        city = await City.find_one({"_id": city_id},fetch_links=True)
        if city is None:
            raise Exception(status_code=status.HTTP_404_NOT_FOUND,message="City with this city id is not found")
        workflows = [ward.workflows for ward in city.wards]
        return workflows
    else:
        all_workflows = await Workflow.find().to_list()
        return all_workflows