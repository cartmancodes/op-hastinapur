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
    <div className='bg-white relative grayscale w-full space-y-2'>
      <DashBoardNav items={navItems} include_date={true}></DashBoardNav>
      <div className='flex relative'>
        <Sidebar items={sidebaritems} />
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Services