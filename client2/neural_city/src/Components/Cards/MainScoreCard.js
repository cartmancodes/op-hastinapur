import React from 'react'

function MainScoreCard({ national_score, city_score }) {
    return (
        <div className=" bg-white border border-gray-200 rounded-lg flex flex-col justify-between">
            <div>
                <div className='p-4 border-b space-y-4'>
                    <p className="text-2xl font-bold text-gray-800">Overall Score</p>
                    <div className="flex justify-between items-end space-x-8">
                        <div className="space-y-2 text-gray-600 text-md font-medium">
                            <p>City Score</p>
                            <p>National Average</p>
                        </div>

                        <div className="space-y-2 text-right text-md font-semibold">
                            <p className={
                                city_score <= 40
                                    ? 'text-red-500'
                                    : city_score <= 65
                                        ? 'text-blue-500'
                                        : 'text-green-600'
                            }>
                                {city_score}
                            </p>
                            <p className={
                                national_score <= 40
                                    ? 'text-red-500'
                                    : national_score <= 65
                                        ? 'text-blue-500'
                                        : 'text-green-600'
                            }>
                                {national_score}
                            </p>
                        </div>
                    </div>
                </div>


                <div className='p-2'>
                    <div className='w-[100%] p-4 bg-gray-100 rounded-md'>
                        <div className='text-xl font-bold  text-center'>Grading Criteria<span className='text-lg font-light'>(Based on Score)</span></div>
                        <div className='flex w-[100%] item-center justify-center'>
                            <div className='flex flex-col items-center justify-center border-r border-gray-400 p-2'>
                                <p className='text-lg font-bold text-red-500'>{"0-35"}</p>
                                <p className='text-gray-400'>Poor</p>
                            </div>
                            <div className='flex flex-col items-center justify-center  border-r border-gray-400 p-2'>
                                <p className='text-lg font-bold text-blue-500'>{"35-70"}</p>
                                <p className='text-gray-400'>Manageable</p>
                            </div>
                            <div className='flex flex-col items-center justify-center  p-2'>
                                <p className='text-lg font-bold text-green-500'>{"70-100"}</p>
                                <p className='text-gray-400'>Good</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainScoreCard