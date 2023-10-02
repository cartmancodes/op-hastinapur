import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@mui/material';


let id = 0;
function createData(pname, date, pic, category, status, duration, sentiments) {
    id += 1;
    return { id, pname, date, pic, category, status, duration, sentiments };
}

const rows = [
    createData('Project Name-1', "12-10-2022", "", "Cycling", "Completed", "2 Months", "Happy"),
    createData('Project Name-2', "12-10-2022", "", "Traffic", "Inprogess", "3 Months", "Neutral"),
    createData('Project Name-3', "12-10-2022", "", "Cycling", "Under Review", "4 Months", "Unsatisfied"),
    createData('Project Name-4', "12-10-2022", "", "Road Safety", "Inprogress", "2 Months", "Neutral"),
    createData('Project Name-5', "12-10-2022", "", "Cycling", "Completed", "2 Months", "Happy"),
];

function SimpleTable() {
    const success = 'w-fit p-2 bg-green-100 text-green-600 rounded-lg';
    const halfSuccess = 'w-fit p-2 bg-yellow-100 text-yellow-500 rounded-lg';
    const failed = 'w-fit p-2 bg-red-100 text-red-500 rounded-lg';
    return (
        <Paper className='max-h-[400px] overflow-y-scroll'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name of the Intiatives</TableCell>
                        <TableCell>Project Category</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Project Duration</TableCell>
                        <TableCell>Public Sentiments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
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
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>
                                <p className={row.sentiments === 'Happy' ?
                                    success : row.sentiments === 'Neutral' ?
                                        halfSuccess : failed}>
                                    {row.sentiments}
                                </p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}


export default SimpleTable;