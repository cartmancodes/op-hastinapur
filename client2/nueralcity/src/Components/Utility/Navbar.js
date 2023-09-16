import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
function Navbar() {
    const buttonStyle = 'hover:bg-purple-200 hover:text-purple-900 text-gray-500 p-2 rounded-lg';
    return (
        <div className='w-[100%] h-[60px] items-center justify-between flex'>
            <div className='flex-start flex items-center justify-between p-2 w-[50%]'>
                <Link className={buttonStyle}>Monitoring</Link>
                <Link className={buttonStyle}>Intiate Action</Link>
                <Link className={buttonStyle}>Planning</Link>
                <Link className={buttonStyle}>Other Modules</Link>
                <Link className={buttonStyle}>Help</Link>
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