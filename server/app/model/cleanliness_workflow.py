from app.model.workflow import Workflow


class CleanlinessWorkflow(Workflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.type = "cleanliness"

class LitterCleanlinessWorkflow(CleanlinessWorkflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.issue = "litter"

class DustCleanlinessWorkflow(CleanlinessWorkflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.issue = "dust"
               
class DrainCleanlinessWorkflow(CleanlinessWorkflow):
    def __init__(self, longitude, latitude):
        super().__init__(longitude, latitude)
        self.issue = "drain"