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
import { Button, FormControl,InputLabel, MenuItem, Select } from '@mui/material';
import DataGridRow from './DataGridRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportToExcel } from 'react-json-to-excel';
import { wardDivision } from '../MapComponents/wardDivisionData';
import { isMarkerInsidePolygon } from '../MapComponents/UtilityFunctions';
import { mockData } from '../MapComponents/MockData';

function wardSelection(newData, currWard,parameter,scoreValue,status) {
    let dataToReturn = newData;
    let dataToShow = [];
    if(currWard !== "all") {
        let selectedWardBoundary = [];
        wardDivision.features.map((ward) => {
            if (currWard === ward.properties["Ward Numbe"]) {
                selectedWardBoundary = ward.geometry.coordinates;
            }
        });
        dataToReturn = newData.filter((dat) => {
            let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], selectedWardBoundary);
            return isTrue;
        });
    }
    
    let curr_ward_name = "";
    wardDivision.features.map(ward => {
        if (ward.properties["Ward Numbe"] == currWard) {
            curr_ward_name = ward.properties["Ward Name"]
        }
    })

    dataToReturn.map((dat) => {
        let score = undefined;
        let ward_name_curr = undefined;
        for(let i=0;i<wardDivision.features.length;i++) {
            let ward = wardDivision.features[i];
            let isInside = isMarkerInsidePolygon([dat.longitude,dat.latitude],ward.geometry.coordinates);
            if(isInside) {
                console.log(isInside);
                ward_name_curr = ward.properties["Ward Name"];
                console.log(ward_name_curr);
                break;
            }
        }
        if (parameter === "Overall") {
            score = dat.score.overall_score;
        } else if (parameter === "Cleanliness") {
            score = dat.score.cleaniness_score.overall_cleaniness_score;
        } else if (parameter === "Sidewalk") {
            score = dat.score.sidewalk_score.overall_sidewalk_score;
        } else if (parameter === "Roads") {
            score = dat.score.road_score.overall_road_score;
        } else if (parameter === "Encroachment") {
            score = dat.score.encroachment_score.overall_encroachment_score;
        } else if (parameter === "Traffic Calming") {
            score = dat.score.traffic_calming.overall_traffic_calming;
        }
        score = (Number)(score);
        let preparedData = {
            "ward": ward_name_curr,
            "score": (Number)(score),
            "date": dat.date,
            "file_name": dat.image_name,
            "status": dat.scoring_completed
        };
        dataToShow.push(preparedData);
    });

    if(scoreValue !== "any") {
        dataToShow = dataToShow.filter((dat) => dat.score === scoreValue);
    }

    if(status !== "any") {
        dataToShow = dataToShow.filter((dat) => dat.status == status)
    }

    return dataToShow;
}
export default function MapTable() {
    let wards = [];

    wardDivision.features.map((ward) => {
        wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(mockData.data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const [sortScore, setSortScore] = useState("none");
    const [sortDate, setSortDate] = useState(false);
    const [status, setStatus] = useState("any");
    const [scoreValue, setScoreValue] = useState("any");
    const [city, setCity] = useState("Jhansi");
    const [currWard, setcurrWard] = useState("all");
    const [parameter, setParameter] = useState("Overall");

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


    const dataToShow = wardSelection(data,currWard,parameter,scoreValue,status);
    let filteredOutput = dataToShow;
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
        <div className='px-4'>
            <div className='space-y-2 sm:space-y-0 sm:flex p-2 shadow-md w-full sm:h-[60px] rounded-t-lg space-x-2 justify-between items-center'>
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
                                value={currWard}
                                size='small'
                                onChange={(e) => setcurrWard(e.target.value)}
                                label='Ward'
                            >
                                <MenuItem value="all">All Wards</MenuItem>
                                {
                                    wards.map(ward => {
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
                                <MenuItem value="Cleanliness">Cleanliness</MenuItem>
                                <MenuItem value="Sidewalk">Sidewalk</MenuItem>
                                <MenuItem value="Roads">Roads</MenuItem>
                                <MenuItem value="Encroachment">Encroachment</MenuItem>
                                <MenuItem value="Traffic Calming">Traffic Calming</MenuItem>
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
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
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
                                <TableCell sx={{ fontWeight: 'bold'}} className='flex items-center space-x-2'>
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
                    count={data.length}
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