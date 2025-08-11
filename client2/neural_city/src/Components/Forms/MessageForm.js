import React from 'react'
import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
function MessageForm() {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values, { resetForm }) => {
            informAuthority(values);
            resetForm();
        },
    });
    const informAuthority = () => {
        toast("We Have Successfully Recieved your Request!");
    }
    return (
        <form className='flex flex-col space-y-4' onSubmit={formik.handleSubmit}>
            <TextField
                id="message"
                name="message"
                multiline
                minRows={4}
                label="Message"
                value={formik.values.message}
                onChange={formik.handleChange}
            />
            <Button type='submit' variant='contained'>Send Response</Button>
        </form>
    )
}

export default MessageForm