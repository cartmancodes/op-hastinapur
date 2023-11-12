import React from 'react'
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
import BarChartComponent from './Charts/BarChartComponent';
import { useState } from 'react';
import AirQualityIndex from './OtherComponents/AirQualityIndex';
import AQIChart from './Charts/AQIChart';

function DashBoardHome() {
    const [rangeDate, setRangeDate] = useState([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);
    const wards = ["Ward1", "Ward2", "Ward3", "Ward4", "Ward5", "Ward6", "Ward7", "Ward8", "Ward9"];
    const wardValue = [9, 5, 4, 3, 5, 6, 3, 4, 5];
    const cityParams = ["Garbage", "Potholes", "Road Quality"
        , "Air Quality", "Public Toilet"
        , "Parking",
        "Traffic Congestion"];
    const cityParamsValue = [9, 5, 4, 3, 5, 6, 3];

    const [overallScore, setOverAllScore] = useState(8);
    const [nationalScore, setNationalScore] = useState(8);
    const [walkabilityScore, setwalkabilityScore] = useState(8);
    const [touristScore, setTouristScore] = useState(8);
    return (
        <div className='space-y-4'>
            <div className='sm:flex justify-between items-center'>
                <div className='flex-start'>
                    <h1 className='text-4xl font-bold text-gray-800'>Jhansi</h1>
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
            <Scores
                mainScoreName="Overall Score"
                mainScoreValue={overallScore}
                scores={
                    [
                        { scoreName: "National Average", scoreValue: nationalScore, scoreColor: "gray",disabled:true },
                        { scoreName: "Tourism Score", scoreValue: touristScore, scoreColor: "purple" },
                        { scoreName: "Walkability Score", scoreValue: walkabilityScore, scoreColor: "blue" }
                    ]
                }
            />
            <div className='sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                <Linechart />
                {/* <AQIChart /> */}
                <Alert severity="error" className='rounded-lg p-2 sm:w-[20vw] w-[100%]  border-1 border-gray-800'>
                        <AlertTitle><h1>Critical Alert</h1></AlertTitle>
                        <p>Eg: Dangerous Pitholes,Open Drain or manholes,Big Garbage Dump.
                            Location,Date</p>
                        <p><u>Learn More</u></p>
                    </Alert>
                    <Alert severity="warning" className='rounded-lg p-2 sm:w-[20vw] w-[100%] border-1 border-gray-800'>
                        <AlertTitle>Attention Required</AlertTitle>
                        <p>
                            Eg: Street light,overflowing drain,severe traffic congestion,
                            health,hazard.
                            Location,Date.
                        </p>
                        <u>Learn More</u>
                    </Alert>
            </div>
            <MapComponent />
            <div className='sm:flex sm:items-center 
                sm:justify-between mb-2 
                rounded-lg
                space-y-2
                sm:space-y-0
            '>
                <div className='shadow-md p-2 rounded-lg bg-cyan-50'>
                    <h1 className='text-2xl'>City Parameters</h1>
                    <BarChartComponent width={575} XLabels={cityParams} values={cityParamsValue} />
                </div>
                <div className='shadow-md p-2 rounded-lg bg-yellow-50'>
                    <h1 className='text-2xl'>Ward/Area Score</h1>
                    <BarChartComponent width={500} XLabels={wards} values={wardValue} />
                </div>
            </div>
            {/* <div className='w-full p-4 shadow-md rounded-lg mb-2'>
                <h1 className='text-4xl'>Progress of Intiatives</h1>
                <YojanaTable />
            </div> */}
            <AirQualityIndex />
        </div>
    )
}

export default DashBoardHome