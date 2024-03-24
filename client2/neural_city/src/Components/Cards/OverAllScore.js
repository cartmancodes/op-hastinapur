import React from 'react'
import HalfPieChart from '../Charts/HalfPieChart'
import InfoButton from '../ui/InfoButton'

function OverAllScoreComponent({ score, good, acceptable, poor }) {
    const tooltipText = "The Overall Score integrates Cleanliness, Walkability, Public Space Compliance, and Road Scores, offering a comprehensive assessment of an area's livability. It aids residents, planners, and policymakers in improving infrastructure and quality of life. By amalgamating key metrics, it enables efficient comparisons and targeted enhancements for safer and more accessible communities.";
    return (
        <div className='md:w-[40%] bg-white w-[100%] md:p-4 rounded-sm flex flex-col items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-1'>
            <div className='font-bold text-2xl flex w-full p-2 text-center justify-center'><div>Overall Score<div className='text-sm font-normal text-gray-500'>(Out of 100)</div></div><span><InfoButton text={tooltipText}></InfoButton></span></div>
            <HalfPieChart score={score} />
            <div className='border-b sm:p-2 flex sm:mt-[-20px]  w-[100%] items-center justify-center text-2xl'>
                <div className='w-[30%] p-2 border-r flex  flex-col items-center justify-center'>
                    <p className='text-red-500 font-bold'>{poor}</p>
                    <div className='rounded-2xl border p-2 text-sm  w-full text-center'>Poor</div>
                </div>
                <div className='w-[30%] p-2 border-r flex  flex-col items-center justify-center'>
                    <p className='text-blue-500 font-bold'>{acceptable}</p>
                    <div className='rounded-2xl border p-2 text-sm  w-full text-center'>Manageable</div>
                </div>
                <div className='w-[30%] p-2 flex  flex-col items-center justify-center'>
                    <p className='text-green-600 font-bold'>{good}</p>
                    <div className='rounded-2xl border p-2 text-sm bg-black text-white w-full text-center'>Good</div>
                </div>
            </div>
            <div className='w-[100%] sm:p-2 bg-gray-100 mt-[10px] rounded-md'>
                <div className='text-xl font-bold  text-center'>Grading Criteria<span className='text-lg font-light'>(Based on Score)</span></div>
                <div className='flex w-[100%] item-center justify-center'>
                    <div className='flex flex-col items-center justify-center border-r border-gray-400 p-2 w-[33%]'>
                        <p className='text-lg font-bold text-red-500'>{"0-35"}</p>
                        <p className='text-gray-400'>Poor</p>
                    </div>
                    <div className='flex flex-col items-center justify-center  border-r border-gray-400 p-2 w-[33%]'>
                        <p className='text-lg font-bold text-blue-500'>{"35-70"}</p>
                        <p className='text-gray-400'>Manageable</p>
                    </div>
                    <div className='flex flex-col items-center justify-center  p-2 w-[33%]'>
                        <p className='text-lg font-bold text-green-500'>{"70-100"}</p>
                        <p className='text-gray-400'>Good</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverAllScoreComponent