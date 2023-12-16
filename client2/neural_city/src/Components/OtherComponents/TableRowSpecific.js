import React, { useState } from 'react'
import {
    IconButton, TableCell, TableRow, Button
    , Modal, Box, TextField, FormControl, InputLabel, MenuItem, Select,

} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import ReactImageZoom from 'react-image-zoom'
function TableRowSpecific(props) {
    const formModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const ImageModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const informAuthority = () => {
        alert("Your Response Has been sent");
    }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [openFormModal, setOpenFormModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);
    let row = props.row;
    console.log(row);
    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>{props.idx + 1}</TableCell>
                <TableCell>{row.ward}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                    <IconButton onClick={() => setOpenVideoModal(true)}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                    <Button variant='contained' onClick={() => setOpenFormModal(true)}>Inform Authority</Button>
                </TableCell>
            </TableRow>
            <Modal
                open={openFormModal}
                onClose={() => { setOpenFormModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={formModalStyle} className='space-y-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>Inform Authority</h1>
                        <IconButton onClick={() => setOpenFormModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <form className='space-y-2 flex flex-col'>
                        <TextField value={name}
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            value={email}
                            label="Email"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            multiline
                            minRows={4}
                            label="Message"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button onClick={informAuthority} variant='contained'>Send Response</Button>
                    </form>
                </Box>
            </Modal>

            <Modal
                open=
                {openVideoModal}
                onClose={() => { setOpenVideoModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={ImageModalStyle} className='space-y-6'>

                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>Image</h1>
                        <IconButton onClick={() => setOpenVideoModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <ReactImageZoom zoomWidth={800} img={`/images/${row.file_name}`} height={400} width={500} className='w-100 h-100 cursor-pointer' />
                </Box>
            </Modal>
        </>

    )
}

export default TableRowSpecific