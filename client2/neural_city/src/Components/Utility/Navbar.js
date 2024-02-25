import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    return (
        <div className='p-4 border-b items-center justify-between flex bg-gray-100'>
            <div className='flex-start'>
                <h1 className='text-2xl font-bold text-gray-800'>CityX</h1>
            </div>
            <div className='flex space-x-4'>
                <div className='border-b-2 sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "infra") ?
                    'hover:bg-blue-300 hover:text-white text-gray-500 p-2 rounded-lg'
                    : "bg-blue-400 text-white font-bold p-2 rounded-lg"} to='/'>City Infra</Link></div>
                <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "services") ?
                    'hover:bg-blue-300 hover:text-white text-gray-500 p-2 rounded-lg'
                    : "bg-blue-400 text-white font-bold p-2 rounded-lg"} to='/services'>Services</Link>
                </div>
                <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "community") ?
                    'hover:bg-blue-300 hover:text-white text-gray-500 p-2 rounded-lg'
                    : "bg-blue-400 text-white font-bold p-2 rounded-lg"} to='/community'>Community</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar