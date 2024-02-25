import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function DashBoardNav() {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const [navhidden, setNavHidden] = useState("hidden");
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDateChange = ({ startDate, endDate }) => {
        setDateRange({ startDate, endDate });
    };
    return (
        <div className='w-[100%] border-b px-2 sticky top-0 left-0 z-[1001] bg-white sm:flex justify-between items-center'>
            <div className='sm:hidden flex items-center justify-between'>
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
            <div className={`sm:w-[70%] sm:h-[60px] sm:items-center sm:justify-between ${navhidden} sm:flex`}>
                <div className='flex
                            flex-col
                            justify-center
                            items-center
                            sm:flex-start
                            sm:flex-row 
                            sm:items-center 
                            sm:justify-between
                            sm:space-x-[30px]
                '>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0 w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[2] === "monitering") ?
                        'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                        : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to='/infra/monitering'>Monitoring</Link></div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'><Link className={!(paths.length > 1 && paths[2] === "intiateaction") ?
                        'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                        : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to={'/infra/intiateaction'}>Intiate Action</Link>
                    </div>
                    <div className='border-b-2 sm:p-0 p-2 sm:border-b-0  w-full sm:w-fit'>
                        <Link className={!(paths.length > 1 && paths[2] === "planning") ?
                            'hover:bg-purple-200 hover:text-purple-600 text-gray-500 p-2 rounded-lg'
                            : "bg-purple-300 text-purple-900 p-2 rounded-lg"} to={`/infra/planning?id=${0}`}>Planning</Link>
                    </div>
                </div>
            </div>
            <div>
                <DateRangePicker
                    startDate={dateRange.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={dateRange.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={handleDateChange}
                    focusedInput={focusedInput}
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                />
            </div>
        </div>
    )
}

export default DashBoardNav