import React from 'react'
import OverAllScoreComponent from '../../Components/OtherComponents/OverAllScoreComponent'
import IndividualScores from '../../Components/OtherComponents/IndividualScores'

function ServicesHome() {
    let scores = [
        {
            name: "Transit",
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
            name: "Holistic Development",
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
            name: "Travel and Tourism",
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
            name: "Holistic Security",
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
            name: "Customer Service",
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
        <div className='w-[100%] min-h-[100vh] '>
            <div className='w-full'>
                <div className='space-y-[100px] relatives w-full sm:p-4'>
                    <div id='overall' className='w-full section md:flex items-center md:space-x-6 space-y-2 md:space-y-0'>
                        <OverAllScoreComponent score={57} good={24} acceptable={"-"} poor={"-"} />
                        <IndividualScores scores={scores} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesHome