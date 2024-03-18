import React from 'react'
import { Box, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function FormModal({ heading, handleClose, open, children }) {
  return (
    <Modal
      sx = {{width:'100vw'}}
      open={open}
      onClose={handleClose}
    >
      <div className='w-[100%] h-[100%] flex items-center justify-center'>
        <div className='shadow-lg rounded-lg z-[1000] bg-white w-[98%] sm:w-[40%]'>
          <div className='flex items-center justify-between py-2 px-4 rounded-t-lg border-b bg-gray-100'>
            <h1 className='text-center text-2xl font-bold'> {heading} </h1>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='p-4 w-[100%]'>
            {children}
          </div>
        </div>
      </div>
    </Modal >
  )
}

export default FormModal