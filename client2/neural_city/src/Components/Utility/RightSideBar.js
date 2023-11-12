import React from 'react'
import { Alert,AlertTitle } from '@mui/material'
function RightSideBar(props) {
    return (
        <div className='hidden fixed right-0 top-16  overflow-y-scroll sm:flex flex-col h-[100vh] bg-gray-100 p-2 w-[20%]'>
            <h1 className='text-2xl font-bold mb-2 w-full'>Alert and notifications</h1>
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