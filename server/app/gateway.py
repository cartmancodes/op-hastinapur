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
import pandas as pd
import os
import json

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

@app.get("/data/")
async def insert_image_data():
    file_name = 'data_model_v2.csv'
    try:
        df = pd.read_csv(file_name, header=[0, 1])
        data = []
        df = df.where(pd.notna(df), -10)
        for index, row in df.iterrows():
            new_row = {
                "image_name" : row['Image Name']['data'],
                "latitude" : row['Latitude']['data'],
                "longitude" : row['Longitude']['data'],
                "date" : row['Date']['data'],
                "time" : row['Time']['data'],
                "image_url" : row['Image URL']['data'],
                "scoring_completed" : row['Scoring completed']['data'],
                "score" : {
                    "overall_score" : row['Score']['Overall Score'],
                    "cleaniness_score" : {
                        "overall_cleaniness_score" : row['Score']['Cleanliness score'],
                        "general_cleanliness": row['Cleanliness']['General Cleanliness'],
                        "littering" : row["Cleanliness"]["Littering"],
                        "dustbin" : row["Cleanliness"]["Dustbins/Dumpsters"],
                        "drain" : row["Cleanliness"]["Drain"]
                    },
                    "sidewalk_score" : {
                        "overall_sidewalk_score" : row['Score']['Sidewalk score'],
                        "maintenance_quality": row['Sidewalk']["Maintenance Quality"],
                        "cleanliness_and_hygiene": row['Sidewalk']['Cleanliness and Hygiene'],
                        "effective_use_vs_ccupation": row['Sidewalk']['Effective Use vs. Occupation'],
                        "markets" : row['Sidewalk']['Markets (Walkability)'],
                        "wrong_parking": row['Sidewalk']['Wrong Parking']
                    },
                    "road_score" : {
                        "overall_road_score" : row['Score']['Roads score'],
                        "surface_quality" : row['Roads']['Surface Quality'],
                        "blacktop_quality" : row['Roads']['Blacktop Quality'],
                        "lane_markings" : row['Roads']['Lane Markings'],
                        "right_rules" : row['Roads']['Right-of-Way Rules'],
                        "lane_discpline" : row['Roads']['Lane Discpline'],
                        "wrong_parking" : row['Roads']['Wrong Parking']
                    },
                    "encroachment_score" : {
                        "overall_encroachment_score" : row['Score']['Encroachment score'],
                        "general _encroachment" : row['Encroachment']['General  Encroachment'],
                        "encroachment_by_whom": row['Encroachment']['Encroachment by Whom']
                    },

                    "traffic_calming" : {
                        "overall_traffic_calming" : 5,
                        "toilet" : row['Public Washrooms']['Toilet/Urination']
                    }
                }
            }
            # await db.insert(dict(new_row),"spatial_data")
            data.append(new_row)
            print(new_row)

        # await db.bulk_insert(data,"spatial_data")
        return {
            "message" : "suceess",
            "data" : data
        }
    except FileNotFoundError:
        return {
            "message" : "File was Not found in Specified Directory"
        }
    
@app.get("/data/")
async def get_image_data():
    res = await db.get_all("spatial_data")
    return {
        "message" : "Data has been successfully fetched",
        "data" : res
    }

"""Main method call"""
if __name__ == "__main__":
    logging.config.fileConfig(fname='logger.ini')
    uvicorn.run(app, host="0.0.0.0", port=5000)