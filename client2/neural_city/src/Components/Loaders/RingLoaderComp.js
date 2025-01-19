import React from 'react'
import { RingLoader } from 'react-spinners'

function RingLoaderComp() {
  return (
    <div className='w-full h-full items-center justify-center flex'>
      <div><RingLoader color={"#A020F0"}/></div>
    </div>
  )
}

export default RingLoaderComp