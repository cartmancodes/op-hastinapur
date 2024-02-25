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
            name: "Walkability Score",
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
            name: "Roads Score",
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
        <div className='sm:w-[60%] bg-white w-[100%] rounded-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] '>
            <div className='p-4 font-bold text-xl border-b'>Parameters</div>
            <div className='p-2 sm:p-8 space-y-2 sm:space-y-0 md:grid md:grid-cols-2 md:gap-4 md:gap-y-8'>
                {
                    scores.map((score) => {
                        return <IndividualScoreCard score={score} parameter={score.name} />
                    })
                }
            </div>
        </div>
    )
}

export default IndividualScores