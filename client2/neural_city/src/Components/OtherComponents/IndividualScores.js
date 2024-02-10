import React from 'react'
import IndividualScoreCard from './IndividualScoreCard'

function IndividualScores() {
    let scores = [
        {
            name: "Cleaniness Score",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        },
        {
            name: "Walkability Score(Sidewalk)",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        },
        {
            name: "Encroachment",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        },
        {
            name: "Roads Basic",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        },
        {
            name: "Congestion",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        },
        {
            name: "Air Pollution",
            value: 49,
            poor: "0-50",
            acceptable: "51-75",
            good: "76-100"
        }
    ]
  return (
    <div className='w-[60%] bg-gray-100 p-4 grid grid-cols-2 gap-4'>
        {
            scores.map((score) => {
                return <IndividualScoreCard score={score}/>
            })
        }
    </div>
  )
}

export default IndividualScores