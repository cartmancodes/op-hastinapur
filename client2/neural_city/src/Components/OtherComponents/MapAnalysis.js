import React from 'react'
import AreaChartMonthly from '../Charts/AreaChartMonthly'


const mockData = [
    {
        name: "Cleaniness",
        monthlyData: [38, 72, 14, 65, 83],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Garbage and Litter",score: 57,change: 1.3},
            {name:"Dust",score: 47,change: -1.3},
            {name:"Drain",score: 33,change: 2.3}
        ],
        colors: ["#039be5","#b3e5fc","#e1f5fe"]
    },
    {
        name: "Enchroachment",
        monthlyData: [79, 55, 42, 88, 33],
        score: 56,
        change: -1.4,
        topParams: [
            {name:"General  Encroachment",score: 45,change: 3},
            {name:"Encroachment by Whom",score: 67,change: -2.3},
        ],
        colors: ["#00897b","#b2dfdb","#e0f2f1"]
    },
    {
        name: "Walkability",
        monthlyData: [76, 29, 84, 49, 17],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Sidewalk Availability",score: 57,change: 1.3},
            {name:"Sidewalk Usability",score: 47,change: -1.3},
            {name:"Walking Space",score: 33,change: 2.3}
        ],
        colors: ["#8e24aa","#e1bee7","#f3e5f5"]
    },
    {
        name: "Roads",
        monthlyData: [47, 82, 61, 94, 39],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Surface Quality",score: 57,change: 1.3},
            {name:"Repair Quality",score: 47,change: -1.3},
            {name:"Type of Road",score: 33,change: 2.3}
        ],
        colors: ["#6d4c41","#d7ccc8","#efebe9"]
    }
]
export default function MapAnalysis() {

    return (
        <div className="md:w-[49%] w-[100%] rounded-sm bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] space-y-2">
            <div className='text-xl sm:p-2 sm:py-3 p-2 border-b font-bold'>Ward Name</div>
            <div className='md:grid sm:p-2 sm:py-4 gap-y-8 p-2 md:grid-cols-2 gap-2'>
                {
                    mockData.map((dat) => {
                        return <AreaChartMonthly data={dat}/>
                    })
                }
            </div>
        </div>
    )
}
