import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='rounded-lg mx-6 shadow-md 
    justify-center items-center space-x-6 
    flex mb-4 p-2 w-[97%]
    text-blue-600'>
        <Link>About Us</Link>
        <Link>Privacy Policy</Link>
        <Link>Terms And Conditions</Link>
    </div>
  )
}

export default Footer