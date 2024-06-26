"""
Primary Database module for the application
"""
from typing import Any, List, Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from beanie import init_beanie
from app.model.city import City
from app.model.ward import Ward
from app.model.workflow import Workflow
from app.model.user import User
from pymongo import ASCENDING

MONGODB_URL = "db"
# MONGODB_URL = "mongodb+srv://admin:KZoPQqB8uJORMpDP@cluster0.szrrnjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
MIN_CONNECTIONS = 1
MAX_CONNECTIONS = 5

class Database:
    """Singleton Database"""
    def __init__(self) -> None:
        self.connection: AsyncIOMotorClient = None
        self.database: AsyncIOMotorDatabase = None

    async def init_dbi(self) -> None:
        self.connection = AsyncIOMotorClient(MONGODB_URL, maxPoolsize=MAX_CONNECTIONS,
            minPoolSize=MIN_CONNECTIONS)
        self.database = self.connection.db
        # Initialize beanie with the Product document class
        await init_beanie(database=self.database, document_models=[Workflow, Ward, City,User])
        pymongo_collection = self.connection.db["City"]
        await pymongo_collection.create_index(
            [("city_id", ASCENDING), ("ward_number", ASCENDING)],
            unique=True
        )
    
    async def start_transaction(self):
        """Start a new transaction."""
        session = self.connection.start_session()
        return session.start_transaction()

    async def commit_transaction(self, session):
        """Commit the transaction."""
        await session.commit_transaction()

    async def abort_transaction(self, session):
        """Abort the transaction."""
        await session.abort_transaction()

    
    async def insert(self, record, collection: str):
        """Insert single record object in the collection
        Args:
            record : Generic object to be inserted
            collection (str): Name of the collection
        Returns:
            record: Return input record for confirming successful insertion.
        """
        db_record = await self.database[collection].insert_one(record) 
        return db_record
    

    async def bulk_insert(self, records, collection: str):
        return await self.database[collection].insert_many(records)

    async def get_by_value(self, collection: str, key: str, value):
        """Method to get records from a collection based on key and value
        Args:
            collection (str): Name of the collection
            key (str): Key to searched
            value (generic): Value of the key
        """

        query = {key: value}
        db_records = self.database[collection].find(query)
        output_records = await db_records.to_list(length=None)
        return output_records


    async def get_all(self, collection):
        """Method to get all records from the collection
        Args:
            collection (str): Name of the collection
        Returns:
            List of all objects in the collection
        """
        db_records = self.database[collection].find()
        output_records = await db_records.to_list(length=None)
        return output_records
        
    async def close_dbi(self) -> None:
        self.connection.close()

db = Database()