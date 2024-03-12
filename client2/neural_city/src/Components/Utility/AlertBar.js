import React from 'react'
import {Alert,AlertTitle} from '@mui/material'
import { Link, Navigate } from "react-router-dom";

function AlertBar({main_topic,heading,id}) {
    return (
        <Alert severity="warning" className='rounded-lg p-2 w-[100%] border-1 border-gray-800'>
            <AlertTitle>{main_topic}</AlertTitle>
            <p>
                {heading}
            </p>
            <Link to ={`/infra/planning?id=${id}`}><u className='cursor-pointer'>Learn More</u></Link>
        </Alert>
    )
}

export default AlertBar