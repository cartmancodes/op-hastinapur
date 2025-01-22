import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useContext } from 'react';
import { CityContext } from '../../Context/CityContext';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const authUser = useAuthUser();
    const [profileMenuHidden, setProfileMenuHidden] = useState(true);
    const cityContext = useContext(CityContext);
    const city = cityContext.current_city;

    useEffect(() => {
        setProfileMenuHidden(true);
    },[location]);

    const handleProfileMenuStateChange = () => {
        setProfileMenuHidden((profileMenuHidden) => !profileMenuHidden);
    }

    const activeStyle = 'hover:bg-gray-200 text-md hover:text-gray-700 text-gray-500 p-2 rounded-md';
    const unactiveStyle = "bg-gray-200 text-md text-gray-700 font-bold p-2 rounded-md"
    return (
        <div>
            {!isAuthenticated ? <div className='p-2 w-full sm:p-2 border-b items-center justify-between flex bg-gray-100'>
                <div>
                    <img src="/logo.png" className='w-[50px] h-[50px]' />
                </div>
                <div>
                    <a className='p-2 text-black hover:text-blue-500 rounded-sm' href="https://www.neuralcity.in/">About Us</a>
                </div>
            </div> :
                <div className='p-2 w-full sm:p-2 border-b items-center justify-between flex bg-gray-100'>
                    <div className='flex-start hidden sm:block'>
                        <h1 className='text-2xl hidden sm:block 2xl:text-8xl font-bold text-gray-800'>CityX</h1>
                    </div>
                    {city ? <div className='flex space-x-4 w-full sm:w-fit'>
                        <div className='sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "infra") ?
                            activeStyle
                            : unactiveStyle} to='/infra/monitoring'>City Infra</NavLink></div>
                        <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "services") ?
                            activeStyle
                            : unactiveStyle} to='/services'>Services</NavLink>
                        </div>
                        <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><NavLink className={!(paths.length > 1 && paths[1] === "community") ?
                            activeStyle
                            : unactiveStyle} to='/community'>Community</NavLink>
                        </div>
                    </div> : <div></div>} 
                    <div>
                        <Avatar onClick={handleProfileMenuStateChange} className='cursor-pointer'></Avatar>
                        <div className={profileMenuHidden ? 'hidden' : 'bg-white p-4 w-[300px] shadow-md space-y-2 rounded-lg absolute top-[50px] right-[5px] z-[10002]'}>
                            <div className='flex items-center space-x-4'>
                                <Avatar sx={{ width: 50, height: 50, fontSize: 30 }} src="/static/images/avatar/1.jpg" alt={authUser.email.toUpperCase()}></Avatar>
                                <div>
                                    <p className='text-lg font-semibold'>CityX Admin</p>
                                    <p className='text-sm text-purple-900'>{authUser.email}</p>
                                </div>
                            </div>
                            <div>
                                <Link to={"/"}><div className='w-full rounded-lg cursor-pointer text-gray-500 hover:bg-gray-200 flex p-2 items-center space-x-4'>
                                    <span><SwapVertIcon sx={{color: 'blue'}} /></span>
                                    <p>Switch City</p>
                                </div></Link>
                                <div onClick={() => {
                                    signOut();
                                    navigate("/login");
                                }} className='w-full rounded-lg cursor-pointer text-gray-500 hover:bg-gray-200 flex p-2 items-center space-x-4'>
                                    <span><LogoutIcon sx={{color: 'blue'}}/></span>
                                    <p>Sign Out</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar