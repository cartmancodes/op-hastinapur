import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SubScoreTable from './SubScoreTable';
import { useState } from 'react';


function IndividualScoreCard({ score,parameter }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [scores,setScores] = useState([]);
    return (
        <div className='bg-white rounded-lg 
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                        p-4
                        flex-[1/3]
                        space-y-4'
        >
            <div className='flex items-center justify-between'>
                <h1 className='text-gray-500'>{score.name}</h1>
                <h1 className='text-green-800 font-bold text-2xl'>{score.value}</h1>
            </div>

            <div className='flex w-[100%] item-center justify-center'>
                <div className='flex flex-col items-center justify-center border-r p-2 w-[33%]'>
                    <p onClick={() => {
                        setScores(score.poor.params);
                        handleOpen();
                    }} className='text-lg font-bold text-red-500 cursor-pointer hover:text-red-900'>{score.poor.total}</p>
                    <p className='text-gray-400'>Poor</p>
                </div>
                <div className='flex flex-col items-center justify-center  border-r p-2 w-[33%]'>
                    <p onClick={() => {
                        setScores(score.acceptable.params);
                        handleOpen();
                    }} className='text-lg font-bold text-blue-500 cursor-pointer hover:text-blue-900'>{score.acceptable.total}</p>
                    <p className='text-gray-400'>Acceptable</p>
                </div>
                <div className='flex flex-col items-center justify-center  p-2 w-[33%]'>
                    <p onClick={() => {
                        setScores(score.good.params);
                        handleOpen();
                    }} className='text-lg font-bold text-green-500 cursor-pointer hover:text-green-900'>{score.good.total}</p>
                    <p className='text-gray-400'>Good</p>
                </div>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div className='z-[10000] bg-white p-4 shadow-lg w-[40%] rounded-lg absolute top-[30%] left-[30%]'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-xl font-bold'>{parameter}</h1>
                            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                        </div>
                        <hr/>
                        <SubScoreTable scores={scores}/>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default IndividualScoreCard