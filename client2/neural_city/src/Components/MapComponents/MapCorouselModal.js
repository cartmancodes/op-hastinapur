import React from 'react'
import CourouselComponentMap from '../Corousel/CourouselComponentMap';
import { Modal } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
function MapCorouselModal({ ward_name, handleCorouselClose, handleCorouselOpen, corouselOpen,datapoints }) {
    const [filter,setFilter] = useState('cleaniness');
    const [condition,setCondition] = useState('poor');
    let sectionActive = 'py-2 px-2 text-md rounded-lg bg-blue-600 text-white font-bold';
    let sectionActiveConditionPoor = 'py-2 text-md px-2 rounded-lg bg-red-600 text-white font-bold';
    let sectionActiveConditionAcc = 'py-2 text-md px-2 rounded-lg bg-blue-600 text-white font-bold';
    let sectionActiveConditionGood = 'py-2 text-md px-2 rounded-lg bg-green-600 text-white font-bold';
    let sectionInactive = 'py-2 px-2 text-md';
    return (
        <div>
            <Modal
                open={corouselOpen}
                onClose={handleCorouselClose}
            >
                <div className='z-[10000] bg-white pb-0 shadow-lg sm:w-[65%] w-[98%] rounded-lg absolute top-[5%] left-[20%]'>
                    <div className='flex items-center p-2 justify-between'>
                        <h1 className='text-xl font-bold'>{ward_name}</h1>
                        <IconButton onClick={handleCorouselClose}><CloseIcon /></IconButton>
                    </div>
                    <hr />
                    <div className='w-full py-2 px-4 flex items-center justify-between'>
                        <div className='border hidden md:flex shadow-card justify-end rounded-lg'>
                            <h1 className='text-center p-2 border-r font-bold text-gray-500'>Filter</h1>
                            <div onClick={() => setFilter('cleaniness')} className={filter == 'cleaniness' ? sectionActive : sectionInactive}>Cleaniness(6)</div>
                            <div onClick={() => setFilter('enchroachment')} className={filter == 'enchroachment' ? sectionActive : sectionInactive}>Enchroachment(5)</div>
                            <div onClick={() => setFilter('road')} className={filter == 'road' ? sectionActive : sectionInactive}>Road(4)</div>
                            <div onClick={() => setFilter('walkability')} className={filter == 'walkability' ? sectionActive : sectionInactive}>Walkability(3)</div>
                        </div>

                        <div className='border hidden md:flex shadow-card justify-end rounded-lg'>
                            <h1 className='text-center p-2 border-r font-bold text-gray-500'>Condition</h1>
                            <div onClick={() => setCondition('poor')} className={condition == 'poor' ? sectionActiveConditionPoor : sectionInactive}>Poor</div>
                            <div onClick={() => setCondition('acceptable')} className={condition == 'acceptable' ? sectionActiveConditionAcc : sectionInactive}>Acceptable</div>
                            <div onClick={() => setCondition('good')} className={condition == 'good' ? sectionActiveConditionGood : sectionInactive}>Good</div>
                        </div>
                    </div>
                    <hr/>
                    <div className='p-2'>
                        <CourouselComponentMap datapoints={datapoints}/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MapCorouselModal