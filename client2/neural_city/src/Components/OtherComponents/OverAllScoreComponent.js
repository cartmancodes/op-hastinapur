import React from 'react'
import HalfPieChart from '../Charts/HalfPieChart'

function OverAllScoreComponent() {
  return (
    <div className='w-[40%] rounded-lg flex flex-col items-center justify-center shadow-md p-4'>
        <div className='font-bold text-2xl'>Overall Score</div>
        <HalfPieChart/>
        <div className='flex w-[100%] items-center justify-center text-2xl'>
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
    </div>
  )
}

export default OverAllScoreComponent