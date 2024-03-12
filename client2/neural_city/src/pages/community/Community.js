import React from 'react'
import YojanaTable from '../../Components/OtherComponents/YojanaTable'
import DashBoardNav from '../../Components/DashBoardNav';
import {Outlet} from 'react-router-dom'
function Community() {
  let navItems = [
    {
      name: "NGO Citizens/Group",
      path_link: "/community/group",
      curr_path: "group"
    },
    {
      name: "Projects",
      path_link: "/community/projects",
      curr_path: "projects"
    },
    {
      name: "Citizen Poll",
      path_link: "/community/poll",
      curr_path: "poll"
    },
    {
      name: "Moniter Coummunity Projects",
      path_link: "/community/moniter_project",
      curr_path: "moniter_project"
    },
  ]
  return (
    <div className='bg-rose-50 min-h-[100vh] bg-opacity-25 w-full space-y-2'>
      <DashBoardNav items={navItems}></DashBoardNav>
      <div className='flex relative'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Community