import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { geojson } from '../MapComponents/heatmap';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DataGridRow from './DataGridRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PanoramaRounded } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportToExcel } from 'react-json-to-excel';
import Loader from 'react-js-loader'
import axios from 'axios'


export default function MapTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(geojson);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [sortScore, setSortScore] = useState("none");
    const [sortDate, setSortDate] = useState(false);
    const [status, setStatus] = useState("any");

    const [city, setCity] = useState("Jhansi");
    const [ward, setWard] = useState("Ward-1");
    const [parameter, setParameter] = useState("Potholes");

    // useEffect(() => {
    //     async function fetchData() {
    //         let res = await axios.get("http://localhost:5000/potholes/");
    //         if (res) {
    //             console.log("Data Fetched ");
    //             console.log(res);
    //             if (res.status === 200) {
    //                 setData(res.data.data);
    //             } else if (res.status === 400) {
    //                 console.log("Error");
    //                 setError("Data Not Found")
    //             }
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [])
    console.log("data" + data);
    let filteredOutput = data;
    if (sortScore == "asc") {
        filteredOutput = filteredOutput.sort((a, b) => a.score - b.score);
    } else if (sortScore == "desc") {
        filteredOutput = filteredOutput.sort((a, b) => b.score - a.score);
    }

    if (sortDate == "asc") {
        filteredOutput = filteredOutput.sort((a, b) => a.date - b.date);
    } else if (sortDate == "desc") {
        filteredOutput = filteredOutput.sort((a, b) => b.date - a.date);
    }

    if (status != "any") {
        // filteredOutput = filteredOutput.filter((a) => a.status.toLowerCase() === status);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDownloadButtonClick = () => {
        exportToExcel(filteredOutput, 'Sustainability');
    }

    return (
        <div className='space-y-4'>
            <div className='space-y-2 sm:space-y-0 sm:flex p-2 shadow-md w-full sm:h-[60px] rounded-lg space-x-2 justify-between items-center'>
                <div className='sm:space-x-2 space-y-2 sm:space-y-0 sm:flex'>
                    <div>
                        <FormControl>
                            <InputLabel>City</InputLabel>
                            <Select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                size='small'
                                label='City'
                            >

                                <MenuItem value="Jhansi">Jhansi</MenuItem>
                                <MenuItem value="Lucknow">Lucknow</MenuItem>
                                <MenuItem value="Kanpur">Kanpur</MenuItem>
                                <MenuItem value="Varanasi">Varanasi</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel>Ward</InputLabel>
                            <Select
                                value={ward}
                                size='small'
                                onChange={(e) => setWard(e.target.value)}
                                label='Ward'
                            >
                                <MenuItem value="Ward-1">Ward-1</MenuItem>
                                <MenuItem value="Ward-2">Ward-2</MenuItem>
                                <MenuItem value="Ward-3">Ward-3</MenuItem>
                                <MenuItem value="Ward-4">Ward-4</MenuItem>
                                <MenuItem value="Ward-5">Ward-5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel>Parameter</InputLabel>
                            <Select
                                value={parameter}
                                onChange={(e) => setParameter(e.target.value)}
                                label='Parameter'
                                size='small'
                            >
                                <MenuItem value="Potholes">Potholes</MenuItem>
                                <MenuItem value="Garbage">Garbage</MenuItem>
                                <MenuItem value="Air Quality">Air Quality</MenuItem>
                                <MenuItem value="Road Quality">Road Quality</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div>
                    <Button variant='outlined' onClick={
                        handleDownloadButtonClick
                    }>
                        <FileDownloadIcon />

                    </Button>
                </div>
            </div>
            {/* {loading ? <Loader type="spinner-default" bgColor={"red"} color={"black"} title={""} size={100} /> :
                error ? <div className='bg-red-200 rounded-lg w-full'>{error}</div> : */}
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>S.No.</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Locality</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>
                                            <div className='flex items-center'>
                                                <p>Score</p>
                                                <div className='p-0 rounded-xl hover:bg-gray-100' onClick={() => {
                                                    setSortScore("asc");
                                                    setSortDate("none");
                                                }}>
                                                    <ArrowUpwardIcon />
                                                </div>
                                                <div onClick={() => {
                                                    setSortScore("desc");
                                                    setSortDate("none");
                                                }} className='p-0 rounded-xl hover:bg-gray-100'>
                                                    <ArrowDownwardIcon />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>
                                            <div className='flex items-center'>
                                                <p>Date</p>
                                                <div className='p-0 hover:bg-gray-100 rounded-xl' onClick={() => {
                                                    setSortDate("asc");
                                                    setSortScore("none");
                                                }}>
                                                    <ArrowUpwardIcon />
                                                </div>

                                                <div onClick={() => {
                                                    setSortDate("desc");
                                                    setSortScore("none");
                                                }} className='hover:bg-gray-100 p-0 rounded-xl'>
                                                    <ArrowDownwardIcon />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Picture</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} className='flex items-center space-x-2'>
                                            Status
                                            <Select value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                size='small'
                                                label='Status'>
                                                <MenuItem value={`any`}>Any</MenuItem>
                                                <MenuItem value={`pending`}>Pending</MenuItem>
                                                <MenuItem value={`completed`}>Completed</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Inform Authority</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredOutput
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, idx) => {
                                            return (
                                                <DataGridRow row={row} idx={idx} />
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={geojson.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
            {/* } */}
        </div>
    );
}