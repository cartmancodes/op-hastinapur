import React from 'react'
import MapComponent from '../../Components/MapComponents/Map';
import OverAllScoreComponent from '../../Components/OtherComponents/OverAllScoreComponent';
import IndividualScores from '../../Components/OtherComponents/IndividualScores';
import LineBarCombination from '../../Components/Charts/LineBarCombination';
import ActionCard from '../../Components/OtherComponents/ActionCard';
import WardTable from '../../Components/Tables/WardTable';
import MapAnalysis from '../../Components/OtherComponents/MapAnalysis';

// function caseChange(str) {
//     let sepe = str.split("_");
//     let ans = sepe.map((s) => {
//         return s[0].toUpperCase() + s.substring(1);
//     }).join(" ");
//     return ans;
// }

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
function DashBoardHome() {
    return (
        <div className='w-full'>
            <div className='space-y-[100px] relatives w-full sm:p-4'>
                <div id='overall' className='w-full section sm:flex items-center sm:space-x-6 space-y-2 sm:space-y-0'>
                    <OverAllScoreComponent score={49} good={24} acceptable={"-"} poor={"-"}/>
                    <IndividualScores scores={scores} include_sdg={true}/>
                </div>
                <div id='deepDive' className='w-full section sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <MapAnalysis />
                    <MapComponent />
                </div>
                <div id='actionItems' className='w-full section sm:flex items-center space-y-2 sm:space-y-0 justify-between'>
                    <LineBarCombination />
                    <ActionCard />
                </div>
                <div
                    id='wardTable'
                    className='w-full section sm:flex sm:items-center 
                    sm:justify-between mb-2 
                    rounded-lg
                    space-y-2
                    sm:space-y-0'
                >
                    <WardTable />
                </div>
            </div>
        </div>
    )
}

export default DashBoardHome