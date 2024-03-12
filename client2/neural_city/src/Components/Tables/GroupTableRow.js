import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import MessageModal from '../Modals/MessageModal';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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

function GroupTableRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const [openMessageModal,setopenMessageModal] = useState(false);

    const handleOpenMessageModalOpen = () => {
        setopenMessageModal(true);
    }

    const handleOpenMessageModalClose = () => {
        setopenMessageModal(false);
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.sno}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.chairperson}</TableCell>
                <TableCell align="center"><Button onClick={handleOpenMessageModalOpen}>Message</Button></TableCell>
                <TableCell align="center"><Button onClick={() => {
                    window.alert("Request for the Support has been Sent");
                }}>Request Support</Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgb(255 241 242)' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className='space-y-4 p-4'>
                            <div className='font-bold text-xl'>{row.name}</div>
                            <div className='text-gray-500'><span className='font-bold text-black'>Description:-</span>{row.description}</div>
                            <TableContainer className='bg-white rounded-lg'>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Email</StyledTableCell>
                                            <StyledTableCell align="center">Mobile Number</StyledTableCell>
                                            <StyledTableCell align="center">Address</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.peoples.map((person) => (
                                            <StyledTableRow key={person.name}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {person.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{person.email}</StyledTableCell>
                                                <StyledTableCell align="center">{person.mobile}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {person.address}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
            <MessageModal handleClose = {handleOpenMessageModalClose} open={openMessageModal}></MessageModal>
        </React.Fragment>
    );
}

export default GroupTableRow;