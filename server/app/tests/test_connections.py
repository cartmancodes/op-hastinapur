from unittest import IsolatedAsyncioTestCase
from app.db.connections import db
from app.model.cleanliness_workflow import DustCleanlinessWorkflow


class TestClass:
    def __init__(self, test_id) -> None:
        self.test_id = test_id
    test_id: str

class Test(IsolatedAsyncioTestCase):

    async def asyncSetUp(self):
        self._async_connection = db
        await self._async_connection.init_dbi()

    async def test_response(self):
        dust_cleanliness_workflow = DustCleanlinessWorkflow(1, 1)
        await self._async_connection.insert(dust_cleanliness_workflow.__dict__, "test_db5")
        op_resposne = await self._async_connection.get_by_value("test_db5", "longitude", 1)
        # op_resposne = await self._async_connection.get_all("test_db5")
        print(op_resposne)
        self.assertEqual(dust_cleanliness_workflow.longitude, op_resposne[0]["longitude"])


    async def asyncTearDown(self):
        await self._async_connection.close_dbi()


