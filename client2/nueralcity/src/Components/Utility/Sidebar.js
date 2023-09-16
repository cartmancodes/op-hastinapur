import React, { useState } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';
import SidebarOption from './SidebarOption';
function Sidebar() {
    const [sidebarHidden, setSideBarHidden] = useState((Boolean)(false));
    console.log(sidebarHidden);
    return (
        sidebarHidden === true ? <div className='p-2  bg-gray-100 rounded-lg h-[100vh]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
                <IconButton onClick={() => setSideBarHidden(!sidebarHidden)}>
                    <KeyboardDoubleArrowLeftIcon color='primary' />
                </IconButton>
            </div>
            <p className='text-[12px]'>An Offering From Nueral City</p>

            <div className='flex items-center justify-center mt-4 rounded-lg bg-gray-200 p-4 space-x-2'>
                <div className='flex items-center'>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }} />
                </div>
                <div>
                    <h1 className='text-[15px] font-bold'>Admin Name</h1>
                    <p className='text-[12px] font-light '>Designation</p>
                </div>
            </div>
            <div className='space-y-2 mt-4'>
                <SidebarOption name="Sustainability Index" icon="Home"
                    optionList=
                    {["Potholes", "Garbage", "Traffic Congestion", "Air Quality", "Road Qulity",
                        "Public Toilet", "Open Spaces"]} />
                <SidebarOption name="Tourist Index" icon="Apartment" optionList={["Quality"]}/>
                <SidebarOption name="Treval Index" icon="Car" optionList={["Quality"]}/>
            </div>
        </div> :
        <div className='p-2 bg-gray-100 rounded-lg h-[100vh] space-y-10'>
            <div>
                <IconButton onClick={() => setSideBarHidden(!sidebarHidden)}>
                    <KeyboardDoubleArrowLeftIcon color='primary' />
                </IconButton>
            </div>
            <Link>
                <IconButton color='primary'>
                    <HomeIcon />
                </IconButton>
            </Link>
            <br />
            <Link>
                <IconButton color = 'primary'>
                    <ApartmentIcon />
                </IconButton>
            </Link>
            <br />
            <Link>
                <IconButton color = 'primary'>
                    <DirectionsCarIcon />
                </IconButton>
            </Link>

        </div>
    )
}

export default Sidebar