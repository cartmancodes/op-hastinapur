import React from 'react'
import IndividualScoreCard from './IndividualScoreCard'

function IndividualScores() {
    let scores = [
        {
            name: "Cleaniness Score",
            value: 49,
            poor: {
                total: 2,
                params: [
                    { name: "Garbage and Litter", score: 30 },
                    { name: "Tobbaco spit", score: 40 }
                ]
            },
            acceptable: {
                total: 2,
                params: [
                    { name: "Dust", score: 60 },
                    { name: "Dustbin/Distemper", score: 54 }
                ]
            },
            good: {
                total: 2,
                params: [
                    { name: "Drain", score: 77 },
                    { name: "Toilet/Urination", score: 80 }
                ]
            }
        },
        {
            name: "Walkability Score(Sidewalk)",
            value: 49,
            poor: {
                total: 2,
                params: [
                    { name: "Garbage and Litter", score: 30 },
                    { name: "Tobbaco spit", score: 40 }
                ]
            },
            acceptable: {
                total: 2,
                params: [
                    { name: "Dust", score: 60 },
                    { name: "Dustbin/Distemper", score: 54 }
                ]
            },
            good: {
                total: 2,
                params: [
                    { name: "Drain", score: 77 },
                    { name: "Toilet/Urination", score: 80 }
                ]
            }
        },
        {
            name: "Encroachment",
            value: 49,
            poor: {
                total: 2,
                params: [
                    { name: "Garbage and Litter", score: 30 },
                    { name: "Tobbaco spit", score: 40 }
                ]
            },
            acceptable: {
                total: 2,
                params: [
                    { name: "Dust", score: 60 },
                    { name: "Dustbin/Distemper", score: 54 }
                ]
            },
            good: {
                total: 2,
                params: [
                    { name: "Drain", score: 77 },
                    { name: "Toilet/Urination", score: 80 }
                ]
            }
        },
        {
            name: "Roads Basic",
            value: 49,
            poor: {
                total: 2,
                params: [
                    { name: "Garbage and Litter", score: 30 },
                    { name: "Tobbaco spit", score: 40 }
                ]
            },
            acceptable: {
                total: 2,
                params: [
                    { name: "Dust", score: 60 },
                    { name: "Dustbin/Distemper", score: 54 }
                ]
            },
            good: {
                total: 2,
                params: [
                    { name: "Drain", score: 77 },
                    { name: "Toilet/Urination", score: 80 }
                ]
            }
        },
    ]
    return (
        <div className='w-[60%] rounded-lg bg-gray-100 p-4 grid grid-cols-2 gap-4 gap-y-8'>
            {
                scores.map((score) => {
                    return <IndividualScoreCard score={score} parameter={score.name}/>
                })
            }
        </div>
    )
}

export default IndividualScores