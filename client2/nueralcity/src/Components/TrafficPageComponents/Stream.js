import React from 'react'
import VehicleInfoCard from './VehicleInfoCard'
function Stream() {
    return (
        <div>
            <div className='flex space-x-4 items-center justify-between'>
                <div>
                    <video height={1000} width={1000} className='rounded-lg' controls >
                        <source src="https://media.istockphoto.com/id/1411576027/video/downtown-cityscape-time-lapse-of-car-traffic-transportation-people-walk-cross-road-junction.mp4?s=mp4-640x640-is&k=20&c=eREdT3CG5jFQdlovue_2TSTyfMo3Ru8hhPH7K-ci5jU=" type="video/mp4" />
                    </video>
                </div>
                <div>
                    <div className='w-[30vw] overflow-y-scroll h-[95vh] top-0 right-0 bg-gray-200 rounded-lg p-2'>
                        <VehicleInfoCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stream