import React from 'react'
import MapComponent from '../../Components/MapComponents/Map';
import OverAllScoreComponent from '../../Components/OtherComponents/OverAllScoreComponent';
import IndividualScores from '../../Components/OtherComponents/IndividualScores';
import LineBarCombination from '../../Components/Charts/LineBarCombination';
import ActionCard from '../../Components/OtherComponents/ActionCard';
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
                { name: "Garbage and Litter", score: 30 },
                { name: "Tobbaco spit", score: 28 },
                { name: "Dust Score", score: 26 },
                { name: "Drain Score", score: 28.67 },
            ]
        },
        acceptable: {
            total: 2,
            params: [
                { name: "Dustbins/Dumpsters Score", score: 60 },
                { name: "Toilet/Urination Score", score: 54 }
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
            total: 3,
            params: [
                { name: "Construction Material Score", score: 30 },
                { name: "Sidewalk Usability Score", score: 28 },
                { name: "Parking on Sidewalk Score", score: 28 }
            ]
        },
        acceptable: {
            total: 3,
            params: [
                { name: "Street Furniture and Amenities Score", score: 60 },
                { name: "Sidewalk Availability Score", score: 54 },
                { name: "Walking Space Score", score: 54 }
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
                { name: "General  Encroachment Score", score: 30 },
            ]
        },
        acceptable: {
            total: 1,
            params: [
                { name: "Encroachment by Whom Score", score: 60 },
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
            total: 2,
            params: [
                { name: "Type of Road Score", score: 30 },
                { name: "Lane Markings Score", score: 28 }
            ]
        },
        acceptable: {
            total: 6,
            params: [
                { name: "Road Motorable Space Score", score: 60 },
                { name: "Surface Quality Score", score: 54 },
                { name: "Repair Quality Score", score: 54 },
                { name: "Blacktop Quality Score", score: 54 },
                { name: "Parking on Road Score", score: 54 },
                { name: "Cycling Infrastructure Score", score: 54 },
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
        <div className='w-full min-h-[100vh]'>
            <div className='md:space-y-[100px] space-y-[20px] relatives w-full sm:p-4'>
                <div id='overall' className='w-full section md:flex items-center md:space-x-6 space-y-2 md:space-y-0'>
                    <OverAllScoreComponent score={28.87} good={"-"} acceptable={12} poor={10} />
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