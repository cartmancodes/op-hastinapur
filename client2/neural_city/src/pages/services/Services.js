import React from 'react'
import DashBoardNav from '../../Components/DashBoardNav'
import { Outlet } from 'react-router';
import Sidebar from '../../Components/Utility/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
function Services() {
  let navItems = [
    {
      name: "Monitering",
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
  ]
  return (
    <div className='bg-white brightness-50 w-full space-y-2'>
      <DashBoardNav items={navItems} include_date={true}></DashBoardNav>
      <div className='flex relative'>
        <Sidebar items={sidebaritems} />
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Services