import React from 'react'
import DashBoardNav from '../../Components/Global/DashBoardNav'
import { Outlet } from 'react-router';
import Sidebar from '../../Components/Global/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import { Traffic } from '@mui/icons-material';
function Services() {
  let navItems = [
    {
      name: "Monitoring",
      path_link: "/services/monitering",
      curr_path: "monitering"
    },
    
  ]

  let sidebaritems = [
    {
      icon: <HomeIcon></HomeIcon>,
      title: "Home",
      path_link: "/services/monitering",
      curr_path: null
    },
    {
      icon: <Traffic></Traffic>,
      title: "Traffic",
      path_link: "/services/monitering/traffic",
      curr_path: "traffic"
    },
  ]
  return (
    <div className='bg-purple-50 font-sans bg-opacity-25 w-full space-y-2 grayscale'>
      <DashBoardNav items={navItems} include_date={true}></DashBoardNav>
      <div className='min-h-[100vh] rounded-lg w-full p-2 flex relative'>
        <Sidebar items={sidebaritems} />
        <Outlet/>
      </div> 
    </div>
  )
}

export default Services