import React from 'react'
import { IconButton, Avatar } from '@mui/material';
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
    avatar: {
        width: '100%',
    },
}));

function Sidebar({ items }) {
    const classes = useStyles();
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const styleActive = 'bg-violet-100 text-violet-600 rounded-lg hover:bg-violet-100';
    const styleInactive = 'hover:bg-violet-100 hover:text-violet-600  rounded-lg text-violet-600';

    return (
        <div className='md:w-fit bg-white border md:bg-opacity-50 p-2 w-[100%] space-x-6 justify-start md:space-x-0 md:justify-start flex md:flex-col text-gray-700 border-t-0 md:h-[100vh] md:space-y-8 md:sticky md:top-16 md:left-0 fixed bottom-0 left-0 z-[1001]'>
            <div className='md:space-y-2 space-x-8 md:space-x-0 flex md:flex-col'>
                {
                    items.map((item, idx) => {
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
        </div>
    )
}

export default Sidebar
