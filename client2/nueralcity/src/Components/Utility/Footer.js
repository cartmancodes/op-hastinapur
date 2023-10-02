import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className='rounded-lg shadow-lg 
    justify-center items-center space-x-6 
    flex p-4
    text-blue-600'>
        <Link>About Us</Link>
        <Link>Privacy Policy</Link>
        <Link>Terms And Conditions</Link>
    </footer>
  )
}

export default Footer