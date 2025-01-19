import React from 'react'
import AreaChartMonthly from './AreaChartMonthly'
import InfoButton from '../ui/InfoButton'



export default function MapAnalysis({scores}) {
    const toolTipText = "This graph depicts key metrics related to urban quality, including cleanliness index, public space compliance rate, and walkability score. It tracks parameters such as waste management efficiency, incidents of vandalism, road condition assessments, and pedestrian-friendly infrastructure initiatives. These metrics offer insights into the overall livability and functionality of urban environments, aiding decision-makers in formulating effective strategies for improvement";
    const mockData = [
        {
            name: "Cleaniness",
            monthlyData: [38, 72, 14, 65, 83],
            score: scores.cleaniness_score,
            change: 2.4,
            topParams: [
                {name:"Garbage and Litter",score: 57,change: 1.3},
                {name:"Dust",score: 47,change: -1.3},
                {name:"Drain",score: 33,change: 2.3}
            ],
            colors: ["#FEF2F2","#FECACA","#7F1D1D"]
        },
        {
            name: "Public Space",
            monthlyData: [79, 55, 42, 88, 33],
            score: scores.public_space_utilization,
            change: -1.4,
            topParams: [
                {name:"General  Occupation",score: 45,change: 3},
                {name:"Occupants",score: 67,change: -2.3},
            ],
            colors: ["#F0FDF4","#BBF7D0","#14532D"]
        },
        {
            name: "Walkability",
            monthlyData: [76, 29, 84, 49, 17],
            score: scores.walkability_score,
            change: 2.4,
            topParams: [
                {name:"Sidewalk Availability",score: 57,change: 1.3},
                {name:"Sidewalk Usability",score: 47,change: -1.3},
                {name:"Walking Space",score: 33,change: 2.3}
            ],
            colors: ["#EFF6FF","#BFDBFE","#1E3A8A"]
        },
        {
            name: "Roads",
            monthlyData: [47, 82, 61, 94, 39],
            score: scores.road_score,
            change: 2.4,
            topParams: [
                {name:"Surface Quality",score: 57,change: 1.3},
                {name:"Repair Quality",score: 47,change: -1.3},
                {name:"Blacktop Quality Score",score: 33,change: 2.3}
            ],
            colors: ["#FFFBEB","#FDE68A","#713F12"]
        }
    ]
    return (
        <div className="md:w-[49%] w-[100%] hidden sm:block rounded-sm bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-2 border-b font-bold'>Parameter Overview<InfoButton text={toolTipText}></InfoButton></div>
            <div className='sm:grid bg-gray sm:p-2 sm:py-4 gap-y-8 p-2 sm:grid-cols-2 gap-2'>
                {
                    mockData.map((dat) => {
                        return <AreaChartMonthly data={dat}/>
                    })
                }
            </div>
        </div>
    )
}
