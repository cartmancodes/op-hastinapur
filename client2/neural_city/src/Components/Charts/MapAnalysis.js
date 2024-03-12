import React from 'react'
import AreaChartMonthly from './AreaChartMonthly'
import InfoButton from '../OtherComponents/InfoButton'


const mockData = [
    {
        name: "Cleaniness",
        monthlyData: [38, 72, 14, 65, 83],
        score: 21.46,
        change: 2.4,
        topParams: [
            {name:"Garbage and Litter",score: 57,change: 1.3},
            {name:"Dust",score: 47,change: -1.3},
            {name:"Drain",score: 33,change: 2.3}
        ],
        colors: ["#D4A1F9","#F3E2FD","#280771"]
    },
    {
        name: "Public Space",
        monthlyData: [79, 55, 42, 88, 33],
        score: 37.05,
        change: -1.4,
        topParams: [
            {name:"General  Encroachment",score: 45,change: 3},
            {name:"Encroachment by Whom",score: 67,change: -2.3},
        ],
        colors: ["#22C55E","#F0FDF4","#14532D"]
    },
    {
        name: "Walkability",
        monthlyData: [76, 29, 84, 49, 17],
        score: 24.92,
        change: 2.4,
        topParams: [
            {name:"Sidewalk Availability",score: 57,change: 1.3},
            {name:"Sidewalk Usability",score: 47,change: -1.3},
            {name:"Walking Space",score: 33,change: 2.3}
        ],
        colors: ["#8e24aa","#EFF6FF","#1E3A8A"]
    },
    {
        name: "Roads",
        monthlyData: [47, 82, 61, 94, 39],
        score: 34.41,
        change: 2.4,
        topParams: [
            {name:"Surface Quality",score: 57,change: 1.3},
            {name:"Repair Quality",score: 47,change: -1.3},
            {name:"Type of Road",score: 33,change: 2.3}
        ],
        colors: ["#6d4c41","#FFFBEB","#713F12"]
    }
]
export default function MapAnalysis() {
    const toolTipText = "This graph depicts key metrics related to urban quality, including cleanliness index, public space compliance rate, and walkability score. It tracks parameters such as waste management efficiency, incidents of vandalism, road condition assessments, and pedestrian-friendly infrastructure initiatives. These metrics offer insights into the overall livability and functionality of urban environments, aiding decision-makers in formulating effective strategies for improvement";
    return (
        <div className="md:w-[49%] w-[100%] rounded-sm bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] space-y-2">
            <div className='flex items-center space-x-2 text-xl sm:p-3 sm:py-3 p-2 border-b font-bold'>Parameter Overview<InfoButton text={toolTipText}></InfoButton></div>
            <div className='sm:grid sm:p-2 sm:py-4 gap-y-8 p-2 sm:grid-cols-2 gap-2'>
                {
                    mockData.map((dat) => {
                        return <AreaChartMonthly data={dat}/>
                    })
                }
            </div>
        </div>
    )
}
