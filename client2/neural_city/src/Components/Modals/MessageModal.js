import React from 'react'
import { Box, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import MessageForm from '../Forms/MessageForm';
import FormModal from './FormModal';
function MessageModal({ handleClose, open }) {
    return (
        <FormModal
            heading={`Message`}
            open={open}
            onClose={handleClose}
        >
            <div className='w-[100%] h-[100%] flex items-center justify-center'>
                <div className='shadow-lg rounded-lg z-[1000] bg-white w-[50%]'>
                    <div className='flex items-center justify-between py-2 px-4 rounded-t-lg border-b bg-gray-100'>
                        <h1 className='text-center text-2xl font-bold'> Message </h1>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <MessageForm/>
                </div>
            </div>
        </FormModal>
    )
}

export default MessageModal