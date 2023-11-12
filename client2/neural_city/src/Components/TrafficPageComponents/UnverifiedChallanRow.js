import React, { useState } from 'react'
import {
    IconButton, TableCell, TableRow, Button
    , Modal, Box, TextField, FormControl, InputLabel, MenuItem, Select,

} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';

function UnverifiedChallanRow(props) {
    const formModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const VideoModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const [openFormModal, setOpenFormModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    let row = props.row;
    console.log(row);
    const [rno, setRno] = useState(row.rno);
    const [type, setType] = useState(row.type);
    const [vsrc, setVsrc] = useState(row.vsrc);
    const [rlv, setRlv] = useState(row.rlv);
    const [dnt, setDnt] = useState(row.dnt);
    const [speed, setSpeed] = useState(row.speed);

    const verifyDetails = () => {

    }

    const takeAction = () => {
        
    }

    const editDetails = () => {
        setOpenFormModal(true);
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                <TableCell>{rno}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{dnt}</TableCell>
                <TableCell>
                    <IconButton onClick={() => setOpenVideoModal(true)}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </TableCell>
                <TableCell>
                    {speed}
                </TableCell>
                <TableCell>{rlv}</TableCell>
                <TableCell>
                    <Button onClick={verifyDetails} variant='contained' color='success'>Verify</Button>
                </TableCell>

                <TableCell>
                    <Button onClick={takeAction} variant='contained' color='success'>Take Action</Button>
                </TableCell>

                <TableCell>
                    <Button onClick={editDetails} variant='contained' color='error'>Edit</Button>
                </TableCell>
            </TableRow>
            <Modal
                open={openFormModal}
                onClose={() => { setOpenFormModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={formModalStyle} className='space-y-6 sm:w-[50%] w-[100%]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>Update Vehicle Details</h1>
                        <IconButton onClick={() => setOpenFormModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <form className='space-y-2'>
                        <TextField className='w-[100%]' variant='outlined' label='Registration Number' value={rno}
                            onChange={(e) => {
                                setRno(e.target.value)
                            }}
                        />

                        <TextField className='w-[100%]' variant='outlined' label='Speed' value={speed}
                            onChange={(e) => {
                                setSpeed(e.target.value)
                            }}
                        />

                        <TextField className='w-[100%]' variant='outlined' label='Registration Number' value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Red Light Violation</InputLabel>
                            <Select
                                value={rlv}
                                label="Red Light Violation"
                                onChange={(e) => {
                                    setRlv(e.target.value);
                                }}
                            >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={() => setOpenFormModal(false)} className="w-full" variant='contained'>
                            Verify Details
                        </Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open=
                {openVideoModal}
                onClose={() => { setOpenVideoModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={VideoModalStyle} className='space-y-6 sm:w-[50%] w-[100%]'>

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
        </>

    )
}

export default UnverifiedChallanRow