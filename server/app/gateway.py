from asyncio.log import logger
import uvicorn
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""Root Page"""
@app.get("/")
def home():
    return "Home Page"

"""Main method call"""
if __name__ == "__main__":
    logging.config.fileConfig(fname='logger.ini')
    uvicorn.run(app, host="0.0.0.0", port=5000)