import React from 'react'
import VehicleInfoCard from './VehicleInfoCard'
function Stream() {
    return (
        <div>
            <div className='
            sm:flex 
            space-y-4 
            sm:space-y-0 
            sm:space-x-4 
            sm:items-center 
            sm:justify-between
            sm:h-[80vh]
            '>
                <div>
                    <video height={1200} width={1200} className='rounded-lg' controls >
                        <source src="https://media.istockphoto.com/id/1411576027/video/downtown-cityscape-time-lapse-of-car-traffic-transportation-people-walk-cross-road-junction.mp4?s=mp4-640x640-is&k=20&c=eREdT3CG5jFQdlovue_2TSTyfMo3Ru8hhPH7K-ci5jU=" type="video/mp4" />
                    </video>
                </div>
                <div>
                    <div className='sm:w-[25vw] w-[100%] overflow-y-scroll h-[550px] top-0 right-0 bg-gray-200 rounded-lg sm:p-2'>
                        <VehicleInfoCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stream