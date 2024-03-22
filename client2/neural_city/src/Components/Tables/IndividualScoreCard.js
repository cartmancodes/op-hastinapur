import React from 'react'

function IndividualScoreCard({score}) {
    return (
        <div className='bg-white rounded-lg 
    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
    py-4
    px-4
    flex-[1/3]
    space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-gray-500'>{score.name}</h1>
                <h1 className='text-green-800 font-bold text-2xl'>{score.value}</h1>
            </div>

            <div className='flex w-[100%] item-center justify-center'>
                <div className='flex flex-col items-center justify-center border-r p-2 w-[33%]'>
                    <p className='text-lg font-bold text-red-500'>{score.poor}</p>
                    <p className='text-gray-400'>Poor</p>
                </div>
                <div className='flex flex-col items-center justify-center  border-r p-2 w-[33%]'>
                    <p className='text-lg font-bold text-blue-500'>{score.acceptable}</p>
                    <p className='text-gray-400'>Acceptable</p>
                </div>
                <div className='flex flex-col items-center justify-center  p-2 w-[33%]'>
                    <p className='text-lg font-bold text-green-500'>{score.good}</p>
                    <p className='text-gray-400'>Good</p>
                </div>
            </div>
        </div>
    )
}

export default IndividualScoreCard