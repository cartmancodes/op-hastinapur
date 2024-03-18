import React, { useState } from 'react'
import { TextField, IconButton, Modal, FormControl, InputLabel, Button, Select, MenuItem } from '@mui/material'
import YojanaTable from '../../Components/Tables/YojanaTable';
import CloseIcon from '@mui/icons-material/Close';
import FormModal from '../../Components/Modals/FormModal';

const dummyProjects = [
    {
        "id": 1,
        "group": "XYZ Samaj",
        "pname": "Project Name-1",
        "date": "12-10-2022",
        "category": "Cleanliness",
        "status": "Completed",
        "supportType": "Manpower"
    },
    {
        "id": 2,
        "group": "ABC Foundation",
        "pname": "Project Name-2",
        "date": "12-10-2022",
        "category": "Awareness",
        "status": "Inprogress",
        "supportType": "Fund"
    },
    {
        "id": 3,
        "group": "Community Care Group",
        "pname": "Project Name-3",
        "date": "12-10-2022",
        "category": "Sustainability",
        "status": "Under Review",
        "supportType": "Fund"
    },
    {
        "id": 4,
        "group": "XYZ Samaj",
        "pname": "Project Name-4",
        "date": "12-10-2022",
        "category": "Cleanliness",
        "status": "Inprogress",
        "supportType": "Manpower"
    },
    {
        "id": 5,
        "group": "ABC Foundation",
        "pname": "Project Name-5",
        "date": "12-10-2022",
        "category": "Sustainability",
        "status": "Completed",
        "supportType": "Fund"
    }
]


function ProjectPage() {
    const [pname, setPname] = useState("");
    const [projectType, setProjectType] = useState("Cleanliness");
    const [group, setGroup] = useState("XYZ Samaj");
    const [supportType, setSupportType] = useState("manpower");
    const [projects, setProjects] = useState(dummyProjects);
    const [formOpen, setFormOpen] = useState(false);

    const formModalOpen = () => {
        setFormOpen(true);
    }

    const formModalClose = () => {
        setFormOpen(false);
    }

    const createProject = () => {
        if (!pname || !group || !projectType || !supportType) {
            window.alert("Some Fields are Missing");
        }
        const project = {
            "id": projects.length + 2,
            "group": group,
            "pname": pname,
            "date": "12-10-2022",
            "category": projectType,
            "status": "In Progress",
            "supportType": supportType
        };
        const newProjects = [...projects, project];
        setProjects(newProjects);
        setFormOpen(false);
    }

    return (
        <div className='p-4 w-full min-h-[80vh] flex flex-col justify-between space-y-4'>
            <FormModal
                open={formOpen}
                heading={`Add a Project`}
                handleClose={formModalClose}
            >
                <form className='p-4 space-y-6'>
                    <TextField fullWidth placeholder='Enter Project Name' value={pname} onChange={(e) => setPname(e.target.value)} />
                    <FormControl fullWidth>
                        <InputLabel>Project Type</InputLabel>
                        <Select
                            value={projectType}
                            label="Project Type"
                            onChange={(e) => setProjectType(e.target.value)}
                        >
                            <MenuItem value={"Cleanliness"}>Cleanliness</MenuItem>
                            <MenuItem value={"Awareness"}>Awareness</MenuItem>
                            <MenuItem value={"Sustainability"}>Sustainability</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Group Name</InputLabel>
                        <Select
                            value={group}
                            label="Group Name"
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            <MenuItem value={"XYZ Samaj"}>XYZ Samaj</MenuItem>
                            <MenuItem value={"ABC Foundation"}>ABC Foundation</MenuItem>
                            <MenuItem value={"Community Care Group"}>Community Care Group</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Support Type</InputLabel>
                        <Select
                            value={supportType}
                            label="Support Type"
                            onChange={(e) => setSupportType(e.target.value)}
                        >
                            <MenuItem value={"manpower"}>Manpower</MenuItem>
                            <MenuItem value={"fund"}>Funds</MenuItem>
                        </Select>
                    </FormControl>

                    <Button size='large' onClick={createProject} disableElevation fullWidth variant='contained'>
                        Create Project
                    </Button>
                </form>
            </FormModal>

            <div className='w-[100%]'>
                <div className='flex border bg-gray-100 p-4 items-center justify-between'>
                    <h1 className='rounded-t-md font-bold text-gray-500 text-2xl'>Ongoing Projects</h1>
                    <Button variant='contained' onClick={formModalOpen}>Add a Project</Button>
                </div>

                <YojanaTable projects={projects} />
            </div>

        </div>
    )
}

export default ProjectPage