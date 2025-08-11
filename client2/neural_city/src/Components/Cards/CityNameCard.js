import React from 'react'

function CityNameCard({ parameter_value, parameter_name }) {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-2xl shadow-sm">
      <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mb-1">
        {parameter_name}
      </p>
      <p className="text-3xl font-bold text-blue-600">
        {parameter_value}
      </p>
    </div>

  )
}

export default CityNameCard