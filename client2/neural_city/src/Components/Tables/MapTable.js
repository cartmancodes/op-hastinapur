import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DataGridRow from './MapTableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportToExcel } from 'react-json-to-excel';
import { wardDivision } from '../MapComponents/wardDivisionData';
import { isMarkerInsidePolygon } from '../../utils/MapUtils';
import { avgData, mockData } from '../../mockData/MapData';
import { useEffect } from 'react';
import Loader from 'react-js-loader'
import L from 'leaflet';

function wardSelection(newData, currWard, param, scoreValue) {
    try {
        let selectedWardBoundary = [];
        let dataToReturn = newData;
        if (currWard !== "all") {
            wardDivision.map((ward) => {
                if (currWard === ward["Ward Numbe"]) {
                    selectedWardBoundary = ward.geometry;
                }
            });

            console.log(selectedWardBoundary);
            dataToReturn = dataToReturn.filter((dat) => {
                var polygonFormed = L.polygon(selectedWardBoundary);
                var marker = L.marker([dat.longitude, dat.latitude]);
                console.log(dat.longitude + " " + dat.latitude);
                if (marker !== null) {
                    let isContains = polygonFormed.contains(marker.getLatLng());
                    return isContains;
                } else return false;
            });
            console.log(dataToReturn);
        }
        console.log(dataToReturn);
        let dataToShow = dataToReturn.map((dat) => {
            let ward_name_curr = undefined;
            let ward_number = undefined;
            for (let i = 0; i < wardDivision.length; i++) {
                let ward = wardDivision[i];
                let isInside = isMarkerInsidePolygon([dat.longitude, dat.latitude], ward.geometry);
                if (isInside === true) {
                    ward_name_curr = ward["Ward Name"];
                    ward_number = ward["Ward Numbe"];
                    break;
                }
            }

            let score = undefined;
            if (param !== "Overall") {
                score = dat.score[`${param}_score`][`overall_${param}_score`];
            } else {
                score = dat.score.overall_score;
            }

            let preparedData = {
                "ward": ward_name_curr,
                "score": (Number)(score),
                "date": dat.date,
                "file_name": dat.image_name,
                "status": dat.scoring_completed,
                "latitude": dat.latitude,
                "longitude": dat.longitude,
                "ward_number": ward_number
            };
            return preparedData;
        });
        let dataCleaned = dataToShow.filter((dat) => !Number.isNaN(dat.score) && dat.score > 0);
        if (scoreValue !== "any") {
            if (scoreValue === "good") {
                dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) > 75);
            } else if (scoreValue === "acceptable") {
                dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) > 50 && (Number)(dat.score) <= 75);
            } else {
                dataCleaned = dataCleaned.filter((dat) => (Number)(dat.score) <= 50);
            }
        }
        dataCleaned = dataCleaned.filter(dat => dat.score > 0);
        console.log(dataCleaned);
        return dataCleaned;
    } catch (err) {
        console.log(err.message);
    }
}


export default function MapTable() {

    // let wards = getWardsWithName(wardDivision);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [sortScore, setSortScore] = useState("none");
    const [sortDate, setSortDate] = useState(false);
    const [status, setStatus] = useState("any");
    const [scoreValue, setScoreValue] = useState("any");
    const [city, setCity] = useState("Jhansi");
    const [currWard, setcurrWard] = useState("all");
    const [parameter, setParameter] = useState("Overall");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    console.log(data);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDownloadButtonClick = () => {
        exportToExcel(data, 'Sustainability');
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true);
    //         let res = await axios.get("http://localhost:5000/data/");
    //         if (res) {
    //             if (res.status === 200) {
    //                 let newData = res.data.data;
    //                 let dataAfterSelected = wardSelection(newData, currWard,parameter);
    //                 setData(dataAfterSelected);
    //             } else if (res.status === 400) {
    //                 console.log("Error");
    //                 setError("Data Not Found")
    //             }
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [currWard, parameter]);

    useEffect(() => {
        setLoading(true);
        try {
            // Get the  Data After Applying all the Parameters
            const dataToShow = wardSelection(mockData.data, currWard, parameter, scoreValue, status);
            console.log(dataToShow);
            // Do all the sorting related Stuffs here

            // Sort on the basis of Score
            let filteredOutput = dataToShow;
            if (sortScore === "asc") {
                filteredOutput = filteredOutput.sort((a, b) => a.score - b.score);
            } else if (sortScore === "desc") {
                filteredOutput = filteredOutput.sort((a, b) => b.score - a.score);
            }

            // Sort on The basis of date
            if (sortDate === "asc") {
                filteredOutput = filteredOutput.sort((a, b) => a.date - b.date);
            } else if (sortDate === "desc") {
                filteredOutput = filteredOutput.sort((a, b) => b.date - a.date);
            }

            filteredOutput = filteredOutput.filter((dat) => (Number)(dat.score) > 0);
            console.log(filteredOutput);
            setData(filteredOutput);
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
        setPage(1);
    }, [sortScore, sortDate, status, scoreValue, currWard, parameter]);


    return (
        loading ? <Loader type="spinner-default" bgColor={"red"} color={"black"} title={""} size={100} /> :
            error ? <div className='bg-red-200 rounded-lg w-full'>{error}</div> : <div className='px-4'>
                <div className='bg-white space-y-2 sm:space-y-0 sm:flex p-2 shadow-md w-full sm:h-[60px] rounded-t-lg space-x-2 justify-between items-center'>
                    <div className='bg-white sm:space-x-2 space-y-2 sm:space-y-0 sm:flex'>
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
                                    value={currWard}
                                    size='small'
                                    onChange={(e) => setcurrWard(e.target.value)}
                                    label='Ward'
                                >
                                    <MenuItem value="all">All Wards</MenuItem>
                                    {
                                        avgData.map(ward => {
                                            return <MenuItem value={ward.ward_number}>{ward.ward_name}</MenuItem>
                                        })
                                    }
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
                                    <MenuItem value="Overall">Overall</MenuItem>
                                    <MenuItem value="cleaniness">Cleanliness</MenuItem>
                                    <MenuItem value="sidewalk">Sidewalk</MenuItem>
                                    <MenuItem value="road">Roads</MenuItem>
                                    <MenuItem value="encroachment">Encroachment</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel>Score</InputLabel>
                                <Select
                                    value={scoreValue}
                                    label="Score"
                                    onChange={(e) => setScoreValue(e.target.value)}
                                    size='small'
                                >
                                    <MenuItem value={"any"}>Any</MenuItem>
                                    <MenuItem value={"good"}>Good</MenuItem>
                                    <MenuItem value={"acceptable"}>Acceptable</MenuItem>
                                    <MenuItem value={"poor"}>Poor</MenuItem>
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
                                        <span>Status</span>
                                        <Select value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            size='small'
                                        >
                                            <MenuItem value={`any`}>Status</MenuItem>
                                            <MenuItem value={`Yes`}>Completed</MenuItem>
                                            <MenuItem value={`No`}>Pending</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Send Alert</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
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
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
    );
}