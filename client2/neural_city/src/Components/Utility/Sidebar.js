import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';
import { Traffic } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
function Sidebar() {
    return (
        <div className='w-fit p-2 flex flex-col bg-gray-100 rounded-lg h-[100vh] space-y-2 sticky top-0 left-0'>
            <div>
                <Link to="/monitering">
                    <Tooltip title="Home">
                        <IconButton color='primary'>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div>
                <Link to="/monitering/sustainability">
                    <Tooltip title="Features Drill">
                        <IconButton color='primary'>
                            <ApartmentIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div>
                <Link to="/monitering/traffic">
                    <Tooltip title="Traffic">
                        <IconButton color='primary'>
                            <Traffic />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar