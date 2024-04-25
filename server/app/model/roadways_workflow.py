from app.model.workflow import Workflow

class RoadwaysWorkflow(Workflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.type = "roadways"

class SurfaceQualityRoadwaysWorkflow(RoadwaysWorkflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.issue = "surface quality"
        