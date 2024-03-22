import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestData({ handleClose }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            reason: ''
        },
        validate: values => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.reason) {
                errors.reason = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            toast("We Have Recived Your Request we will contact you soon");
            handleClose();
        },
    });
    

    return (
        <form onSubmit={formik.handleSubmit} className='space-y-2 flex flex-col'>
            <TextField
                id="name"
                name="name"
                type='text'
                fullWidth
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                id="email"
                name="email"
                type="email"
                fullWidth
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="reason"
                name="reason"
                fullWidth
                multiline
                minRows={4}
                label="Reason For Data"
                onChange={formik.handleChange}
                value={formik.values.reason}
                error={formik.touched.reason && Boolean(formik.errors.reason)}
                helperText={formik.touched.reason && formik.errors.reason}
            />
            <Button type='submit' fullWidth variant='contained'>Request Data</Button>
        </form>
    )
}

export default RequestData;
