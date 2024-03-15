import React from 'react'
import { IconButton } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    iconButton: {
        '&:hover': {
            backgroundColor: 'transparent', // Override default hover effect
        },
    },
}));
function Sidebar({ items }) {
    const classes = useStyles();
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const styleActive = 'bg-gray-300 rounded-lg hover:bg-gray-300';
    const styleInactive = 'hover:bg-gray-300 hover:text-gray-900  rounded-lg text-gray-900';
    return (
        <div className='md:w-fit bg-gray-100 p-2 w-[100%] space-x-8 justify-center md:space-x-0 md:justify-start flex md:flex-col text-gray-700 rounded mr-[2px] md:ml-2 md:h-[88vh] md:space-y-2 md:sticky md:top-20 md:left-0 fixed bottom-0 left-0 z-[1001]'>
            {/* <div className='border-b bg-blue-500 rounded-t-md flex items-center justify-center border-gray-400 '><img src='/logowbg.png' className='scale-125 h-[50px] w-[40px]'/></div> */}
            {
                items.map((item,idx) => {
                    return (
                        <div className={idx === 0 && (paths[3] === null || paths.length === 3) ? styleActive : paths[3] === item.curr_path ? styleActive : styleInactive}>
                            <NavLink to={item.path_link}>
                                <Tooltip title={item.title}>
                                    <IconButton className={classes.iconButton} color='inherit'>
                                        {item.icon}
                                    </IconButton>
                                </Tooltip>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar