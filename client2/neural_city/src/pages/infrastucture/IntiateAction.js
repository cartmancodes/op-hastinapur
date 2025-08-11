import React from 'react'
import SpecificPageMapComponent from '../../Components/MapComponents/SpecificPageMap'
import { Button, IconButton, Select, FormControl, Box, MenuItem, InputLabel, Drawer, Backdrop } from '@mui/material'
import { useState } from 'react'
import RightSideBar from '../../Components/Global/RightSideBar'
import MapTableSpecific from '../../Components/Tables/MapTableSpecific'
import { wardDivision } from '../../Components/MapComponents/wardDivisionData'
import { getWardsWithName, isMarkerInsidePolygon } from '../../utils/MapUtils'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mockData } from '../../mockData/MapData'
import L from 'leaflet'
import { sdgImpact } from '../../mockData/MapData'
import { calculateAverage, getColRep } from '../../utils/MapUtils';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SingleScoreCard from '../../Components/Cards/SingleScoreCard'

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
        wardDivision.map((ward) => {
            if (currWard === ward["Ward Numbe"]) {
                selectedWardBoundary = ward.geometry;
            }
        });
        dataToReturn = dataToReturn.filter((dat) => {
            var polygonFormed = L.polygon(selectedWardBoundary);
            var marker = L.marker([dat.longitude, dat.latitude])
            let isContains = polygonFormed.contains(marker.getLatLng());
            let isTrue = isMarkerInsidePolygon([dat.longitude, dat.latitude], selectedWardBoundary);
            return isContains;
        });
    }
    console.log(param + " " + sub_param);
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
        // console.log(dataToShow);
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


