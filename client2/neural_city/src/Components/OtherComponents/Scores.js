import React from 'react'

function Scores(props) {
    return (
        <div className='flex items-center justify-between'>
            <div className='shadow-md text-white px-14 py-6 flex flex-col items-center justify-between rounded-xl bg-purple-600 hover:bg-purple-700'>
                <h1 className='text-8xl font-bold'>{props.mainScoreValue}/10</h1>
                <p className='text-xl'>{props.mainScoreName}</p>
            </div>
            {
                props.scores.map((score) => {
                    console.log(score);
                    return (
                        <div className={`shadow-md text-${score.scoreColor}-500 px-4 py-8 flex flex-col items-center justify-between rounded-xl bg-${score.scoreColor}-100 hover:bg-${score.scoreColor}-200 w-[180px] h-[120px]`}>
                            <h1 className='text-xl'>{score.scoreValue}/10</h1>
                            <p className='text-[1em]'>{score.scoreName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Scores