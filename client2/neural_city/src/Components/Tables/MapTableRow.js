import React, { useState } from 'react'
import {
    IconButton, TableCell, TableRow, Button
    , Modal, Box, TextField, FormControl, InputLabel, MenuItem, Select,

} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import ReactImageZoom from 'react-image-zoom'
import ImageModal from '../Modals/ImageModal';
import FormModal from '../Modals/FormModal';
function DataGridRow(props) {
    const informAuthority = () => {
        alert("Your Response Has been sent");
    }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [openFormModal, setOpenFormModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);

    const handleVideoModalOpen = () => setOpenVideoModal(true);
    const handleVideoModalClose = () => setOpenVideoModal(false);

    const handleFormModalOpen = () => setOpenFormModal(true);
    const handleFormModalClose = () => setOpenFormModal(false);
    let row = props.row;
    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align='center'>{props.idx + 1}</TableCell>
                <TableCell align='center'>{row.ward}</TableCell>
                <TableCell align='center'>{row.score}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell align='center'>
                    <IconButton color='primary' onClick={() => setOpenVideoModal(true)}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </TableCell>
                
                <TableCell align='center'>
                    <Button variant='contained' onClick={handleFormModalOpen}>Inform Authority</Button>
                </TableCell>
            </TableRow>
            <FormModal
                open={openFormModal}
                handleClose={handleFormModalClose}
                heading={`Inform Authority`}
            >
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

            </FormModal>

            <ImageModal open={openVideoModal} handleClose={handleVideoModalClose} imgsrc={`/images/${row.file_name}`} />
        </>

    )
}

export default DataGridRow