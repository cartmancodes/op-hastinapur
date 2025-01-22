import React from 'react'
import SpecificPageMapComponent from '../../Components/MapComponents/SpecificPageMap'
import { Button, IconButton, Select, FormControl, Box, MenuItem, InputLabel, Drawer, Backdrop } from '@mui/material'
import { useState } from 'react'
import MapTableSpecific from '../../Components/Tables/MapTableSpecific'
import { useEffect } from 'react'
import { exportToExcel } from 'react-json-to-excel'
import { mockData } from '../../mockData/MapData'
import { sdgImpact } from '../../mockData/MapData'
import { calculateAverage, getColRep } from '../../utils/MapUtils';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useContext } from 'react'
import { CityContext } from '../../Context/CityContext'
import api from '../../lib/axiosClient'
import RingLoaderComp from '../../Components/Loaders/RingLoaderComp'

function caseChange(str) {
    let sepe = str.split("_");
    let ans = sepe.map((s) => {
        return s[0].toUpperCase() + s.substring(1);
    }).join(" ");
    return ans;
}

async function wardSelection(currWard, param, sub_param, scoreValue, currWardName) {
    let res = await api.get(`/workflows/?ward_id=${currWard}&parameter=${param}&sub_parameter=${sub_param}&score=${scoreValue}`);
    let dataToReturn = [];
    res.data.map((workflow) => {
        dataToReturn.push(
            {
                ...workflow,
                "ward": currWardName
            }
        );
    })
    return dataToReturn;
}


