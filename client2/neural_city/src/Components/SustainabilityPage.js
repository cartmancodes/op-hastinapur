import React from 'react'
import SpecificPageMapComponent from './MapComponents/SpecificPageMapComponent'
import { Button, Select, FormControl, Box, MenuItem, InputLabel, } from '@mui/material'
import { useState } from 'react'
import Scores from './OtherComponents/Scores'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RightSideBar from './Utility/RightSideBar'
import MapTableSpecific from './OtherComponents/MapTableSpecific'
import { wardDivision } from './MapComponents/wardDivisionData'
import axios from 'axios'
import { isMarkerInsidePolygon } from './MapComponents/UtilityFunctions'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mockData } from './MapComponents/MockData'
import L from 'leaflet'

function caseChange(str) {
    let sepe = str.split("_");
    let ans = sepe.map((s) => {
        return s[0].toUpperCase() + s.substring(1);
    }).join(" ");
    return ans;
}

function wardSelection(newData, currWard, param, sub_param, scoreValue) {
    let selectedWardBoundary = [];
    let dataToReturn = newData;
    if (currWard !== "any") {
        wardDivision.features.map((ward) => {
            if (currWard === ward.properties["Ward Numbe"]) {
                selectedWardBoundary = ward.geometry.coordinates;
            }
        });
        dataToReturn = dataToReturn.filter((dat) => {
            var polygonFormed = L.polygon(selectedWardBoundary[0][0]);
            var marker = L.marker([dat.longitude, dat.latitude])
            console.log(marker);
            let isContains = polygonFormed.contains(marker.getLatLng());
            let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], selectedWardBoundary);
            return isContains;
        });
    }


    let dataToShow = [];
    let curr_ward_name = "";
    wardDivision.features.map(ward => {
        if (ward.properties["Ward Numbe"] == currWard) {
            curr_ward_name = ward.properties["Ward Name"]
        }
    })

    dataToReturn.map((dat) => {
        let ward_name_curr = undefined;
        for (let i = 0; i < wardDivision.features.length; i++) {
            let ward = wardDivision.features[i];
            let isInside = isMarkerInsidePolygon([dat.longitude, dat.latitude], ward.geometry.coordinates);
            if (isInside) {
                console.log(isInside);
                ward_name_curr = ward.properties["Ward Name"];
                console.log(ward_name_curr);
                break;
            }
        }
        let score = dat.score[param][sub_param];
        let preparedData = {
            "ward": ward_name_curr,
            "score": (Number)(score),
            "date": dat.date,
            "file_name": dat.image_name,
            "status": dat.scoring_completed,
            "latitude": dat.latitude,
            "longitude": dat.longitude
        };
        dataToShow.push(preparedData);
    });

    let dataCleaned = dataToShow.filter((dat) => !Number.isNaN(dat.score) && dat.score != -10);
    if (scoreValue !== "any") {
        dataCleaned = dataCleaned.filter((dat) => dat.score === scoreValue);
    }
    return dataCleaned;
}

