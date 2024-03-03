import React from 'react'
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';


function Sidebar({items}) {

    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const styleActive = 'bg-gray-300 rounded-lg';
    const styleInactive = '';
    return (
        <div className='sm:w-fit w-[100vw] justify-between sm:justify-start p-2 rounded-sm flex sm:flex-col sm:bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mr-[2px] ml-1 bg-gray-200  sm:h-[88vh] sm:space-y-2 sm:sticky sm:top-20 sm:left-0 fixed bottom-0 left-0 z-[1000]'>
            {
                items.map((item) => {
                    return (
                        <div className={paths[3] === item.curr_path ? styleActive : styleInactive}>
                            <Link to={item.path_link}>
                                <Tooltip title={item.title}>
                                    <IconButton color='primary'>
                                        {item.icon}
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar