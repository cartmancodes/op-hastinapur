import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';
function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    return (
        <div className='w-[100%] h-[60px] items-center justify-between flex border-b-2'>
            <div className='flex-start flex items-center justify-between space-x-2'>
                <Link className={!(paths.length > 1 && paths[1] === "monitering") ?
                    'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                    : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/monitering'>Monitoring</Link>
                <Link className={!(paths.length > 1 && paths[1] === "intiateaction") ?
                    'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                    : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/intiateaction'>Intiate Action</Link>
                <Link className={!(paths.length > 1 && paths[1] === "planning") ?
                    'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                    : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/planning'>Planning</Link>
                <Link className={!(paths.length > 1 && paths[1] === "others") ?
                    'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                    : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/others'>Other Modules</Link>
                <Link className={!(paths.length > 1 && paths[1] === "help") ?
                    'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                    : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/help'>Help</Link>
            </div>
            <div className='flex-end p-2'>
                <IconButton>
                    <SearchIcon color='gray' />
                </IconButton>
                <IconButton>
                    <SmsIcon color='gray' />
                </IconButton>
                <IconButton style={{ padding: 0 }}>
                    <NotificationsNoneIcon />
                </IconButton>
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <PersonIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Navbar