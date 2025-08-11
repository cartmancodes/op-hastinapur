import React, { useState } from 'react'
import { Modal } from '@mui/material'
import Typography from '@mui/material'
import Box from '@mui/material'

function OtherScoreCard({ score_name, national, city_score, image_link, header_color, body_color }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>

            <div style={{ backgroundColor: body_color }} onClick={() => {
                setOpen(true);
            }} className="p-4 space-y-6 w-[200px] cursor-pointer border-white rounded-xl min-h-[154px]">

                <div className="flex space-x-8 justify-between items-start">
                    <div className="space-y-2 space-x-6 justify-between flex text-gray-600 font-medium ">
                        <div>
                            <img src={image_link} className='invert brightness-0 h-[50px] w-[50px]' />
                        </div>

                        <div>
                            <p className='text-3xl font-bold text-white'>{city_score.toFixed(2)}</p>
                        </div>

                    </div>
                </div>

                <p className="text-md font-semibold text-white mb-4">{score_name}</p>


            </div>

            <Modal
                onClose={handleClose}
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{ backgroundColor: body_color }} className='h-[300px] w-[300px] space-y-6 rounded-lg border-0 absolute top-[300px] left-[40%] '>
                    <div className='border-b p-4'>
                        <p className='text-white font-bold text-center'>{score_name}</p>
                    </div>

                    <div className="space-y-2 p-4 space-x-6 justify-center items-center flex text-gray-600 font-medium ">
                        <div>
                            <img src={image_link} className='invert brightness-0 h-[50px] w-[50px]' />
                        </div>

                        <div>
                            <p className='text-3xl font-bold text-white'>{city_score.toFixed(2)}<span className='text-xl'> out of 100</span></p>
                        </div>

                    </div>

                    <div className='flex justify-between px-8 text-white items-center'>
                        <div className='text-center'>
                            <p className='font-bold text-xl'>{national}</p>
                            <p className='font-bold text-sm'>Indian Average</p>
                        </div>

                        <div className='text-center'>
                            <p className='font-bold text-xl'>10%</p>
                            <p className='font-bold text-sm'>QoQ</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default OtherScoreCard