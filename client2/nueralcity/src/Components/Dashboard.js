import React, { useState } from 'react'
import Navbar from './Utility/Navbar'
import Sidebar from './Utility/Sidebar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Scores from './OtherComponents/Scores';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Linechart from './Charts/Linechart';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MapComponent from './MapComponents/MapComponent';
import YojanaTable from './OtherComponents/YojanaTable';
import Footer from './Utility/Footer';
import BarChartComponent from './Charts/BarChartComponent';
function Dashboard() {
    const [rangeDate, setRangeDate] = useState([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);
    const wards = ["Ward1", "Ward2", "Ward3", "Ward4", "Ward5", "Ward6", "Ward7","Ward8","Wardd9"];
    const wardValue = [9, 5, 4, 3, 5, 6, 3,4,5];
    const cityParams = ["Garbage", "Potholes", "Road Quality"
        , "Air Quality", "Public Toilet"
        , "Parking",
        "Traffic Congestion"];
    const cityParamsValue = [9, 5, 4, 3, 5, 6, 3];
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='w-full'>
                <Navbar />
                <div className='flex justify-between items-center p-2'>
                    <div className='flex-start'>
                        <h1 className='text-4xl font-bold text-gray-800'>Lucknow</h1>
                        <p className='text-gray-500 text-xl'>Dashboard <KeyboardArrowRightIcon color='primary' /> </p>
                    </div>
                    <div className='flex-end'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['SingleInputDateRangeField']}>
                                <DateRangePicker
                                    slotProps={{
                                        textField: {
                                            InputProps: { endAdornment: <CalendarTodayIcon /> },
                                        },
                                    }}
                                    format='MMM DD YYYY'
                                    autoComplete='off'
                                    value={rangeDate}
                                    onChange={(newValue) => setRangeDate(newValue)}
                                    slots={{ field: SingleInputDateRangeField }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <Scores />
                <div className='p-4 flex items-center justify-between'>
                    <Linechart />
                    <div className='space-y-4'>
                        <Alert severity="error" className='rounded-lg p-2 w-[20vw] border-1 border-gray-800'>
                            <AlertTitle><h1>Critical Alert</h1></AlertTitle>
                            <p>Eg: Dangerous Pitholes,Open Drain or manholes,Big Garbage Dump.
                                Location,Date</p>
                            <p><u>Learn More</u></p>
                        </Alert>
                        <Alert severity="warning" className='rounded-lg p-2 w-[20vw] border-1 border-gray-800'>
                            <AlertTitle>Attention Required</AlertTitle>
                            <p>
                                Eg: Street light,overflowing drain,severe traffic congestion,
                                health,hazard.
                                Location,Date.
                            </p>
                            <u>Learn More</u>
                        </Alert>
                    </div>
                </div>
                <MapComponent />
                <div className='mx-6 w-[97%] p-4 shadow-md rounded-lg mb-2'>
                    <h1 className='text-4xl'>Progress of Intiatives</h1>
                    <YojanaTable />
                </div>
                <div className='flex items-center 
                justify-between mb-2 
                space-x-4
                rounded-lg mx-6 '>
                    <div className='shadow-md p-2 rounded-lg bg-cyan-50'>
                        <h1 className='text-2xl'>City Parameters</h1>
                        <BarChartComponent  width = {650} XLabels={cityParams} values={cityParamsValue} />
                    </div>
                    <div className='shadow-md p-2 rounded-lg bg-yellow-50 overflow-x-scroll'>
                        <h1 className='text-2xl'>Ward/Area Score</h1>
                        <BarChartComponent width = {600} XLabels={wards} values={wardValue} />
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default Dashboard