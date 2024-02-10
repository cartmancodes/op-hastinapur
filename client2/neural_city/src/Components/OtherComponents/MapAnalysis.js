import React from 'react'
import AreaChartMonthly from '../Charts/AreaChartMonthly'

export default function MapAnalysis() {
  return (
    <div className="h-[680px] w-[49%] p-4 rounded-lg shadow-md space-y-8">
        <h1 className='text-4xl font-bold'>CityX</h1>
        <AreaChartMonthly/>
    </div>
  )
}
