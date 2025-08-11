import React, { useState } from 'react'
import {
    IconButton, TableCell, TableRow, Button
    , Modal, Box, TextField
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
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

    const informAuthority = () => {
        alert("Your Response Has been sent");
    }
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);

    const handleVideoModalClose = () => setOpenVideoModal(false);
    const handleVideoModalOpen = () => setOpenVideoModal(true);
    let row = props.row;
    console.log(row);

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.message) {
            errors.message = 'Message is required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: { name: '', email: '', message: '' },
        validate,
        onSubmit: (values, { resetForm }) => {
            informAuthority(values);
            resetForm();
        },
    });

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

                    <form className='space-y-2 flex flex-col' onSubmit={formik.handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name && formik.touched.name}
                            helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email && formik.touched.email}
                            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                        />
                        <TextField
                            id="message"
                            name="message"
                            multiline
                            minRows={4}
                            label="Message"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            error={formik.errors.message && formik.touched.message}
                            helperText={formik.errors.message && formik.touched.message ? formik.errors.message : ''}
                        />
                        <Button type='submit' variant='contained'>Send Response</Button>
                    </form>
                </Box>
            </Modal>

            <ImageModal open={openVideoModal} handleClose={handleVideoModalClose} imgsrc={`/images/${row.file_name}`}></ImageModal>
        </>

    )
}

export default TableRowSpecific