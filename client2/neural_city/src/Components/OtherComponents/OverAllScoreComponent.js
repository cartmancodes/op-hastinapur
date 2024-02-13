import React from 'react'
import HalfPieChart from '../Charts/HalfPieChart'

function OverAllScoreComponent() {
    return (
        <div className='w-[40%] rounded-lg flex flex-col items-center justify-center shadow-md p-4'>
            <div className='font-bold text-2xl'>Overall Score</div>
            <HalfPieChart />
            <div className='border-b-2 p-2 flex mt-[-100px]  w-[100%] items-center justify-center text-2xl'>
                <div className='w-[30%] p-2 border-r flex  flex-col items-center justify-center'>
                    <p>-</p>
                    <div className='rounded-2xl border p-2 text-sm  w-full text-center'>Poor</div>
                </div>
                <div className='w-[30%] p-2 border-r flex  flex-col items-center justify-center'>
                    <p>-</p>
                    <div className='rounded-2xl border p-2 text-sm  w-full text-center'>Acceptable</div>
                </div>
                <div className='w-[30%] p-2 flex  flex-col items-center justify-center'>
                    <p className='text-green-600'>24</p>
                    <div className='rounded-2xl border p-2 text-sm bg-black text-white w-full text-center'>Good</div>
                </div>
            </div>
            <div className='w-[100%] p-4 bg-gray-100 mt-[10px] rounded-lg'>
                <h1 className='text-xl font-bold text-center mb-[10px]'>Grading Criteria<span className='text-lg font-light'>(Based on Score)</span></h1>
                <div className='flex w-[100%] item-center justify-center'>
                    <div className='flex flex-col items-center justify-center border-r border-gray-400 p-2 w-[33%]'>
                        <p className='text-lg font-bold text-red-500'>{"0-50"}</p>
                        <p className='text-gray-400'>Poor</p>
                    </div>
                    <div className='flex flex-col items-center justify-center  border-r border-gray-400 p-2 w-[33%]'>
                        <p className='text-lg font-bold text-blue-500'>{"50-75"}</p>
                        <p className='text-gray-400'>Acceptable</p>
                    </div>
                    <div className='flex flex-col items-center justify-center  p-2 w-[33%]'>
                        <p className='text-lg font-bold text-green-500'>{"75-100"}</p>
                        <p className='text-gray-400'>Good</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverAllScoreComponent