import React, { useState } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import { Traffic } from '@mui/icons-material';
function Sidebar() {
    const [sidebarHidden, setSideBarHidden] = useState((Boolean)(false));
    return (
        sidebarHidden === true ? <div className='sticky top-0 left-0 p-2 w-[full]  bg-gray-100 rounded-lg h-[100vh]'>
            <div className='flex justify-between items-center'>
                <Link to='/'><h1 className='text-3xl font-bold font-[Bowlby One SC] text-gray-800'>Dashboard</h1></Link>
                <IconButton onClick={() => setSideBarHidden(!sidebarHidden)}>
                    <KeyboardDoubleArrowLeftIcon color='primary' />
                </IconButton>
            </div>
            <p className='text-[12px]'>An Offering From Neural City</p>

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
                <SidebarOption name="Home " icon="Home"
                    link={"/monitering"}
                    optionList={[]}
                />
                <SidebarOption name="Sustainability Index"
                    icon="Apartment"
                    optionList=
                    {["Potholes", "Garbage", "Traffic Congestion", "Air Quality", "Road Qulity",
                        "Public Toilet", "Open Spaces"]} link={"monitering/sustainability"} />
                <SidebarOption name="Tourism Index"
                    icon="Car"
                    optionList={["Quality"]}
                    link={"monitering/tourism"} />
                <SidebarOption name="Traffic Management"
                    icon="Traffic"
                    optionList={["Quality"]}
                    link={"monitering/traffic"} />
            </div>
        </div> :
            <div className='p-2 w-fit bg-gray-100 rounded-lg h-[100vh] space-y-10 sticky top-0 left-0'>
                <div className='hidden sm:block'>
                    <IconButton onClick={() => setSideBarHidden(!sidebarHidden)}>
                        <KeyboardDoubleArrowRightIcon color='primary' />
                    </IconButton>
                </div>
                <Link to="/monitering">
                    <IconButton color='primary'>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <br />
                <Link to="/monitering/sustainability">
                    <IconButton color='primary'>
                        <ApartmentIcon />
                    </IconButton>
                </Link>
                <br />
                <Link to="/monitering/tourism">
                    <IconButton color='primary'>
                        <DirectionsCarIcon />
                    </IconButton>
                </Link>
                <br />
                <Link to="/monitering/traffic">
                    <IconButton color='primary'>
                        <Traffic />
                    </IconButton>
                </Link>
            </div>
    )
}

export default Sidebar