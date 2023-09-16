import React from 'react'

function Scores() {
  return (
    <div className='flex items-center justify-between p-2'>
        <div className='shadow-md text-white px-20 py-6 flex flex-col items-center justify-between rounded-xl bg-purple-600 hover:bg-purple-700'>
            <h1 className='text-8xl font-bold'>8/10</h1>
            <p className='text-xl'>Overall Score Lucknow</p>
        </div>
        <div className='shadow-md text-red-500 px-10 py-8 flex flex-col items-center justify-between rounded-xl bg-red-100 hover:bg-red-200'>
            <h1 className='text-2xl'>8/10</h1>
            <p className='text-xl'>National Average</p>
        </div>
        <div className='shadow-md text-purple-500 px-12 py-8 flex flex-col items-center justify-between rounded-xl bg-purple-100 hover:bg-purple-200'>
            <h1 className='text-2xl'>8/10</h1>
            <p className='text-xl'>Tourism Score</p>
        </div>
        <div className='shadow-md text-blue-600 px-6 py-8 flex flex-col items-center justify-between rounded-xl bg-blue-100 hover:bg-blue-200'>
            <h1 className='text-2xl'>8/10</h1>
            <p className='text-xl'>Sustainability Score</p>
        </div>
    </div>
  )
}

export default Scores