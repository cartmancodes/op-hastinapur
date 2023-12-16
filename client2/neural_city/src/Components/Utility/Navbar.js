import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const [navhidden, setNavHidden] = useState("hidden");
    return (
        <div className='border-b-2 px-2 sticky top-0 z-[1000000] bg-white'>
            <div className='sm:hidden p-2 flex items-center justify-between'>
                <div>
                    <img src='logo.png' className='h-[30px] w-[30px]'/>
                </div>
                <div><IconButton onClick={() => {
                    if (navhidden === "hidden") {
                        setNavHidden("flex flex-col")
                    } else {
                        setNavHidden("hidden")
                    }
                }}>
                    <MenuIcon></MenuIcon>
                </IconButton></div>
            </div>
            <div className={`w-[100%] sm:h-[60px] sm:items-center sm:justify-between ${navhidden} sm:flex`}>
                <div className='flex
                            flex-col
                            justify-center
                            items-center
                            sm:flex-start
                            sm:flex-row 
                            sm:items-center 
                            sm:justify-between
            '>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "monitering") ?
                        'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                        : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/monitering'>Monitoring</Link></div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[1] === "intiateaction") ?
                        'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                        : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/intiateaction'>Intiate Action</Link>
                    </div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'>
                        <Link className={!(paths.length > 1 && paths[1] === "planning") ?
                            'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                            : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/planning'>Planning</Link>
                    </div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'>
                        <Link className={!(paths.length > 1 && paths[1] === "others") ?
                            'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                            : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/others'>Other Modules</Link>
                    </div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'>
                        <Link className={!(paths.length > 1 && paths[1] === "help") ?
                            'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                            : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/help'>Help</Link>
                    </div>
                </div>
                <div className='flex-end sm:w-fit w-full p-2 flex'>
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
        </div>
    )
}

export default Navbar