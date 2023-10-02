import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Fullscreen } from '@mui/icons-material';
import UnverifiedChallanRow from './UnverifiedChallanRow';


const columns = [
    {
        id: 'rno',
        label: 'Registration Number',
        minWidth: 170
    },
    {
        id: 'vtype',
        label: 'Vehicle Type',
        minWidth: 100
    },
    {
        id: 'dnt',
        label: "Date and Time",
        minWidth: 100
    },
    {
        id: 'Video',
        label: 'Video',
        minWidth: 80,
    },
    {
        id: 'Speed',
        label: 'Speed',
        minWidth: 80,
    },
    {
        id: 'rlv',
        label: 'Red Light Violation',
        minWidth: 80,
    },
    {
        id: 'verify',
        label: 'Verify',
        minWidth: 100,
    },
    {
        id: 'Edit',
        label: 'Edit',
        minWidth: 100,
    }
];

const mockData = [
    {
        rno: "MH 40 BE 2665",
        type: "car",
        dnt: "20/07/2022-11:30",
        vsrc: "https://media.istockphoto.com/id/1411576027/video/downtown-cityscape-time-lapse-of-car-traffic-transportation-people-walk-cross-road-junction.mp4?s=mp4-640x640-is&k=20&c=eREdT3CG5jFQdlovue_2TSTyfMo3Ru8hhPH7K-ci5jU=",
        speed: "40kmph",
        rlv: "No"
    }
]



export default function UnverifiedChallans() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Paper className='mt-5' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                mockData.map((row) => {
                                    return (
                                        <UnverifiedChallanRow row={row} />
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={mockData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>

    );
}