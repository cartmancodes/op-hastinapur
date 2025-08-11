import React from 'react'
import {TableRow,TableCell} from '@mui/material'
function ArchievedChallanRow(props) {
    const row = props.row;
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            <TableCell>{row.rno}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.dnt}</TableCell>
            <TableCell>
                {row.speed}
            </TableCell>
            <TableCell>{row.rlv}</TableCell>
        </TableRow>
    )
}

export default ArchievedChallanRow