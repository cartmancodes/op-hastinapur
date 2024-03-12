import React from 'react'
import GroupTable from '../../Components/Tables/GroupTable'

function GroupsPage() {
  return (
    <div className='min-h-[80vh] w-[100%] p-4 space-y-4'>
        <h1 className='text-2xl underline font-bold'>NGO Group/Citizens</h1>
        <GroupTable/>
    </div>
  )
}

export default GroupsPage