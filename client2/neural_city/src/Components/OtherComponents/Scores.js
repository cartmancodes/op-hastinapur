import React from 'react'

function Scores(props) {
    return (
        <div className='sm:flex 
        sm:items-center
         sm:justify-between 
         space-y-2 
         sm:space-y-2'>
            <div className='shadow-md
             text-white px-2 py-2 md:px-14 md:py-4 sm:px-2 sm:py-2 flex flex-col items-center justify-between rounded-xl bg-purple-600 hover:bg-purple-700'>
                <h1 className='md:text-8xl sm:text-2xl text-2xl font-bold'>{props.mainScoreValue}/5</h1>
                <p className='md:text-xl text-lg text-center'>{props.mainScoreName}</p>
            </div>
            {
                props.scores.map((score) => {
                    return (
                        <div>
                        {
                            score.disabled ?
                            <div className={`shadow-md text-${score.scoreColor}-500 md:px-4 md:py-8 sm:px-2 sm:py-2 flex flex-col items-center justify-between rounded-xl bg-${score.scoreColor}-50 hover:bg-${score.scoreColor}-100 md:w-[180px] md:h-[120px]`}>
                                <h1 className='text-xl'></h1>
                                <p className='text-[1em]'>{score.scoreName}</p>
                            </div> :
                                <div className={`shadow-md text-${score.scoreColor}-500 md:px-4 md:py-8 sm:px-2 sm:py-2 flex flex-col items-center justify-between rounded-xl bg-${score.scoreColor}-100 hover:bg-${score.scoreColor}-200 md:w-[180px] md:h-[120px]`}>
                                    <h1 className='text-xl'>{score.scoreValue}/5</h1>
                                    <p className='text-[1em]'>{score.scoreName}</p>
                                </div>
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Scores