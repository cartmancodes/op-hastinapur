import React from 'react'
import CountUp from 'react-countup'

function ParameterCard({ parameter_value, parameter_name }) {
  let class1 = "text-[red]";
  let class2 = "text-[orange]";
  let class3 = "text-[green]";
  return (
    <div className="p-4 w-full bg-white border border-gray-300 rounded-2xl shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
        {parameter_name}
      </p>
      <p className="text-2xl font-bold text-black">
        {(typeof parameter_value === 'number' && parameter_name != "Datapoints Collected") ? <div className={parameter_value <= 35 ? class1 : parameter_value <= 70 ? class2 : class3}><CountUp start={0} end={parameter_value} duration={2.5} separator="," /> </div> : <div>{parameter_value}</div>}
      </p>
    </div>

  )
}

export default ParameterCard