function FeatureDrill() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const parameter_names = ["cleaniness_score", "sidewalk_score", "road_score", "public_space_utilization"]
    const sub_parameters = [
        ["garbage_and_litter", "tobacco_spit", "dust", "dustbins_dumpsters", "drain", "toilet_urination"],
        ["construction_material", "sidewalk_availability", "sidewalk_usability", "parking_on_sidewalk", "street_furniture_and_amenities", "walking_space"],
        ["road_motorable_space", "surface_quality", "repair_quality", "type_of_road", "blacktop_quality", "lane_markings", "parking_on_road", "cycling_infrastructure"],
        ["general_occupation", "occupants"]
    ]
    const [scoreValue, setScoreValue] = useState("any");
    const [data, setData] = useState(mockData.data);
    const [position, setPosition] = useState([25.4484, 78.5685])
    const [filteredOutput, setFilteredOutput] = useState({
        data: [],
        colorRep: "white",
    });
    const [sdgImpactParam, setsdgImpact] = useState("any");
    const [curr_city, set_curr_city] = useState("");
    const cityContext = useContext(CityContext);
    const city = cityContext.current_city;
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(null)
    // const [scores,setScores] = useState(null);
    const [mapData, setmapData] = useState({
        curr_city: null,
        currWard: null,
        currWardName: null,
        zoom: 14,
        position: [25.4484, 78.5685]
    });
    const wards = mapData.curr_city ? mapData.curr_city.wards : [];

    const [parameter, setParameter] = useState(0);
    const [sub_parameter, setSubParameter] = useState({
        subParameters: sub_parameters[`${parameter}`],
        currSubParameter: 1
    });

    useEffect(() => {
        (async function get_data() {
            setLoading(true);
            try {
                const res = await api.get(`/city/?city_id=${city}&depth=2`);
                const curr_wards = res.data.wards;
                const curr_ward = curr_wards[0];
                setmapData({
                    curr_city: res.data,
                    currWard: curr_ward._id,
                    currWardName: curr_ward.name,
                    zoom: 14,
                    position: [curr_ward.y_centroid, curr_ward.x_centroid]
                })
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        })();
    }, []);


    useEffect(() => {
        (async function get_data() {
            setLoading(true);
            try {
                const filteredOutput = await wardSelection(mapData.currWard, parameter_names[parameter], sub_parameter.subParameters[sub_parameter.currSubParameter], scoreValue, mapData.currWardName);
                let avg = calculateAverage(filteredOutput);
                let colRep = getColRep(avg);
                setFilteredOutput({
                    data: filteredOutput,
                    colorRep: colRep
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [mapData, parameter, sub_parameter, scoreValue]);

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
        let oldState = mapData;
        let curr_ward_name = "";
        wards.map((ward) => {
            if (wardValue === ward._id) {
                currPosition = [ward.y_centroid, ward.x_centroid];
                curr_ward_name = ward.name;
            }
        });
        currZoom = 13;

        setmapData(() => {
            return {
                curr_city: mapData.curr_city,
                currWardName: curr_ward_name,
                currWard: wardValue,
                zoom: currZoom,
                position: currPosition
            }
        });
    }


    return (
        loading ? <RingLoaderComp/> :
            <div className='p-2 flex justify-between w-[100%] relative'>
                <div className='md:w-[100%] w-[100%] space-y-[10px]'>
                    <div className='p-3 border rounded-md'>
                        <div className="flex justify-between items-center">
                            <div className="hidden md:space-x-4 space-y-2 sm:space-y-0 md:flex flex-shrink sm:grid sm:grid-cols-4 gap-2">
                                <FormControl fullWidth>
                                    <InputLabel>Ward</InputLabel>
                                    <Select
                                        className='w-[150px]'
                                        value={mapData.currWard}
                                        size='small'
                                        onChange={handleWardChange}
                                        label='Ward'
                                    >
                                        {
                                            wards.map(ward => {
                                                return <MenuItem idx={ward._id} value={ward._id} name={ward.name}>{ward.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Parameter</InputLabel>
                                    <Select
                                        className='w-[150px]'
                                        value={parameter}
                                        onChange={(e) => {
                                            setParameter(e.target.value);
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
                                <FormControl fullWidth>
                                    <InputLabel>Sub Parameter</InputLabel>
                                    <Select
                                        className='w-[150px]'
                                        value={sub_parameter.currSubParameter}
                                        onChange={(e) => setSubParameter({
                                            ...sub_parameter,
                                            currSubParameter: e.target.value
                                        })}
                                        label='Sub Parameter'
                                        size='small'
                                    >
                                        {
                                            sub_parameter.subParameters.map((sub_para, idx) => {
                                                return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Score</InputLabel>
                                    <Select
                                        className='w-[150px]'
                                        value={scoreValue}
                                        label="Score"
                                        onChange={(e) => setScoreValue(e.target.value)}
                                        size='small'
                                    >
                                        <MenuItem value={"any"}>Any</MenuItem>
                                        <MenuItem value={"good"}>Good</MenuItem>
                                        <MenuItem value={"acceptable"}>Manageable</MenuItem>
                                        <MenuItem value={"poor"}>Poor</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>SDG Impact</InputLabel>
                                    <Select
                                        sx={{ width: '150px', color: 'black' }}
                                        value={sdgImpactParam}
                                        label="SDG Impact"
                                        onChange={(e) => {
                                            setsdgImpact(e.target.value);
                                        }}
                                        size='small'
                                    >
                                        <MenuItem value={"any"}>Any</MenuItem>
                                        <MenuItem value={"standard"}>Standard</MenuItem>
                                        <MenuItem value={"high"}>High </MenuItem>
                                        <MenuItem value={"significant"}>Significant</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="sm:hidden">
                                <Button onClick={toggleMenu}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </Button>
                            </div>
                            <div>
                                <Button variant='outlined' onClick={handleDownloadButtonClick} className='space-x-2'>
                                    <p>Download</p>
                                    <CloudDownloadIcon />
                                </Button>
                            </div>
                        </div>
                        <Drawer
                            anchor="bottom"
                            open={isMenuOpen}
                            onClose={() => setIsMenuOpen(false)}
                            BackdropComponent={Backdrop}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <div className='p-2 flex  border-b items-center justify-between'>
                                <h1 className='text-xl'>Filters</h1>
                                <IconButton onClick={() => setIsMenuOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <div className='space-y-4 p-4'>
                                <FormControl fullWidth>
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
                                <FormControl fullWidth>
                                    <InputLabel>Parameter</InputLabel>
                                    <Select
                                        value={parameter}
                                        onChange={(e) => {
                                            setParameter(e.target.value);
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
                                <FormControl fullWidth>
                                    <InputLabel>Sub Parameter</InputLabel>
                                    <Select
                                        value={sub_parameter.currSubParameter}
                                        onChange={(e) => setSubParameter({
                                            ...sub_parameter,
                                            currSubParameter: e.target.value
                                        })}
                                        label='Sub Parameter'
                                        size='small'
                                    >
                                        {
                                            sub_parameter.subParameters.map((sub_para, idx) => {
                                                return <MenuItem value={idx}>{caseChange(sub_para)}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Score</InputLabel>
                                    <Select
                                        value={scoreValue}
                                        label="Score"
                                        onChange={(e) => setScoreValue(e.target.value)}
                                        size='small'
                                    >
                                        <MenuItem value={"any"}>Any</MenuItem>
                                        <MenuItem value={"good"}>Good</MenuItem>
                                        <MenuItem value={"acceptable"}>Manageable</MenuItem>
                                        <MenuItem value={"poor"}>Poor</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>SDG Impact</InputLabel>
                                    <Select
                                        sx={{ backgroundColor: '#A5D6A7', color: 'black' }}
                                        value={sdgImpactParam}
                                        label="SDG Impact"
                                        onChange={(e) => {
                                            setsdgImpact(e.target.value);
                                        }}
                                        size='small'
                                    >
                                        <MenuItem value={"any"}>Any</MenuItem>
                                        <MenuItem value={"standard"}>Standard</MenuItem>
                                        <MenuItem value={"high"}>High </MenuItem>
                                        <MenuItem value={"significant"}>Significant</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Drawer>
                    </div>
                    
                    <MapTableSpecific filteredOutput={filteredOutput} loading={loading} currWard={mapData.currWard} city={city} scoreValue={scoreValue} parameter={parameter} sub_parameter={sub_parameter} />
                </div>
            </div>
    )
}

export default FeatureDrill