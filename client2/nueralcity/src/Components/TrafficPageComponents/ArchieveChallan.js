import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ArchievedChallanRow from './ArchievedChallanRow';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef,useState } from 'react';
import { Button,InputLabel,Select,FormControl,MenuItem } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
        id: 'Speed',
        label: 'Speed',
        minWidth: 80,
    },
    {
        id: 'rlv',
        label: 'Red Light Violation',
        minWidth: 80,
    }
];

const mockData = [
    {
        rno: "MH 40 BE 2665",
        type: "car",
        dnt: "20/07/2022-11:30",
        vsrc: "CarVideo.mp4",
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
    const [type,setType] = useState("any");
    const [speedViolation,setSpeedViolation] = useState("any");
    const [rlv,setRlv] = useState("any")
    const tableRef = useRef(null);
    return (
        <div>
            <div className='px-2 flex items-center justify-between h-[60px] shadow-md bg-white mt-4 rounded-lg'>
                <div className='space-x-4'>
                    <FormControl className='w-[150px]'>
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select
                            value={type}
                            label="Vehicle Type"
                            onChange={(e) => setType(e.target.value)}
                            size='small'
                        >
                            <MenuItem value={"any"}>Any</MenuItem>
                            <MenuItem value={"car"}>Car</MenuItem>
                            <MenuItem value={"motorcycle"}>Motor Cycle</MenuItem>
                            <MenuItem value={"heavy"}>Heavy Vehicle</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='w-[150px]'>
                        <InputLabel>Speed Violation</InputLabel>
                        <Select
                            value={speedViolation}
                            label="Speed Violation"
                            onChange={(e) => setSpeedViolation(e.target.value)}
                            size='small'
                        >
                            <MenuItem value={"any"}>Any</MenuItem>
                            <MenuItem value={"yes"}>Yes</MenuItem>
                            <MenuItem value={"no"}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className='w-[150px]'>
                        <InputLabel>Red Light Violation</InputLabel>
                        <Select
                            value={rlv}
                            label="Red Light Violation"
                            onChange={(e) => setRlv(e.target.value)}
                            size='small'
                        >
                            <MenuItem value={"any"}>Any</MenuItem>
                            <MenuItem value={"yes"}>No</MenuItem>
                            <MenuItem value={"no"}>No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <DownloadTableExcel
                    filename="Challan Table"
                    sheet="challans"
                    currentTableRef={tableRef.current}
                >
                    <Button variant='outlined'>
                        <FileDownloadIcon />
                    </Button>
                </DownloadTableExcel>
            </div>
            <Paper className='mt-5' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table" ref={tableRef}>
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
                                        <ArchievedChallanRow row={row} />
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