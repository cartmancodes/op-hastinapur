import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    console.log(isAuthenticated)
    const activeStyle = 'hover:bg-gray-200 text-md hover:text-gray-700 text-gray-500 p-2 rounded-md';
    const unactiveStyle = "bg-gray-200 text-md text-gray-700 font-bold p-2 rounded-md"
    return (
        <div>
            {!isAuthenticated ? <div className='p-2 w-full sm:p-2 border-b items-center justify-between flex bg-gray-100'>
                <div>
                    <img src="/logo.png" className='w-[50px] h-[50px]' />
                </div>
                <div>
                    <a className='p-2 text-gray-500 hover:bg-gray-200 rounded-sm' href="https://www.neuralcity.in/">About Us</a>
                </div>
            </div> :
                <div className='p-2 w-full sm:p-2 border-b items-center justify-between flex bg-gray-100'>
                    <div className='flex-start hidden sm:block'>
                        <h1 className='text-2xl hidden sm:block 2xl:text-8xl font-bold text-gray-800'>CityX</h1>
                    </div>
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
                    <div>
                        <Button onClick={() => {
                            signOut();
                            navigate("/login");
                        }}>Logout</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar