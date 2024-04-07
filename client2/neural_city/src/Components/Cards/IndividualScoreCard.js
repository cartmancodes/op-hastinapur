import * as React from 'react';
import SubScoreTable from '../Tables/SubScoreTable';
import { useState } from 'react';
import InfoButton from '../ui/InfoButton';
import FormModal from '../Modals/FormModal';


function IndividualScoreCard({ score,parameter }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [scores,setScores] = useState([]);
    return (
        <div className='bg-white rounded-lg 
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                        sm:p-4
                        p-2
                        flex-[1/3]
                        space-y-4'
        >
            
            <div className='flex items-center justify-between'>
                <div className='text-black text-lg flex items-center '>{score.name}<span><InfoButton text={score.description}/></span></div>
                <h1 style={{color : score.value < 35 ? "#FF0000" : score.value < 70 ? "#0000FF" : "#008000"}} className='font-bold text-2xl'>{score.value}</h1>
            </div>

            <div className='flex w-[100%] item-center justify-center'>
                <div className='flex flex-col items-center justify-center border-r sm:p-2 w-[33%]'>
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
                    <p className='text-gray-400'>Manageable</p>
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
                <FormModal
                    open={open}
                    handleClose={handleClose}
                    heading={`${parameter}`}
                >
                    <SubScoreTable scores={scores}/>
                </FormModal>
            </div>
        </div>
    )
}

export default IndividualScoreCard