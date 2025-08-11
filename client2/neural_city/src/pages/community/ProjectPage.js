import React, { useState } from 'react'
import { TextField, IconButton, Modal, FormControl, InputLabel, Button, Select, MenuItem } from '@mui/material'
import YojanaTable from '../../Components/Tables/YojanaTable';
import CloseIcon from '@mui/icons-material/Close';
import FormModal from '../../Components/Modals/FormModal';
import { useFormik } from 'formik';
import {toast} from 'react-toastify';

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

    const createProject = (values) => {
        const project = {
            "id": projects.length + 2,
            "group": values.group,
            "pname": values.pname,
            "date": "12-10-2022",
            "category": values.projectType,
            "status": "In Progress",
            "supportType": values.supportType
        };
        const newProjects = [...projects, project];
        setProjects(newProjects);
        toast("Project Created SuccessFully");
        setFormOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            pname: '',
            projectType: '',
            group: '',
            supportType: ''
        },
        validate: values => {
            const errors = {};
            if (!values.pname) {
                errors.pname = 'Project Name is required';
            }
            if (!values.projectType) {
                errors.projectType = 'Project Type is required';
            }
            if (!values.group) {
                errors.group = 'Group Name is required';
            }
            if (!values.supportType) {
                errors.supportType = 'Support Type is required';
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            createProject(values);
            resetForm();
        },
    });

    return (
        <div className='p-4 w-full min-h-[80vh] flex flex-col justify-between space-y-4'>
            <FormModal
                open={formOpen}
                heading={`Add a Project`}
                handleClose={formModalClose}
            >
                <form className='p-4 space-y-6' onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        placeholder='Enter Project Name'
                        id="pname"
                        name="pname"
                        value={formik.values.pname}
                        onChange={formik.handleChange}
                        error={formik.touched.pname && Boolean(formik.errors.pname)}
                        helperText={formik.touched.pname && formik.errors.pname}
                    />

                    <FormControl fullWidth error={formik.touched.projectType && Boolean(formik.errors.projectType)}>
                        <InputLabel>Project Type</InputLabel>
                        <Select
                            value={formik.values.projectType}
                            label="Project Type"
                            onChange={formik.handleChange}
                            name="projectType"
                        >
                            <MenuItem value={"Cleanliness"}>Cleanliness</MenuItem>
                            <MenuItem value={"Awareness"}>Awareness</MenuItem>
                            <MenuItem value={"Sustainability"}>Sustainability</MenuItem>
                        </Select>
                        {formik.touched.projectType && formik.errors.projectType &&
                            <span className="error-text">{formik.errors.projectType}</span>}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.group && Boolean(formik.errors.group)}>
                        <InputLabel>Group Name</InputLabel>
                        <Select
                            value={formik.values.group}
                            label="Group Name"
                            onChange={formik.handleChange}
                            name="group"
                        >
                            <MenuItem value={"XYZ Samaj"}>XYZ Samaj</MenuItem>
                            <MenuItem value={"ABC Foundation"}>ABC Foundation</MenuItem>
                            <MenuItem value={"Community Care Group"}>Community Care Group</MenuItem>
                        </Select>
                        {formik.touched.group && formik.errors.group &&
                            <span className="error-text">{formik.errors.group}</span>}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.supportType && Boolean(formik.errors.supportType)}>
                        <InputLabel>Support Type</InputLabel>
                        <Select
                            value={formik.values.supportType}
                            label="Support Type"
                            onChange={formik.handleChange}
                            name="supportType"
                        >
                            <MenuItem value={"manpower"}>Manpower</MenuItem>
                            <MenuItem value={"fund"}>Funds</MenuItem>
                        </Select>
                        {formik.touched.supportType && formik.errors.supportType &&
                            <span className="error-text">{formik.errors.supportType}</span>}
                    </FormControl>

                    <Button
                        size='large'
                        type='submit'
                        disableElevation
                        fullWidth
                        variant='contained'
                        disabled={!formik.dirty || !formik.isValid}
                    >
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