function IntiateAction() {
    // Define a state to track whether the menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dataMode, setDataMode] = React.useState('table');

    // const handleChange = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newAlignment: string,
    // ) => {
    //     setDataMode(newAlignment);
    // };

    // Toggle the menu state when the menu button is clicked
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    let wards = getWardsWithName(wardDivision);

    
    const parameter_names = ["Cleanliness and Waste Management"
        , "sidewalk_score", "road_score", "public_space_utilization"
    ]
    const sub_parameters = [
        ["Garbage_and_Litter","Dust","Bin_Usability","Bin_Overflow","Bin_Cleanliness","Construction_Material","Toilet_Accessibility","Toilet_Maintenance","Drain","Drain_Manhole_Cover_Condition","Median_Cleanliness"]
        // ["overall_cleaniness_score", "garbage_and_litter", "tobacco_spit", "dust", "dustbins_dumpsters", "drain", "toilet_urination"],
        // ["overall_sidewalk_score", "construction_material", "sidewalk_availability", "sidewalk_usability", "parking_on_sidewalk", "street_furniture_and_amenities", "walking_space"],
        // ["overall_road_score", "road_motorable_space", "surface_quality", "repair_quality", "type_of_road", "blacktop_quality", "lane_markings", "parking_on_road", "cycling_infrastructure"],
        // ["overall_public_space_utilization_score", "general_occupation", "occupants"]
    ]
    const [scoreValue, setScoreValue] = useState("any");
    const [city, setCity] = useState("Jhansi");
    const [mapData, setmapData] = useState({
        currWard: "any",
        zoom: 12.25,
        position: [25.4484, 78.5685]
    });
    const [parameter, setParameter] = useState(0);
    const [sub_parameter, setSubParameter] = useState({
        subParameters: sub_parameters[`${parameter}`],
        currSubParameter: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(mockData.data);
    const [position, setPosition] = useState([25.4484, 78.5685])
    const [filteredOutput, setFilteredOutput] = useState({
        data: [],
        colorRep: "white",
    });
    const [sdgImpactParam, setsdgImpact] = useState("any");
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
        console.log(parameter);
        const filteredOutput = wardSelection(data, mapData.currWard, parameter_names[parameter], sub_parameter.subParameters[sub_parameter.currSubParameter], scoreValue);
        console.log(filteredOutput);
        console.log(parameter_names[parameter])
        let avg = calculateAverage(filteredOutput);
        let colRep = getColRep(avg);
        setFilteredOutput({
            data: filteredOutput,
            colorRep: colRep
        });
    }, [loading, mapData, parameter, sub_parameter, scoreValue]);

    useEffect(() => {
        const parameter_name = parameter_names[parameter];
        console.log(parameter_name);
        if (sdgImpactParam !== "any") {
            let subs = sub_parameters[parameter];
            if (sdgImpactParam === "standard") {
                subs = subs.filter((sub, idx) => {
                    if (idx === 0) return true;
                    else return (sdgImpact[`${parameter_name}`][`${sub}_score`] <= 1.5);
                });
            } else if (sdgImpactParam === "high") {
                subs = subs.filter((sub, idx) => {
                    if (idx === 0) return true;
                    else return (sdgImpact[`${parameter_name}`][`${sub}_score`] > 1.5 && sdgImpact[`${parameter_name}`][`${sub}_score`] <= 3);
                });
            } else {
                subs = subs.filter((sub, idx) => {
                    if (idx === 0) return true;
                    else {
                        console.log(sdgImpact);
                        return (sdgImpact[`${parameter_name}`][`${sub}_score`] > 3);
                    }
                });
            }
            setSubParameter({
                subParameters: subs,
                currSubParameter: 0
            });
        } else {
            setSubParameter({
                subParameters: sub_parameters[`${parameter}`],
                currSubParameter: 0
            });
        }
    }, [sdgImpactParam, parameter]);

    const handleDownloadButtonClick = () => {
        exportToExcel(filteredOutput.data, 'PinPoints');
    }

    const handleWardChange = (e) => {
        let wardValue = e.target.value;
        let currPosition = [];
        let currZoom = 12;
        if (wardValue !== "any") {
            wardDivision.map((feature) => {
                if (wardValue === feature["Ward Numbe"]) {
                    currPosition = [feature.geometry[0][1], feature.geometry[0][0]];
                }
            });
            currZoom = 15;
        } else {
            currPosition = [25.4484, 78.5685];
            currZoom = 12.25;
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
                <div className='md:w-[100%] flex w-[100%] space-x-[10px]'>
                    <div className="border w-[400px] h-fit rounded-lg bg-white shadow-sm">
                        {/* Header */}
                        <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-100 rounded-t-lg">
                            <p className="font-semibold text-lg text-gray-800">Filters</p>
                        </div>

                        {/* Filter Controls */}
                        <div className="p-4 space-y-4">
                            <FormControl fullWidth>
                                <p className="text-sm text-gray-600 mb-1">Ward</p>
                                <Select value={mapData.currWard} size="small" onChange={handleWardChange}>
                                    <MenuItem value="any">All Wards</MenuItem>
                                    {wards.map((ward) => (
                                        <MenuItem key={ward.ward_number} value={ward.ward_number}>
                                            {ward.ward_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <p className="text-sm text-gray-600 mb-1">Parameter</p>
                                <Select
                                    value={parameter}
                                    onChange={(e) => setParameter(e.target.value)}
                                    size="small"
                                >
                                    {parameter_names.map((para, idx) => (
                                        <MenuItem key={idx} value={idx}>
                                            {caseChange(para)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <p className="text-sm text-gray-600 mb-1">Sub Parameter</p>
                                <Select
                                    value={sub_parameter.currSubParameter}
                                    onChange={(e) =>
                                        setSubParameter({
                                            ...sub_parameter,
                                            currSubParameter: e.target.value,
                                        })
                                    }
                                    size="small"
                                >
                                    {sub_parameter.subParameters.map((sub_para, idx) => (
                                        <MenuItem key={idx} value={idx}>
                                            {caseChange(sub_para)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <p className="text-sm text-gray-600 mb-1">Score</p>
                                <Select value={scoreValue} onChange={(e) => setScoreValue(e.target.value)} size="small">
                                    <MenuItem value="any">Any</MenuItem>
                                    <MenuItem value="good">Good</MenuItem>
                                    <MenuItem value="acceptable">Manageable</MenuItem>
                                    <MenuItem value="poor">Poor</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Bottom Controls */}
                        <div className="px-4 py-3 border-t flex items-center justify-between">
                            <Button
                                variant="outlined"
                                onClick={handleDownloadButtonClick}
                                className="flex items-center space-x-2"
                            >
                                <p>Download</p>
                                <CloudDownloadIcon />
                            </Button>

                            
                        </div>
                    </div>


                    <div className='w-full h-[90%] space-y-4'>
                        <div className='flex space-x-4'>
                            <SingleScoreCard desc={"Number of Datapoints"} value={filteredOutput.data.length} color={"#9F3698"}/>
                            <SingleScoreCard desc={"Latest score for selected Filters"} value={55} color={"#9F3698"}/>
                            <SingleScoreCard desc={"Historical Average for the seleted Filters"} value={68} color={"#41B8D5"} />
                        </div>

                        {/* <div className = {(dataMode === "map") ? '' : 'hidden'}>
                            <SpecificPageMapComponent
                                mapData={mapData}
                                position={position}
                                zoom={mapData.zoom}
                                geojson={filteredOutput}
                                pos={mapData.currWard + "@" + parameter + "@" + sub_parameter} />
                        </div> */}

                        <div className = {(dataMode === "table") ? '' : 'hidden'}>
                            <MapTableSpecific filteredOutput={filteredOutput} loading={loading} currWard={mapData.currWard} city={city} scoreValue={scoreValue} parameter={parameter} sub_parameter={sub_parameter} />
                        </div>
                    </div>
                </div>

                {/* <RightSideBar /> */}
            </div>
    )
}

export default IntiateAction;