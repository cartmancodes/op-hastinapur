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
import { useFormik } from 'formik';
import {toast} from 'react-toastify'

function DataGridRow(props) {
    // States
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openVideoModal, setOpenVideoModal] = useState(false);

    // Controllers for Form Modal
    const handleFormModalOpen = () => setOpenFormModal(true);
    const handleFormModalClose = () => setOpenFormModal(false);

    // Controllers for Video Modal
    const handleVideoModalOpen = () => setOpenVideoModal(true);
    const handleVideoModalClose = () => setOpenVideoModal(false);

    // Form Submit Handler
    const informAuthority = () => {
        toast("Your Response Has been sent");
        handleFormModalClose();
    }

    // Formik Form Handling
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

            </FormModal>

            <ImageModal open={openVideoModal} handleClose={handleVideoModalClose} imgsrc={`/images/${row.file_name}`} />
        </>

    )
}

export default DataGridRow