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
import {MenuItem, Select } from '@mui/material';
import DataGridRow from './MapTableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { wardDivision } from '../MapComponents/wardDivisionData';


function sortingLogic(dataToShow,sortScore,sortDate) {
    
}

export default function MapTableSpecific({filteredOutput,loading}) {
    let wards = [];
    const parameter_names = [
        "cleaniness_score",
        "sidewalk_score",
        "road_score",
        "encroachment_score",
        "traffic_calming"
    ]
    const sub_parameters = [
        ["overall_cleaniness_score", "general_cleanliness", "littering", "dustbin", "drain"],
        ["overall_sidewalk_score", "maintenance_quality", "cleanliness_and_hygiene", "effective_use_vs_occupation", "markets", "wrong_parking"],
        ["overall_road_score", "surface_quality", "blacktop_quality", "lane_markings", "right_rules", "lane_discipline", "wrong_parking"],
        ["overall_encroachment_score", "general_encroachment", "encroachment_by_whom"],
        ["overall_traffic_calming", "toilet"]
    ]
    wardDivision.map((ward) => {
        wards.push({ "ward_name": ward["Ward Name"], "ward_number": ward["Ward Numbe"] })
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const [sortScore, setSortScore] = useState("none");
    const [sortDate, setSortDate] = useState(false);
    const [status, setStatus] = useState("any");

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

    let sortedData = filteredOutput.data;
    if (sortScore == "asc") {
        sortedData = sortedData.sort((a, b) => a.score - b.score);
    } else if (sortScore == "desc") {
        sortedData = sortedData.sort((a, b) => b.score - a.score);
    }

    if (sortDate == "asc") {
        sortedData = sortedData.sort((a, b) => a.date - b.date);
    } else if (sortDate == "desc") {
        sortedData = sortedData.sort((a, b) => b.date - a.date);
    }

    
    return (
        loading ? <div>Loading...</div> : <div className='space-y-4'>
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
                            {sortedData
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
                    count={sortedData.length}
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