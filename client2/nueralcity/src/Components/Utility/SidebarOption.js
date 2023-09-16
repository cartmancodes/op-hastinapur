import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ApartmentIcon from '@mui/icons-material/Apartment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
function SidebarOption(props) {
    const [hiddenOptions,sethiddenOptions] = useState((Boolean)(true));
    return (
        <div className='w-[17vw] flex flex-col items-center justify-between'>
            <div className='w-[17vw] flex items-center justify-between'>
                {props.icon === 'Home' ? <HomeIcon color='primary'></HomeIcon> :
                    props.icon === 'Apartment' ? <ApartmentIcon color='primary' />
                        : <DirectionsCarIcon color='primary' />}
                <p className='text-[15px] font-bold'>{props.name}</p>
                <IconButton onClick={() => sethiddenOptions(!hiddenOptions)}>
                    <KeyboardArrowDownIcon />
                </IconButton>
            </div>
            {!hiddenOptions ? <div className='w-full p-2 bg-gray-200 rounded-lg space-y-4 mt-2'>
                {
                    props.optionList.map(option => {
                        return <li className='text-[15px]'>{option}</li>
                    })
                }
            </div> : <></>}
        </div>
    )
}

export default SidebarOption