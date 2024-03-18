import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import OutboundSharpIcon from '@mui/icons-material/OutboundSharp';
import MapCorouselModal from '../MapComponents/MapCorouselModal';
import { useState } from 'react';

function WardTableRow({ row, columns }) {
    const [corouselOpen, setCorouselOpen] = useState(false);
    const handleCorouselOpen = () => {
        setCorouselOpen(true);
    }

    const handleCorouselClose = () => {
        setCorouselOpen(false);
    }
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

    return (
        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
                const value = row[column.id];
                return (
                    <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                    </StyledTableCell>
                );

            })}
            <StyledTableCell align={'center'}>
                <IconButton color='primary' onClick={handleCorouselOpen}>
                    <OutboundSharpIcon />
                </IconButton>
            </StyledTableCell>
            <MapCorouselModal 
                handleCorouselClose={handleCorouselClose}
                handleCorouselOpen={handleCorouselOpen}
                ward_name={row.ward_name}
                corouselOpen={corouselOpen}
                datapoints = {row.dataPoints}
            />
        </StyledTableRow>
    )
}

export default WardTableRow