import React from 'react'
import { Popup } from 'react-leaflet'
import { useState } from 'react';
import { Modal,Box,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function MapPopup(props) {
    let vsrc = props.vsrc;
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const VideoModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };
    return (
        <div>
            <Popup>
                <img
                    onClick={() => setOpenVideoModal(true)}
                    src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                />
            </Popup>
            <Modal
                open=
                {openVideoModal}
                onClose={() => { setOpenVideoModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={VideoModalStyle} className='space-y-6'>

                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>Footage</h1>
                        <IconButton onClick={() => setOpenVideoModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <video className='w-full' controls autoPlay>
                        <source src={vsrc}></source>
                    </video>
                </Box>
            </Modal>

        </div>

    )
}

export default MapPopup