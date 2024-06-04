from unittest import IsolatedAsyncioTestCase
from app.db.connections import db
from app.model.city import City
from app.model.ward import Ward
from app.model.workflow import Workflow
from app.dtos.workflow import SingleWorkFlowInsertRequest
from app.services.workflows import insert_workflow
from app.dtos.reponse import InsertResponse

class Test(IsolatedAsyncioTestCase):

    async def asyncSetUp(self):
        self._async_connection = db
        await self._async_connection.init_dbi()

    async def test_workflow_insert_function(self):
        khailar_ward =  await Ward(name="Khailar", workflows=[dust_cleanliness_workflow]).insert()
        jhansi_city = await City(name="jhansi", state="Uttar Pradesh", country="India", wards=[khailar_ward]).insert()

        workflow_insert_req = SingleWorkFlowInsertRequest(
            longitude= 0,
            latitude= 0,
            status= "under_review",
            date= "2024-05-19T18:22:26.850Z",
            category= "road",
            issue= "potholes",
            media_url= "string",
            description= "string",
            ward_id= khailar_ward["_id"]
        )
        expected_response = InsertResponse(success=True, message="Workflow Inserted")
        res = await insert_workflow(request=request)
        return self.assertEqual(res.success,expected_response.success)

    async def test_response(self):
        dust_cleanliness_workflow = await Workflow(longitude=2, latitude=2,category="roadways",issue="potholes").insert()
        khailar_ward =  await Ward(name="Khailar", workflows=[dust_cleanliness_workflow]).insert()
        jhansi_city = await City(name="jhansi", state="Uttar Pradesh", country="India", wards=[khailar_ward]).insert()

        all_cities = await City.find().to_list()

        all_wards = await Ward.find().to_list()

        all_workflows = await Workflow.find().to_list()

        self.assertEqual(dust_cleanliness_workflow.longitude, all_workflows[0].longitude)


    async def asyncTearDown(self):
        await self._async_connection.close_dbi()


