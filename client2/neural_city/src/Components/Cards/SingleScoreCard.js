import React from 'react'

function SingleScoreCard({desc,color,value}) {
  return (
    <div className='p-4 w-[350px] rounded-xl shadow-sm text-black bg-white border border-gray-200'>
        <p className='text-center'>{desc}</p>
        <p className='font-bold text-2xl text-center'><span className={value <= 45 ? 'text-red-500' : value <= 65 ? 'text-blue-600' : 'text-green-600'}>{value}</span></p>
    </div>
  )
}

export default SingleScoreCard