import React, { useState } from 'react'
import {
    IconButton, TableCell, TableRow, Button
    , Modal, Box, TextField, FormControl, InputLabel, MenuItem, Select,

} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ImageModal from '../Modals/ImageModal';
import FormModal from '../Modals/FormModal';
import { useFormik } from 'formik';
import {toast} from 'react-toastify'
import CollectionsIcon from '@mui/icons-material/Collections';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
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
            <StyledTableRow hover role="checkbox" tabIndex={-1}>
                <StyledTableCell align='center'>{props.idx + 1}</StyledTableCell>
                <StyledTableCell align='center'>{row.ward}</StyledTableCell>
                <StyledTableCell align='center'>{row.score}</StyledTableCell>
                <StyledTableCell align='center'>{row.date}</StyledTableCell>
                <StyledTableCell align='center'>
                    <IconButton color='primary' onClick={() => setOpenVideoModal(true)}>
                        <CollectionsIcon />
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell align='center'>
                    <Button color='primary' variant='contained' onClick={handleFormModalOpen}>Send Alert</Button>
                </StyledTableCell>
            </StyledTableRow>
            <FormModal
                open={openFormModal}
                handleClose={handleFormModalClose}
                heading={`Send Alert`}
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