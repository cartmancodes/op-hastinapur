import React from 'react'
import {TextField,Button} from '@mui/material'
import { useState } from 'react';

function MessageForm() {
    const [message,setMessage] = useState("");
    const informAuthority = () => {
        window.alert("Your Message Have Been Sent");
    }
    return (
        <form className='flex flex-col space-y-4'>
            <TextField
                multiline
                minRows={4}
                label="Message"
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={informAuthority} variant='contained'>Send Response</Button>
        </form>
    )
}

export default MessageForm