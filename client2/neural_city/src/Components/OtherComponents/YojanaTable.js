import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@mui/material';

function SimpleTable({projects}) {
    const success = 'w-fit p-2 bg-green-100 text-green-600 rounded-lg';
    const halfSuccess = 'w-fit p-2 bg-yellow-100 text-yellow-500 rounded-lg';
    const failed = 'w-fit p-2 bg-red-100 text-red-500 rounded-lg';
    return (
        <Paper className=''>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Name of the Intiatives</TableCell>
                        <TableCell>Project Category</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Group Name</TableCell>
                        <TableCell>Support Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <div className='flex items-center space-x-2'>
                                    <div>
                                        <Avatar src={row.pic}></Avatar>
                                    </div>
                                    <div>
                                        <p>{row.pname}</p>
                                        <p className='text-[12px] text-gray-400'>{row.date}</p>
                                    </div>
                                </div>

                            </TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell className='flex items-center justify-center'>
                                <p className={row.status === 'Completed' ?
                                    success : row.status === 'Inprogress' ?
                                        halfSuccess : failed}>{row.status}</p>
                            </TableCell>
                            <TableCell>
                                {row.group}
                            </TableCell>
                            <TableCell>{row.supportType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}


export default SimpleTable;