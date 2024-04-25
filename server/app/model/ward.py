class Ward:
    def __init__(self, workflow_id, name, city_id, workflows):
        self.workflow_id = workflow_id
        self.name = name
        self.city_workflow_id = city_id
        self.overall_score = None
        self.workflows = workflows

    def add_workflow(self, workflow):
        self.workflows.append(workflow)