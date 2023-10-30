import React from 'react'
import { Alert,AlertTitle } from '@mui/material'
function RightSideBar(props) {
    return (
        <div className='hidden sticky overflow-y-scroll sm:flex flex-col right-0 top-0 h-[100vh] bg-gray-100 rounded-lg p-2 w-[fit]'>
            <h1 className='text-4xl font-bold mb-2 w-full'>Top Articles</h1>
            <div className='space-y-4'>
                <Alert severity="error" className='rounded-lg p-2 border-1 max-w-[20vw]  border-gray-800'>
                    <AlertTitle><h1>Critical Alert</h1></AlertTitle>
                    <p>Eg: Dangerous Pitholes,Open Drain or manholes,Big Garbage Dump.
                        Location,Date</p>
                    <p><u>Learn More</u></p>
                </Alert>
                <Alert severity="warning" className='rounded-lg p-2 max-w-[20vw] border-1 border-gray-800'>
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
    )
}

export default RightSideBar