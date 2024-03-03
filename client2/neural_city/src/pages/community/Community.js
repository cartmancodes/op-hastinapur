import React from 'react'
import YojanaTable from '../../Components/OtherComponents/YojanaTable'
import DashBoardNav from '../../Components/DashBoardNav';
import {Outlet} from 'react-router-dom'
function Community() {
  let navItems = [
    {
      name: "NGO Citizens/Group",
      path_link: "/coummunity/group",
      curr_path: "group"
    },
    {
      name: "Projects",
      path_link: "/coummunity/projects",
      curr_path: "projects"
    },
    {
      name: "Citizen Poll",
      path_link: "/coummunity/poll",
      curr_path: "poll"
    },
    {
      name: "Moniter Coummunity Projects",
      path_link: "/coummunity/moniter_projects",
      curr_path: "moniter_projects"
    },
  ]
  return (
    <div className='bg-rose-50 bg-opacity-50 w-full space-y-2'>
      <DashBoardNav items={navItems}></DashBoardNav>
      <div className='flex relative'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Community