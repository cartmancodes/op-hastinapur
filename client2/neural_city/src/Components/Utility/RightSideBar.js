import React from 'react'
import { mockRecommendation } from '../../mockData/MapData'
import AlertBar from './AlertBar2'
function RightSideBar(props) {
    return (
        <div className='hidden md:flex flex-col sticky top-20 right-0 rounded-md h-[80vh] items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[27%] ml-[20px] scroll-smooth'>
            <h1 className='p-2 text-2xl bg-gray-100 font-bold mb-2 w-full border-b'>Suggestions</h1>
            <div className='space-y-4 bg-gray-50 p-2 overflow-y-scroll '>
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