function SustainabilityPage() {
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
    wardDivision.features.map((ward) => {
        wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
    });
    const [scoreValue, setScoreValue] = useState("any");
    const [city, setCity] = useState("Jhansi");
    const [mapData, setmapData] = useState({
        currWard: "any",
        zoom: 12,
        position: [25.4484, 78.5685]
    });
    const [parameter, setParameter] = useState(0);
    const [sub_parameter, setSubParameter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(mockData.data);
    const [position, setPosition] = useState([25.4484, 78.5685])
    const [filteredOutput, setFilteredOutput] = useState([]);
    const [zoom,setZoom] = useState(12);
    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true);
    //         let res = await axios.get("http://localhost:5000/data/");
    //         if (res) {
    //             if (res.status === 200) {
    //                 let newData = res.data.data;
    //                 let dataAfterSelected = wardSelection(newData, currWard,parameter_names[parameter],sub_parameters[parameter][sub_parameter]);
    //                 setFilteredOutput(dataAfterSelected);
    //                 setData(res.data.data);
    //             } else if (res.status === 400) {
    //                 setError("Data Not Found")
    //             }
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, []);
    // console.log("data" + data);

    useEffect(() => {
        const filteredOutput = wardSelection(data, mapData.currWard, parameter_names[parameter], sub_parameters[parameter][sub_parameter], scoreValue);
        setFilteredOutput(filteredOutput);
        console.log(filteredOutput)
    }, [loading, mapData, parameter, sub_parameter, scoreValue])

    const handleDownloadButtonClick = () => {
        exportToExcel(filteredOutput, 'Sustainability');
    }
    const handleWardChange = (e) => {
        let wardValue = e.target.value;
        let currPosition = [];
        let currZoom = 12;
        if(wardValue !== "any"){
            wardDivision.features.map((feature) => {
                if (wardValue === feature.properties["Ward Numbe"]) {
                    currPosition = [feature.geometry.coordinates[0][0][0][1], feature.geometry.coordinates[0][0][0][0]];
                }
            });
            currZoom = 15;
        } else {
            currPosition = [25.4484, 78.5685];
            currZoom = 12;
        }
        setmapData(() => {
            return {
                currWard: wardValue,
                zoom: currZoom,
                position: currPosition
            }
        })
        
    }
    return (
        loading ? <div>Loading...</div> :
            <div className='flex relative justify-between items-center w-[full] space-x-[60px]'>
                <div className='w-[77%] space-y-[60px]'>
                    <div className='flex-start space-y-[20px]'>
                        <div>
                            <h1 className='text-4xl font-bold text-gray-800'>CityX</h1>
                            <p className='text-gray-500 text-xl'>Dashboard <KeyboardArrowRightIcon color='primary' /> </p>
                        </div>

                        <div>
                            <Scores
                                mainScoreName="Walkability Score"
                                mainScoreValue={2}
                                scores={
                                    [
                                        { scoreName: "Score-1", scoreValue: 4, scoreColor: 'red' },
                                        { scoreName: "Score-2", scoreValue: 4, scoreColor: 'purple' },
                                        { scoreName: "Score-3", scoreValue: 4, scoreColor: 'blue' }
                                    ]
                                }
                            />
                        </div>
                    </div>

                    <div className='shadow-md p-2 rounded-lg'>
                        <div className='space-y-2 sm:space-y-0 sm:flex p-2 shadow-sm w-full sm:h-[60px] rounded-lg space-x-2 justify-between items-center'>
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
                                            value={mapData.currWard}
                                            size='small'
                                            onChange={handleWardChange}
                                            label='Ward'
                                        >
                                            <MenuItem value={"any"}>All Wards</MenuItem>
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
                                            onChange={(e) => {
                                                setParameter(e.target.value);
                                                setSubParameter(0);
                                            }}
                                            label='Parameter'
                                            size='small'
                                        >
                                            {
                                                parameter_names.map((para, idx) => {
                                                    return <MenuItem value={idx}>{caseChange(para)}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>

                                </div>

                                <div>
                                    <FormControl>
                                        <InputLabel>Sub Parameter</InputLabel>
                                        <Select
                                            value={sub_parameter}
                                            onChange={(e) => setSubParameter(e.target.value)}
                                            label='Sub Parameter'
                                            size='small'
                                        >
                                            {
                                                sub_parameters[parameter].map((sub_para, idx) => {
                                                    return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>

                                </div>
                                <div>
                                    <FormControl>
                                        <InputLabel>Score</InputLabel>
                                        <Select
                                            sx={{ width: '100px' }}
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
                        <SpecificPageMapComponent
                            mapData = {mapData}
                            position={position}
                            zoom = {zoom}
                            geojson={filteredOutput}
                            pos={mapData.currWard + "@" + parameter + "@" + sub_parameter} />
                    </div>
                    <MapTableSpecific filteredOutput={filteredOutput} loading={loading} currWard={mapData.currWard} city={city} scoreValue={scoreValue} parameter={parameter} sub_parameter={sub_parameter} />
                </div>
                <RightSideBar />
            </div>
    )
}

export default SustainabilityPage