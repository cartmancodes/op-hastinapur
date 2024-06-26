from asyncio.log import logger
from typing import List
import uvicorn
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import services and DB connections here 
from app.db.connections import db
from app.routes.ward import wardRouter
from app.routes.city import cityRouter
from app.routes.workflows import workflowRouter
from app.routes.user import auth_router
from app.middlewares.role_based_access import user_access,admin_access

"""Setting up application context"""
app = FastAPI()
app.include_router(wardRouter)
app.include_router(cityRouter)
app.include_router(workflowRouter)
app.include_router(auth_router)
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

# app.middleware("http")(admin_access)
# app.middleware("http")(user_access)

"""Root Page"""
@app.get("/")
def home():
    return "Hey! Welcome to Home Page"

    # res = await db.get_all("spatial_data")
    # return {
    #     "message" : "Data has been successfully fetched",
    #     "data" : res
    # }

"""Main method call"""
if __name__ == "__main__":
    logging.config.fileConfig(fname='logger.ini')
    uvicorn.run(app, host="0.0.0.0", port=8000)