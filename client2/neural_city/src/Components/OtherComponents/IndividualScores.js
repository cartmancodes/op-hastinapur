import React from 'react'
import IndividualScoreCard from './IndividualScoreCard'
import Sdg from './Sdg';

function IndividualScores({scores,include_sdg}) {
    return (
        <div className='w-full space-y-2'>
            <div className='sm:w-full bg-white w-[100%] rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] '>
                <div className='p-2 sm:p-4 space-y-2 justify-center sm:space-y-0 md:grid md:grid-cols-2 md:gap-4 md:gap-y-8'>
                    {
                        scores.map((score) => {
                            return <IndividualScoreCard score={score} parameter={score.name} />
                        })
                    }
                </div>
            </div>
            {include_sdg && <Sdg></Sdg>}
        </div>
    )
}

export default IndividualScores