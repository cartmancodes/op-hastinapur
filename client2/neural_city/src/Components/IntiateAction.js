import React from 'react'
import MapTable from './OtherComponents/DataGrid';
import CorouselComponent from './OtherComponents/CorouselCompent';

function IntiateAction() {
  return (
    <div className='space-y-[60px]'>
      <CorouselComponent/>
      <MapTable/>
    </div>
  )
}

export default IntiateAction