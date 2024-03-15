import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function DashBoardNav({ items, include_date }) {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    console.log(paths);
    const [navHidden, setNavHidden] = useState(true); // Changed state variable name for clarity
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDateChange = ({ startDate, endDate }) => {
        setDateRange({ startDate, endDate });
    };
    const styleActive = "border-b p-2 sm:border-b-0 w-full sm:w-fit hover:bg-purple-50 hover:text-purple-600 2xl:text-6xl text-gray-500 text-center sm:rounded-lg";
    const styleUnactive = "border-b p-2 sm:border-b-0 w-full sm:w-fit bg-purple-200 text-purple-900 sm:rounded-lg 2xl:text-6xl text-center";
    
    return (
        <div className='w-full font-serif z-[1002] sm:p-0 border-b sticky top-0 left-0 bg-white sm:flex sm:justify-between items-center'>
            {/* Mobile navigation */}
            <div className='border-b p-2 sm:p-0 sm:hidden w-full flex items-center justify-between'>
                <div>
                    <img src='/logo.png' className='h-[30px] w-[30px]' alt="Logo" />
                </div>
                <div>
                    <IconButton onClick={() => setNavHidden(!navHidden)}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </div>
            {/* Desktop navigation */}
            <div className={`sm:w-full sm:p-2 sm:h-[60px] sm:items-center sm:justify-between sm:flex sm:space-x-10 ${navHidden ? 'hidden' : 'block'}`}>
                <div className='flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-start w-full sm:w-auto sm:space-x-10'>
                    {items.map((path) => (
                        <Link key={path.path_link} className='w-full whitespace-nowrap' to={path.path_link}>
                            <div className={!(paths.length > 1 && paths[2] === path.curr_path) ? styleActive : styleUnactive}>
                                {path.name}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='p-1 sm:p-0'>
                    {include_date ? (
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
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default DashBoardNav;
