import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");

    const activeStyle = '2xl:rounded-3xl 2xl:text-6xl 2xl:p-10 hover:bg-blue-300 hover:text-white text-gray-500 p-2 rounded-lg';
    const unactiveStyle = "2xl:rounded-3xl 2xl:text-6xl 2xl:p-10 bg-blue-400 text-white font-bold p-2 rounded-lg"
    return (
        <div className='p-2 w-full sm:p-4 2xl:p-10 border-b items-center justify-between flex bg-gray-100'>
            <div className='flex-start hidden sm:block'>
                <h1 className='text-2xl hidden sm:block 2xl:text-8xl font-bold text-gray-800'>CityX</h1>
            </div>
            <div className='flex space-x-4 w-full sm:w-fit'>
                <div className='sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "infra") ?
                    activeStyle
                    : unactiveStyle} to='/'>City Infra</Link></div>
                <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "services") ?
                    activeStyle
                    : unactiveStyle} to='/services'>Services</Link>
                </div>
                <div className='sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "community") ?
                    activeStyle
                    : unactiveStyle} to='/community'>Community</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar