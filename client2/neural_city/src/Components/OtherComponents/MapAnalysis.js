import React from 'react'
import AreaChartMonthly from '../Charts/AreaChartMonthly'


const mockData = [
    {
        name: "Cleaniness",
        monthlyData: [38, 72, 14, 65, 83, 45, 92, 27, 51, 96, 63, 20],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Garbage and Litter",score: 57,change: 1.3},
            {name:"Dust",score: 47,change: -1.3},
            {name:"Drain",score: 33,change: 2.3}
        ]
    },
    {
        name: "Enchroachment",
        monthlyData: [79, 55, 42, 88, 33, 71, 15, 97, 52, 86, 26, 69],
        score: 56,
        change: -1.4,
        topParams: [
            {name:"General  Encroachment",score: 45,change: 3},
            {name:"Encroachment by Whom",score: 67,change: -2.3},
        ]
    },
    {
        name: "Walkability(Sidewalk)",
        monthlyData: [76, 29, 84, 49, 17, 67, 98, 36, 81, 54, 19, 73],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Sidewalk Availability",score: 57,change: 1.3},
            {name:"Sidewalk Usability",score: 47,change: -1.3},
            {name:"Walking Space",score: 33,change: 2.3}
        ]
    },
    {
        name: "Roads",
        monthlyData: [47, 82, 61, 94, 39, 75, 58, 11, 34, 68, 23, 91],
        score: 67,
        change: 2.4,
        topParams: [
            {name:"Surface Quality",score: 57,change: 1.3},
            {name:"Repair Quality",score: 47,change: -1.3},
            {name:"Type of Road",score: 33,change: 2.3}
        ]
    }
]
export default function MapAnalysis() {

    return (
        <div className="h-[700px] w-[49%] p-4 rounded-lg shadow-md space-y-2">
            <h1 className='text-xl font-bold'>Ward Name</h1>
            <div className='grid grid-cols-2 gap-2'>
                {
                    mockData.map((dat) => {
                        return <AreaChartMonthly data={dat}/>
                    })
                }
            </div>
        </div>
    )
}
