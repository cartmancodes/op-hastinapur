import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { mockRecommendation } from '../MapComponents/MockData'
import AlertBar from './AlertBar2'
function RightSideBar(props) {
    return (
        <div className='hidden fixed right-0 top-16  overflow-y-scroll sm:flex flex-col h-[100vh] bg-gray-100 p-2 w-[20%]'>
            <h1 className='text-2xl font-bold mb-2 w-full'>Suggestions</h1>
            <div className='space-y-4'>
                {
                    mockRecommendation.map((reco, idx) => {
                        return <AlertBar main_topic={reco.main_topic} heading={reco.heading} id={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default RightSideBar