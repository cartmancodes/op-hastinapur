import React from 'react'
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';
import { Traffic } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import {useLocation} from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const styleActive = 'bg-gray-300 rounded-lg';
    const styleInactive = '';
    return (
        <div className='sm:w-fit w-[100vw] justify-between sm:justify-start p-2 rounded-sm flex sm:flex-col sm:bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mr-[2px] ml-1 bg-gray-200  sm:h-[88vh] sm:space-y-2 sm:sticky sm:top-20 sm:left-0 fixed bottom-0 left-0 z-[1000]'>
            <div className={paths[3] === null || paths.length === 3 ? styleActive : styleInactive}>
                <Link to="/infra/monitering">
                    <Tooltip title="Home">
                        <IconButton color='primary'>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className={paths[3] === 'sustainability' ? styleActive : styleInactive}>
                <Link to="/infra/monitering/sustainability">
                    <Tooltip title="Features Drill">
                        <IconButton color='primary'>
                            <ApartmentIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className={paths[3] === "traffic" ? styleActive : styleInactive}>
                <Link to="/infra/monitering/traffic">
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