from asyncio.log import logger
from typing import List
import uvicorn
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.potholesServices import get_all_potholes,write_bulk_potholes,write_one_pothole
from app.model.potholesModel import PotholesImages
# Import services and DB connections here 
from app.db.connections import db

"""Setting up application context"""
app = FastAPI()
# global logger = logging.getLogger(__name__)

@app.on_event("startup")
async def start_up():
    await db.init_dbi()

@app.on_event("shutdown")
async def shut_down():
    await db.close_dbi()

"""Enable CORS"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""Root Page"""
@app.get("/")
def home():
    return "Hey! Welcome to Home Page"

@app.get("/potholes/")
async def getPotholes():
    data = await get_all_potholes()
    return {
        "data" : data
    }

@app.post("/potholes/bulk")
async def bulk_write_potholes(data:List[PotholesImages]):
    await write_bulk_potholes(data)
    return {
        "message" : "Data Written SuccessFully"
    }

@app.post("/potholes/")
async def insert_potholes_data(data:PotholesImages):
    await write_one_pothole(data)
    return {
        "message" : "Data Inserted SuccessFully"
    }

"""Main method call"""
if __name__ == "__main__":
    logging.config.fileConfig(fname='logger.ini')
    uvicorn.run(app, host="0.0.0.0", port=5000)