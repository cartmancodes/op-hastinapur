import React from 'react'
import MapComponent from '../../Components/MapComponents/Map';
import OverAllScoreComponent from '../../Components/Cards/OverAllScore';
import IndividualScores from '../../Components/Cards/IndividualScores';
import LineBarCombination from '../../Components/Charts/LineBarCombination';
import ActionCard from '../../Components/Cards/ActionCard';
import WardTable from '../../Components/Tables/WardTable';
import MapAnalysis from '../../Components/Charts/MapAnalysis';

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
        description: " A metric evaluating the cleanliness and hygiene levels of a specific area, establishment, or object. It provides insights into the overall cleanliness standards, helping users make informed decisions about their surroundings",
        value: 21.46,
        poor: {
            total: 4,
            params: [
                { name: "Garbage and Litter", score: 28.88888889 },
                { name: "Tobbaco spit", score: 0 },
                { name: "Dust Score", score: 18.06451613 },
                { name: "Drain Score", score: 21.44927536 },
            ]
        },
        acceptable: {
            total: 2,
            params: [
                { name: "Dustbins/Dumpsters Score", score: 50 },
                { name: "Toilet/Urination Score", score: 50 }
            ]
        },
        good: {
            total: 0,
            params: [

            ]
        }
    },
    {
        name: "Walkability Score",
        description: "A measure indicating the ease and convenience of walking in a particular area or neighborhood. Factors such as pedestrian infrastructure, proximity to amenities, safety, and ease of navigation contribute to this score, helping individuals assess the walkability and pedestrian-friendliness of a location",
        value: 24.92,
        poor: {
            total: 4,
            params: [
                { name: "Construction Material Score", score: 20 },
                { name: "Sidewalk Usability Score", score: 30.47619048 },
                { name: "Parking on Sidewalk Score", score: 4.578313253 },
                { name: "Sidewalk Availability Score", score: 0 },
            ]
        },
        acceptable: {
            total: 2,
            params: [
                { name: "Street Furniture and Amenities Score", score: 50 },
                { name: "Walking Space Score", score: 54.28571429 }
            ]
        },
        good: {
            total: 0,
            params: [
            ]
        }
    },
    {
        name: "Public Space compliance",
        description: "Refers to the adherence of public spaces, such as parks, sidewalks, and recreational areas, to local regulations, guidelines, and standards. It encompasses factors such as safety measures, accessibility features, cleanliness, and overall maintenance to ensure that public spaces meet established requirements and provide a pleasant environment for residents and visitors",
        value: 37.05,
        poor: {
            total: 1,
            params: [
                { name: "General Occupation", score: 18.7027027 },
            ]
        },
        acceptable: {
            total: 1,
            params: [
                { name: "Occupants", score: 49.68553459 },
            ]
        },
        good: {
            total: 0,
            params: []
        }
    },
    {
        name: "Roads Score",
        description: "A metric assessing the quality, safety, and efficiency of roads within a specific area or region. Factors such as road condition, traffic congestion, signage, infrastructure maintenance, and accident rates are considered in determining the road score. This score provides valuable insights for travelers, urban planners, and policymakers to improve transportation systems and enhance road safety.",
        value: 34.41,
        poor: {
            total: 3,
            params: [
                { name: "Type of Road Score", score: 27.31958763 },
                { name: "Lane Markings Score", score: 20 },
                { name: "Parking on Road Score", score: 31.70984456 },
            ]
        },
        acceptable: {
            total: 5,
            params: [
                { name: "Road Motorable Space Score", score: 38.27586207 },
                { name: "Surface Quality Score", score: 53.76623377 },
                { name: "Repair Quality Score", score: 50 },
                { name: "Blacktop Quality Score", score: 40 },
                { name: "Cycling Infrastructure Score", score: 50 },
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
        <div className='w-full p-2 sm:p-0 min-h-[100vh]'>
            <div className='md:space-y-[100px] space-y-[20px] relative w-full sm:p-4'>
                <div id='overall' className='w-full section md:flex items-center md:space-x-6 space-y-2 md:space-y-0'>
                    <OverAllScoreComponent score={28.87} good={2} acceptable={10} poor={11} />
                    <IndividualScores scores={scores} include_sdg={true} />
                </div>
                <div id='deepDive' className='w-full section md:flex items-center space-y-2 md:space-y-0 justify-between'>
                    <MapAnalysis />
                    <MapComponent />
                </div>
                <div id='actionItems' className='w-full section md:flex items-center space-y-2 md:space-y-0 justify-between'>
                    <LineBarCombination />
                    <ActionCard />
                </div>
                <div
                    id='wardTable'
                    className='
                    hidden
                    w-full section sm:flex sm:items-center 
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