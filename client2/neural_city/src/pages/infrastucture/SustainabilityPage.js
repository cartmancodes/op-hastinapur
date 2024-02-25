import React from 'react'
import SpecificPageMapComponent from '../../Components/MapComponents/SpecificPageMap'
import { Button, Select, FormControl, Box, MenuItem, InputLabel, } from '@mui/material'
import { useState } from 'react'
import RightSideBar from '../../Components/Utility/RightSideBar'
import MapTableSpecific from '../../Components/Tables/MapTableSpecific'
import { wardDivision } from '../../Components/MapComponents/wardDivisionData'
import { getWardsWithName, isMarkerInsidePolygon } from '../../utils/MapUtils'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mockData } from '../../mockData/MapData'
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

    let dataToShow = dataToReturn.map((dat) => {
        let ward_name_curr = undefined;
        let ward_number = undefined;
        for (let i = 0; i < wardDivision.features.length; i++) {
            let ward = wardDivision.features[i];
            let isInside = isMarkerInsidePolygon([dat.longitude, dat.latitude], ward.geometry.coordinates);
            console.log(isInside);
            if (isInside === true) {
                ward_name_curr = ward.properties["Ward Name"];
                ward_number = ward.properties["Ward Numbe"];
                console.log(ward_name_curr + " " + ward_number);
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
            "longitude": dat.longitude,
            "ward_number": ward_number
        };
        return preparedData;
    });

    let dataCleaned = dataToShow.filter((dat) => !Number.isNaN(dat.score) && dat.score != -10);
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
    return dataCleaned;
}


function SustainabilityPage() {
    let wards = getWardsWithName(wardDivision);
    const parameter_names = [
        "cleaniness_score",
        "sidewalk_score",
        "road_score",
        "encroachment_score",
        "traffic_calming"
    ]

    const sub_parameters = [
        ["overall_cleaniness_score", "garbage_and_litter", "tobacco_spit", "dustbin", "drain", "dust", "toilet"],
        ["overall_sidewalk_score", "sidewalk_availability", "sidewalk_usability", "parking_on_sidewalk", "street_furniture_and_amenities"],
        ["overall_road_score", "surface_quality", "blacktop_quality", "lane_markings", "parking_on_road", "type_of_road", "cycling_infrastructure"],
        ["overall_encroachment_score", "general _encroachment", "encroachment_by_whom"],
        ["overall_traffic_calming"]
    ]

    const [scoreValue, setScoreValue] = useState("any");
    const [city, setCity] = useState("Jhansi");
    const [mapData, setmapData] = useState({
        currWard: "any",
        zoom: 11,
        position: [25.4484, 78.5685]
    });
    const [parameter, setParameter] = useState(0);
    const [sub_parameter, setSubParameter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(mockData.data);
    const [position, setPosition] = useState([25.4484, 78.5685])
    const [filteredOutput, setFilteredOutput] = useState([]);
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
        if (wardValue !== "any") {
            wardDivision.features.map((feature) => {
                if (wardValue === feature.properties["Ward Numbe"]) {
                    currPosition = [feature.geometry.coordinates[0][0][0][1], feature.geometry.coordinates[0][0][0][0]];
                }
            });
            currZoom = 13;
        } else {
            currPosition = [25.4484, 78.5685];
            currZoom = 11;
        }
        setmapData(() => {
            return {
                currWard: wardValue,
                zoom: currZoom,
                position: currPosition
            }
        });
    }
    return (
        loading ? <div>Loading...</div> :
            <div className='p-2 flex justify-between w-[100%] relative'>
                <div className='sm:w-[90%] w-[100%] space-y-[10px]'>
                    <div className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-2 rounded-md'>
                        <div className='space-y-2 sm:space-y-0 sm:flex p-2 shadow-sm w-full sm:h-[60px] rounded-lg space-x-2 justify-between items-center'>
                            <div className='sm:space-x-2 space-y-2 sm:space-y-0 sm:flex'>
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
                        <SpecificPageMapComponent
                            mapData={mapData}
                            position={position}
                            zoom={mapData.zoom}
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