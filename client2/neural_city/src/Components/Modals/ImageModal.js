import React from 'react'
import { Box, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ReactImageZoom from 'react-image-zoom';

function ImageModal({ handleClose, imgsrc, open }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='w-[100%] h-[100%] flex items-center justify-center'>
                <div className='shadow-lg rounded-lg z-[1000] bg-white w-fit'>
                    <div className='flex items-center justify-between py-2 px-4 rounded-t-lg border-b bg-gray-100'>
                        <h1 className='text-center text-2xl font-bold'> Image </h1>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='p-4'>
                        <ReactImageZoom zoomWidth={500} img={`${imgsrc}`} height={400} width={500} className='w-100 h-100 cursor-pointer' />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ImageModal