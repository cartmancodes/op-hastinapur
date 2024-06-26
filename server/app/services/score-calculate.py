from fastapi import HTTPException,status
from beanie import PydanticObjectId
from app.model.ward import Ward
from app.model.city import City
from app.dtos.scorecalculation import ScoreCalculateRequest
from abc import ABC

async def recalculate_scores(request: ScoreCalculateRequest):
    session = None
    try:
        ward_id = request.ward_id
        session = await db.connection.start_session()
        async with session.start_transaction():
            scoreCalculate = CalculateCleaninessScore(CalculateWalkabilityScore
            (CalculatePublicSpaceUtlization(CalculateRoadScore())))

            await scoreCalculate.handle(request)
            await calculate_overall_score(request.ward_id)
            return {
                "message" : "Score Recalculated Successfully",
                "success" : True
            }
    except HTTPException as e:
        raise e

class ScoreCalculate(ABC):
    """Parent class of all concrete handlers"""
    def __init__(self, nxt):
        """change or increase the local variable using nxt"""
        self._nxt = nxt

    async def handle(self, request:ScoreCalculateRequest):
        """It calls the processRequest through given request"""
        handled = self.processRequest(request)
        """case when it is not handled"""
        if not handled:
            self._nxt.handle(request)

    async def processRequest(self, request):
        """throws a NotImplementedError"""
        raise NotImplementedError('First implement it !')

class CalculateCleaninessScore(ScoreCalculate):
    """Concrete Handler # 1: Child class of AbstractHandler"""
    async def processRequest(self, request):
        if request.type.lower() == "cleaniness":
            ward_id = request.ward_id
            pipeline = [
                {"$match": {"_id": ward_id}},
                {"$unwind": "$workflows"},
                {
                    "$lookup": {
                        "from": "workflow",
                        "localField": "workflows",
                        "foreignField": "_id",
                        "as": "workflow_docs"
                    }
                },
                {"$unwind": "$workflow_docs"},
                {
                    "$group": {
                        "_id": "$_id",
                        "average_cleaniness_score": {"$avg": "$workflow_docs.cleaniness_score"}
                    }
                }
            ]
            
            result = await Ward.get_motor_collection().aggregate(pipeline).to_list(length=None)
            if result:
                avg_cleanliness_score = result[0]["average_cleaniness_score"]
                ward = await Ward.find_one({"_id" : ward_id})
                old_score = ward.cleaniness_score
                ward.cleaniness_score = avg_cleanliness_score
                await ward.save()
                current_score = ward.cleaniness_score
                city_id = ward.city_id

                city = await City.find_one({"_id" : city_id})
                new_city_cleaniness_score = (city.cleaniness_score - old_score + current_score) / (len(city.wards))
                city.cleaniness_score = new_city_cleaniness_score
                await city.save()
            return True

class CalculateWalkabilityScore(ScoreCalculate):
    """Concrete Handler # 2: Child class of AbstractHandler"""
    async def processRequest(self, request):
        '''return True if the request is handled'''
        if request.type.lower() == "walkability":
            ward_id = request.ward_id
            pipeline = [
                {"$match": {"_id": ward_id}},
                {"$unwind": "$workflows"},
                {
                    "$lookup": {
                        "from": "workflow",
                        "localField": "workflows",
                        "foreignField": "_id",
                        "as": "workflow_docs"
                    }
                },
                {"$unwind": "$workflow_docs"},
                {
                    "$group": {
                        "_id": "$_id",
                        "average_walkability_score": {"$avg": "$workflow_docs.walkability_score"}
                    }
                }
            ]
            
            result = await Ward.get_motor_collection().aggregate(pipeline).to_list(length=None)
            if result:
                avg_walkability_score = result[0]["average_walkability_score"]
                ward = await Ward.find_one({"_id" : ward_id})
                old_walkability_score = ward.walkability_score
                ward.walkability_score = avg_walkability_score
                new_walkability_score = ward.walkability_score

                city_id = ward.city_id
                city = await City.find_one({"_id" : city_id})
                new_city_walkability_score = (city.walkability_score - old_walkability_score + new_walkability_score) / (len(city.wards))
                city.walkability_score = new_city_walkability_score
                await ward.save()

            return True

class CalculatePublicSpaceUtlization(ScoreCalculate):
    """Concrete Handler # 3: Child class of AbstractHandler"""
    async def processRequest(self, request):
        '''return True if the request is handled'''
        if request.type.lower() == "public_space_utilization":
            ward_id = request.ward_id
            pipeline = [
                {"$match": {"_id": ward_id}},
                {"$unwind": "$workflows"},
                {
                    "$lookup": {
                        "from": "workflow",
                        "localField": "workflows",
                        "foreignField": "_id",
                        "as": "workflow_docs"
                    }
                },
                {"$unwind": "$workflow_docs"},
                {
                    "$group": {
                        "_id": "$_id",
                        "avg_public_space_utilization": {"$avg": "$workflow_docs.public_space_utilization"}
                    }
                }
            ]
            
            result = await Ward.get_motor_collection().aggregate(pipeline).to_list(length=None)
            if result:
                avg_public_space_utilization = result[0]["avg_public_space_utilization"]
                ward = await Ward.find_one({"_id" : ward_id})
                old_avg = ward.public_space_utilization
                ward.public_space_utilization = avg_public_space_utilization
                await ward.save()
                new_avg = ward.public_space_utilization
                city_id = ward.city_id
                city = await City.find_one({"_id" : city_id})
                new_city_avg = (city.public_space_utilization - old_avg + new_avg) / (len(city.wards))
                city.public_space_utilization = new_city_avg
                await city.save()
            return True

class CalculateRoadScore(ScoreCalculate):
    """Default Handler: child class from AbstractHandler"""
    async def processRequest(self, request):
        if request.type.lower() == "road":
            ward_id = request.ward_id
            pipeline = [
                {"$match": {"_id": ward_id}},
                {"$unwind": "$workflows"},
                {
                    "$lookup": {
                        "from": "workflow",
                        "localField": "workflows",
                        "foreignField": "_id",
                        "as": "workflow_docs"
                    }
                },
                {"$unwind": "$workflow_docs"},
                {
                    "$group": {
                        "_id": "$_id",
                        "average_road_score": {"$avg": "$workflow_docs.road_score"}
                    }
                }
            ]
            
            result = await Ward.get_motor_collection().aggregate(pipeline).to_list(length=None)
            if result:
                avg_road_score = result[0]["average_road_score"]
                
                ward = await Ward.find_one({"_id" : ward_id})
                old_avg = ward.road_score
                ward.road_score = avg_road_score
                await ward.save()
                new_avg = ward.road_score
                city_id = ward.city_id
                city = await City.find_one({"_id" : city_id})
                new_city_avg = (city.road_score - old_avg + new_avg) / (len(city.wards))
                city.road_score = new_city_avg
                await city.save()

            return True

async def calculate_overall_score(ward_id : PydanticObjectId):
    ward = await Ward.find_one({"_id" : ward_id})
    avg = (ward.cleaniness_score + ward.walkability_score + 
            ward.public_space_utilization + ward.road_score) / 5.0
    
    old_score = ward.overall_score
    ward.overall_score = avg
    await ward.save()
    city_id = ward.city_id
    city = await City.find_one()
    city_avg = (city.overall_score - old_score + ward.overall_score) / (len(city.wards))
    city.overall_score = city_avg
    await city.save()
    return {
        "message" : "Score Calculated Successfully"
    }
