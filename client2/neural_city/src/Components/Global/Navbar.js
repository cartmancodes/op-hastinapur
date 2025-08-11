import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IoMdPerson } from "react-icons/io";
import { IconButton } from '@mui/material';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");

    const activeStyle = 'hover:bg-gray-200 text-md hover:text-gray-700 text-white p-2 rounded-md';
    const unactiveStyle = "bg-gray-200 text-md text-gray-700 font-bold p-2 rounded-md"
    return (
        <div className='p-2 text-white w-full sm:p-2 border-b items-center justify-between flex bg-violet-700'>
            <div className='space-x-10 flex items-center'>
                <a href="/infra/monitoring" className='flex-start hidden sm:block cursor-pointer'>
                    <h1 className='text-2xl hidden sm:block 2xl:text-8xl font-bold text-white'>CityX</h1>
                </a>
                <div className='flex space-x-4 w-full sm:w-fit'>
                    <div className='sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "infra") ?
                        activeStyle
                        : unactiveStyle} to='/'>City Infra</NavLink></div>
                    <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "services") ?
                        activeStyle
                        : unactiveStyle} to='/services'>Services</NavLink>
                    </div>
                    <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "community") ?
                        activeStyle
                        : unactiveStyle} to='/community'>Community</NavLink>
                    </div>
                </div>
            </div>
            <div>
                <div className='p-2 rounded-[100%] bg-white cursor-pointer'><IoMdPerson color='purple' size={'30px'}></IoMdPerson></div>
            </div>
        </div>
    )
}

export default Navbar