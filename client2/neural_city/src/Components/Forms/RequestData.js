import React from 'react'
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
function RequestData() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [reason,setReason] = useState("");

    const requestData = () => {
        window.alert("We Have Recived Your Request we will contact you soon");
    }
    return (
        <form className='space-y-2 flex flex-col'>
            <TextField value={name}
            fullWidth
                label="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
            fullWidth
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
            fullWidth
                value={reason}
                multiline
                minRows={4}
                label="Reason For Data"
                onChange={(e) => setReason(e.target.value)}
            />
            <Button fullWidth onClick={requestData} variant='contained'>Request Data</Button>
        </form>
    )
}

export default RequestData