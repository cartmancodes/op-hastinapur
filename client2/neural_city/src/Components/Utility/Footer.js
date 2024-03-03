import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className='
                      justify-center items-center space-x-[60px]
                      flex p-4
                    text-blue-600
                    bg-gray-100'
    >
      <Link className = "underline">About Us</Link>
      <Link className = "underline">Privacy Policy</Link>
      <Link className = "underline">Terms And Conditions</Link>
    </footer>
  )
}

export default Footer